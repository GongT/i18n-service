import {JspmCdnPlugin} from "@gongt/jspm";
import {HtmlContainer} from "@gongt/ts-stl-server/express/middlewares/html-render";
import {provideWithExpress} from "@gongt/ts-stl-server/express/middlewares/well-known-provider";
import {Router} from "express";
import {Application} from "express-serve-static-core";
import {I18n} from "i18next";
import {getLanguageList, getNamespaceList, initDatabase} from "./edit-api/_init";
import {lang, LangApi} from "./edit-api/lang";
import {path, path_del, PathApi} from "./edit-api/path";
import {read, ReadApi} from "./edit-api/read";
import {write, WriteApi} from "./edit-api/write";
const basicAuth = require('express-basic-auth');

export function translationRoutes(app: Application, i18n: I18n) {
	initDatabase();
	
	const r = Router();
	const baseUrl = '/editor';
	
	app.use(baseUrl, basicAuth({
		challenge: true,
		realm: 'translation webpage',
		users: {
			'translate': 'wbZ!#$ASsm0%j701*8wW',
		},
	}), r);
	
	// homepage
	const html = new HtmlContainer();
	html.addHead(`<title>Microduino Translate</title>`);
	html.addHead(`<base href="${baseUrl}/">`);
	const jspm = new JspmCdnPlugin({
		packageName: 'client',
	});
	html.addHead(`<style type="text/css">
*{
	box-sizing: border-box;
}
</style>`);
	html.dynamic((context) => {
		context.global.set('ReadApi', ReadApi);
		context.global.set('WriteApi', WriteApi);
		context.global.set('PathApi', PathApi);
		context.global.set('LangApi', LangApi);
		context.global.set('languageList', getLanguageList());
		context.global.set('namespaceList', getNamespaceList());
		context.global.set('Authorization', context.request.header('Authorization'));
	});
	html.plugin(jspm);
	provideWithExpress(app, jspm);
	r.get('/', html.createMiddleware());
	
	read.registerRouter(r);
	write.registerRouter(r);
	lang.registerRouter(r);
	path.registerRouter(r);
	path_del.registerRouter(r);
}
