import {Application} from "express-serve-static-core";
import * as i18n from "i18next";

export function initTranslationProvider(app: Application, i18next: i18n.I18n) {
	// const languageList = i18next.options;
	// app.get('/resources/:ns/resources.json', (req, res, next) => {
	// 	const namespace = req.params.ns;
	//
	// 	const i18n = i18next.cloneInstance({initImmediate: false});
	// 	// i18n.changeLanguage();
	//
	// 	console.log(namespace)
	// 	res.send(JSON.stringify(req['i18n']))
	// });
	// app.get('/load/:ns/:lng', (req, res, next) => {
	// 	const namespace = req.params.ns;
	// 	const language = req.params.lng.replace(/\.json$/, '');
	//
	// 	console.log(namespace, language)
	// 	res.send(JSON.stringify(req['i18n']))
	// });
}
