import {createLogger} from "@gongt/ts-stl-library/log/debug";
import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import {RequestContext} from "@gongt/ts-stl-server/express/base/context";
import {LOG_LEVEL} from "@gongt/ts-stl-server/log/levels";
import {urlencoded} from "body-parser";
import {Application, Router} from "express-serve-static-core";
import * as i18n from "i18next";
import {TranslationFunction} from "i18next";
import {getResourcesHandler, handle, LanguageDetector} from "i18next-express-middleware";
import {I18nPlugin} from "./base";
import {CookieOption} from "./browser";

const debug = createLogger(LOG_LEVEL.INFO, 'i18n');

export interface I18nRequest {
	t: TranslationFunction;
	language: string;
	languages: string[];
}

const defaultCookie: CookieOption = {
	name: 'i18n-lang',
	domain: '',
};

export interface I18nExpressConfig {
	ignoreRoutes?: string[];
	removeLngFromUrl?: boolean;
	debug?: boolean;
	cookie?: CookieOption;
}

export interface Options {
	list: string[];
	backend: string;
}

export class I18nExpress implements I18nPlugin {
	private attachedExpress: Application|Router;
	private cookieConfig: CookieOption = defaultCookie;
	private config: I18nExpressConfig;
	private options: Options;
	
	constructor(config: Partial<I18nExpressConfig>, options: Options, app?: Application|Router) {
		if (app) {
			this.attachedExpress = app;
		}
		this.config = Object.assign({
			ignoreRoutes: [],
			removeLngFromUrl: false,
			debug: false,
		}, config);
		this.config.ignoreRoutes.push('/_i18n');
		
		this.options = options;
		if (config.cookie) {
			this.cookiesSettings(config.cookie);
		}
	}
	
	cookiesSettings(settings: CookieOption) {
		this.cookieConfig = settings;
	}
	
	attach(express: Application|Router) {
		this.attachedExpress = express;
	}
	
	__plugin(options: i18n.InitOptions, use: (module: any) => void) {
		use(LanguageDetector);
		options.detection = {
			order: ['querystring', 'cookie', 'header'],
			caches: ['cookie'],
			lookupQuerystring: 'language',
			// lookupSession: 'lng',
			// lookupPath: 'lng',
			lookupCookie: this.cookieConfig.name || defaultCookie.name,
			cookieDomain: this.cookieConfig.domain || defaultCookie.domain,
			lookupFromPathIndex: -1,
		};
	}
	
	__modify(orignal: i18n.i18n, options) {
		if (!this.attachedExpress) {
			throw new Error('I18nExpress: you have not attach the express middleware.');
		}
		debug('register i18next handler middleware');
		
		const detection = {
			cookie: this.cookieConfig,
			qs: 'language',
		};
		
		this.attachedExpress.use(handle(orignal, this.config), (req: any, res, next) => {
			if (req.i18n) {
				req.i18n.off('languageChanged');
				const passVal = new GlobalVariable(res);
				
				passVal.set({
					languageConfigFromServer: {
						language: req.language,
						detection,
						fallbackLng: orignal.options.fallbackLng,
						...this.options,
						projectName: options.projectName,
					},
				});
			}
			next();
		});
		
		debug('export resources on /_i18n/resources.json');
		this.attachedExpress.get('/_i18n/resources.json', getResourcesHandler(orignal, {}));
		this.attachedExpress.post('/_i18n/resources.json', urlencoded({
			extended: false,
		}), missingKeyHandler(orignal));
		
		this.attachedExpress.get('/_i18n/reload', (req, res, next) => {
			if (req.query.lng && req.query.ns) {
				if (req['i18n']) {
					req['i18n'].off('languageChanged');
				}
				orignal['reloadResources'](req.query.lng, req.query.ns);
				res.header(200).send('OK');
			} else {
				res.header(400).send('INPUT');
			}
		});
	}
}

export function T(context: RequestContext<any, any>): TranslationFunction {
	return context._request_raw['t'];
}

function missingKeyHandler(i18next) {
	return function (req, res) {
		const lngs = req.query['lng'].split(' ');
		const ns = req.query['ns'];
		
		if (!i18next.services.backendConnector) {
			return res.status(404).send('i18next-express-middleware:: no backend configured');
		}
		
		for (let m in req.body) {
			i18next.services.backendConnector.saveMissing(lngs, ns, m, req.body[m]);
		}
		res.send('ok');
	};
}
