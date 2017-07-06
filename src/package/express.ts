import {JsonEnv} from "@gongt/jenv-data";
import {Application, Router} from "express-serve-static-core";
import {I18nCreator, LanguageList} from "./library/base";
import {I18nExpress, I18nExpressConfig} from "./library/express";
import {FetchBackend} from "./library/fetch";

export function attachExpressApp(app: Application|Router, extra: Partial<I18nExpressConfig> = {}): I18nCreator {
	const i18n = new I18nCreator({
		debug: extra.debug || false,
	});
	
	i18n.use(new LanguageList(JsonEnv.translation.langList));
	i18n.use(new FetchBackend(JsonEnv.translation.serverUrl));
	i18n.use(new I18nExpress(extra, {
		"list": JsonEnv.translation.langList,
		"backend": JsonEnv.translation.serverUrl,
	}, app));
	
	i18n.createInstance();
	app['i18n'] = i18n;
	
	return i18n;
}

export function waitComplete(app: Application) {
	return app['i18n'].waitComplete();
}
