import {JspmCdnPlugin} from "@gongt/jspm";
import {HtmlContainer} from "@gongt/ts-stl-server/express/middlewares/html-render";
import {provideWithExpress} from "@gongt/ts-stl-server/express/middlewares/well-known-provider";
import {Router} from "express";
import {Application} from "express-serve-static-core";
import {resolve} from "path";
import * as serveStatic from "serve-static";
import {I18nObject} from "../package/def";
import {getLanguageList, getNamespaceList, initDatabase, refresh} from "./edit-api/_init";
import {lang, LangApi} from "./edit-api/lang";
import {path, path_del, PathApi} from "./edit-api/path";
import {read, ReadApi} from "./edit-api/read";
import {write, WriteApi} from "./edit-api/write";

const basicAuth = require('express-basic-auth');

export function translationRoutes(app: Application, i18n: I18nObject) {
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
	
	app.use('/public/npm-package', serveStatic(resolve(__dirname, '../npm-package'), {
		fallthrough: false,
	}));
	
	// homepage
	const html = new HtmlContainer();
	html.addHead(`<title>Microduino Translate</title>`);
	html.addHead(`<base href="${baseUrl}/">`);
	const jspm = new JspmCdnPlugin({
		packageName: 'client',
	});
	jspm.addNodeModulesLayer(resolve(__dirname, '../../node_modules'));
	const cfg = jspm.jspmConfig();
	cfg.registerNodeModules('i18next');
	cfg.registerNodeModules('i18next-browser-languagedetector');
	cfg.registerNodeModules('i18next-xhr-backend');
	cfg.pathMap('@gongt/i18n-client', '/public/npm-package');
	cfg.manualRegisterModule('@gongt/i18n-client', {
		"format": "cjs",
		"defaultExtension": "js",
		"main": "index",
		map: {
			"node-fetch": "@empty",
			"i18next-express-middleware": "@empty",
			"./library/options.express": "@empty",
		},
	});
	
	jspm.ignoreIE();
	html.addHead(`<style type="text/css">
*{
	box-sizing: border-box;
}
</style>`);
	html.dynamic('api routers', (context) => {
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
	refresh.registerRouter(r);
}
