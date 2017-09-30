import {Application, Router} from "express-serve-static-core";
import {I18nObject} from "../def";

export function missingKeyHandler(i18next) {
	return function (req, res) {
		const lngs = req.query['lng'].split(' ');
		const ns = req.query['ns'];
		
		if (!i18next.services.backendConnector) {
			return res.status(404).send('i18next-express-middleware:: no backend configured');
		}
		
		for (let m in req.body) {
			i18next.services.backendConnector.saveMissing(lngs, ns, m, req.body[m]);
		}
		res.send('ok');
	};
}
