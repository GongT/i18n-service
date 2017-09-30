import {IExpressProvide} from "@gongt/ts-stl-server/express/middlewares/well-known-provider";
import {Application, Router} from "express-serve-static-core";
import {i18n, TranslationFunction} from "i18next";
import {I18nObject} from "../def";
import {attachLocalProviderRoute} from "./local.route";
import {attachMainRoute, I18nExpressConfig} from "./main.route";
import {attachReloadRoute} from "./reload.route";

export interface I18nAttachConfig {
	app?: I18nExpressConfig;
	root?: string;
}

export interface I18nRequest {
	i18n: i18n;
	t: TranslationFunction;
	language: string;
}

export class I18nExpress implements IExpressProvide {
	protected root: string;
	
	constructor(private i18n: I18nObject, protected config: I18nAttachConfig = {}) {
		this.root = config.root || '/';
	}
	
	__express_provide(app: Application|Router): Promise<any> {
		attachReloadRoute(app, this.i18n, this.root);
		attachMainRoute(app, this.config.app || {}, this.i18n, this.root);
		attachLocalProviderRoute(app, this.i18n, this.root);
		return this.i18n.wait;
	}
}
