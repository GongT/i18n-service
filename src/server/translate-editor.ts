import {ApiRequest, ApiResponse} from "@gongt/ts-stl-library/request/protocol";
import {ERequestType} from "@gongt/ts-stl-library/request/request";
import {JsonApiHandler} from "@gongt/ts-stl-server/express/api-handler";
import {HtmlContainer} from "@gongt/ts-stl-server/express/middlewares/html-render";
import {provideWithExpress} from "@gongt/ts-stl-server/express/middlewares/well-known-provider";
import {JspmPackagePlugin} from "@gongt/ts-stl-server/express/render/jspm";
import {Router} from "express";
import {Application} from "express-serve-static-core";

export function translationRoutes(app: Application) {
	const r = Router();
	app.use('/editor', r);
	const ReadApi = '/read.json';
	const WriteApi = '/write.json';
	
	// homepage
	const html = new HtmlContainer();
	html.addHead(`<title>Microduino Translate</title>`);
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
	});
	html.plugin(jspm);
	provideWithExpress(app, jspm);
	r.get('/', html.createMiddleware());
	
	// read api
	const read = new JsonApiHandler<ApiRequest, ApiResponse>(ERequestType.TYPE_GET, ReadApi);
	read.setHandler((context) => {
	
	});
	read.registerRouter(r);
	
	// write api
	const write = new JsonApiHandler<ApiRequest, ApiResponse>(ERequestType.TYPE_GET, WriteApi);
	write.setHandler((context) => {
	
	});
	write.registerRouter(r);
}
