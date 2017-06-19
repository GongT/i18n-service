import {JsonEnv} from "@gongt/jenv-data";
import {I18nCreator, LanguageList} from "@gongt/ts-stl-library/i18n/base";
import {FetchBackend} from "@gongt/ts-stl-library/i18n/fetch";
import {I18nExpress} from "@gongt/ts-stl-server/i18n/express";
import {Application, Router} from "express-serve-static-core";

export function attachExpressApp(app: Application|Router): I18nCreator {
	const i18n = new I18nCreator({
		debug: true,
	});
	i18n.use(new LanguageList(JsonEnv.translation.langList));
	i18n.use(new I18nExpress({}, app));
	i18n.use(new FetchBackend(JsonEnv.translation.serverUrl));
	
	i18n.createInstance();
	
	app['i18n'] = i18n;
	
	return i18n;
}

export function waitComplete(app: Application) {
	return app['i18n'].waitComplete();
}
