import {createLogger} from "@gongt/ts-stl-library/log/debug";
import {LOG_LEVEL} from "@gongt/ts-stl-library/log/levels";
import {urlencoded} from "body-parser";
import {Application, Router} from "express-serve-static-core";
import {getResourcesHandler} from "i18next-express-middleware";
import {I18nObject} from "../def";
import {missingKeyHandler} from "./missing";

const debug = createLogger(LOG_LEVEL.INFO, 'i18n.express');

export function attachLocalProviderRoute(app: Router|Application, i18n: I18nObject, root: string = '/') {
	debug('export resources on /_i18n/resources.json');
	app.get('/_i18n/resources.json', getResourcesHandler(i18n, {}));
	app.post('/_i18n/resources.json', urlencoded({
		extended: false,
	}), missingKeyHandler(i18n));
}
