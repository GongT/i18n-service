import {ApiRequest, ApiResponse, STATUS_CODE} from "@gongt/ts-stl-library/request/protocol";
import {ERequestType, RawBodyType} from "@gongt/ts-stl-library/request/request";
import {RequestError} from "@gongt/ts-stl-library/request/request-error";
import {waitDatabaseToConnect} from "@gongt/ts-stl-server/database/mongodb";
import {JsonApiHandler} from "@gongt/ts-stl-server/express/api-handler";
import {HtmlContainer} from "@gongt/ts-stl-server/express/middlewares/html-render";
import {provideWithExpress} from "@gongt/ts-stl-server/express/middlewares/well-known-provider";
import {JspmPackagePlugin} from "@gongt/ts-stl-server/express/render/jspm";
import {Router} from "express";
import {Application} from "express-serve-static-core";
import {I18n} from "i18next";
import {LanguageDatabase} from "./library/raw-database";
const basicAuth = require('express-basic-auth');

export function translationRoutes(app: Application, i18n: I18n) {
	const r = Router();
	const baseUrl = '/editor';
	const ReadApi = 'read.json';
	const WriteApi = 'write.json';
	const languageList: string[] = [];
	const namespaceList: string[] = [];
	
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
	const jspm = new JspmPackagePlugin({
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
		context.global.set('languageList', languageList);
		context.global.set('namespaceList', namespaceList);
		context.global.set('Authorization', context.request.header('Authorization'));
	});
	html.plugin(jspm);
	provideWithExpress(app, jspm);
	r.get('/', html.createMiddleware());
	
	const languageDatabase = new LanguageDatabase;
	waitDatabaseToConnect().then(() => {
		languageDatabase.model.db.db.command({
			"distinct": languageDatabase.name,
			"key": "language",
		}).then((data) => {
			for (let l of data.values) {
				languageList.push(l);
			}
		});
		languageDatabase.model.db.db.command({
			"distinct": languageDatabase.name,
			"key": "namespace",
		}).then((data) => {
			for (let l of data.values) {
				namespaceList.push(l);
			}
		});
	});
	
	// read api
	interface LanguageGet extends ApiRequest {
		lng: string;
		ns: string;
	}
	const read = new JsonApiHandler<LanguageGet, ApiResponse>(ERequestType.TYPE_GET, '/' + ReadApi);
	read.handleArgument('ns').fromGet().filter((d) => {
		return namespaceList.includes(d);
	});
	read.handleArgument('lng').fromGet().filter((d) => {
		return languageList.includes(d);
	});
	read.setHandler(async (context) => {
		const data = await languageDatabase.readLanguage(context.params.lng, context.params.ns);
		return {
			ns: data.namespace,
			lng: data.language,
			payload: data.data,
		};
	});
	read.registerRouter(r);
	
	// write api
	interface LanguageSet extends ApiRequest {
		lng: string;
		ns: string;
		value: string;
		path: string;
	}
	const write = new JsonApiHandler<LanguageSet, ApiResponse>(ERequestType.TYPE_POST, '/' + WriteApi);
	write.handleArgument('ns').fromGet().filter((d) => {
		return namespaceList.includes(d);
	});
	write.handleArgument('lng').fromGet().filter((d) => {
		return languageList.includes(d);
	});
	write.handleArgument('path').fromGet();
	write.handleArgument('value').fromBody().type(RawBodyType.TYPE_TEXT);
	write.setHandler(async (context) => {
		const {ns, lng, value, path} = context.params;
		if (!value || !path) {
			throw new RequestError(STATUS_CODE.INVALID_INPUT, 'empty value');
		}
		
		const ret = await languageDatabase.writeKey(lng, ns, path, value);
		
		i18n['reloadResources'](lng, ns);
		
		return ret;
	});
	write.registerRouter(r);
}
