import {createLogger, LEVEL} from "@gongt/ts-stl-server/debug";
import {RequestContext} from "@gongt/ts-stl-server/express/base/context";
import {urlencoded} from "body-parser";
import {Application, Router} from "express-serve-static-core";
import * as i18n from "i18next";
import {TranslationFunction} from "i18next";
import {getResourcesHandler, handle, LanguageDetector} from "i18next-express-middleware";
import {I18nPlugin} from "./base";

const debug = createLogger(LEVEL.INFO, 'i18n');

export interface I18nRequest {
	t: TranslationFunction;
	language: string;
	languages: string[];
}

export interface CookieOption {
	name: string;
	domain: string;
}
const defaultCookie: CookieOption = {
	name: 'i18n-lang',
	domain: '',
};

export interface I18nExpressConfig {
	ignoreRoutes?: string[];
	removeLngFromUrl?: boolean;
	debug?: boolean;
	projectName: string;
}

export class I18nExpress implements I18nPlugin {
	private attachedExpress: Application|Router;
	private cookieConfig: CookieOption = defaultCookie;
	private config: I18nExpressConfig;
	
	constructor(config: Partial<I18nExpressConfig>, app?: Application|Router) {
		if (!config.projectName) {
			config.projectName = process.env.PROJECT_NAME;
		}
		if (!config.projectName) {
			throw new Error('no projectName set.');
		}
		if (app) {
			this.attachedExpress = app;
		}
		this.config = Object.assign({
			ignoreRoutes: [],
			removeLngFromUrl: false,
			debug: false,
			projectName: null,
		}, config);
	}
	
	cookiesSettings(settings: CookieOption) {
		this.cookieConfig = settings;
	}
	
	attach(express: Application|Router) {
		this.attachedExpress = express;
	}
	
	__plugin(options: i18n.Options, use: (module: any) => void) {
		use(LanguageDetector);
		options.defaultNS = this.config.projectName;
		(<string[]>options.ns).push(this.config.projectName);
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
	
	__modify(orignal: i18n.I18n) {
		if (!this.attachedExpress) {
			throw new Error('I18nExpress: you have not attach the express middleware.');
		}
		debug('register i18next handler middleware');
		this.attachedExpress.use(handle(orignal, this.config));
		
		debug('export resources on /_i18n/resources.json');
		this.attachedExpress.get('/_i18n/resources.json', getResourcesHandler(orignal, {}));
		this.attachedExpress.post('/_i18n/resources.json', urlencoded({
			extended: false,
		}), missingKeyHandler(orignal));
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
		console.log(req.body);
		
		for (let m in req.body) {
			i18next.services.backendConnector.saveMissing(lngs, ns, m, req.body[m]);
		}
		res.send('ok');
	};
}
