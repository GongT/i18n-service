import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import {Application, Router} from "express-serve-static-core";
import {handle} from "i18next-express-middleware";
import {I18nObject, ITranslationConfigPassing} from "../def";
import {isSelfDebugging} from "../library/options.express";

export interface I18nExtendConfig {
	debug?: boolean;
}

export interface I18nExpressConfig extends I18nExtendConfig {
	ignoreRoutes?: string[];
	removeLngFromUrl?: boolean;
}

export function attachMainRoute(app: Router|Application,
                                options: I18nExpressConfig,
                                i18n: I18nObject,
                                root: string = '/') {
	const config = Object.assign({
		ignoreRoutes: [],
		removeLngFromUrl: true,
	}, options, {
		cookie: {
			name: i18n.extraInfo.detect.cookieName,
			domain: i18n.extraInfo.detect.cookieDomain,
		},
	});
	
	config.ignoreRoutes.push('/_i18n');
	
	app.use(handle(i18n, config), (req: any, res, next) => {
		if (req.i18n) {
			req.i18n.off('languageChanged');
			const passVal = new GlobalVariable(res);
			
			passVal.set('languageConfigFromServer', <ITranslationConfigPassing>{
				remoteUrl: isSelfDebugging? null : i18n.extraInfo.remoteUrl,
				langList: i18n.extraInfo.lngList,
				language: req.language,
				detect: i18n.extraInfo.detect,
				fallbackLng: i18n.options.fallbackLng,
				projectName: i18n.options.defaultNS,
				debug: options.debug,
				load: 'languageOnly',
			});
		}
		next();
	});
}
