import {createLogger} from "@gongt/ts-stl-library/log/debug";
import {LOG_LEVEL} from "@gongt/ts-stl-library/log/levels";
import {EBodyType} from "@gongt/ts-stl-library/request/request";
import {initBodyParser} from "@gongt/ts-stl-server/express/base/body-parser";
import {Application, Router} from "express-serve-static-core";
import {i18n} from "i18next";
import * as request from "request-promise-native"
import {CreatorInfo, I18nObject} from "../def";

const debug_reload = createLogger(LOG_LEVEL.DEBUG, 'i18n.reload');
const data_reload = createLogger(LOG_LEVEL.DATA, 'i18n.reload');
const error_reload = createLogger(LOG_LEVEL.ERROR, 'i18n.reload');

export function attachReloadRoute(app: Router|Application, i18n: I18nObject, root: string = '/') {
	let nsList = ['common', process.env.PROJECT_NAME];
	let lngList = ['zh', 'en'];
	
	if (i18n.extraInfo) {
		const creatorInfo: CreatorInfo = i18n.extraInfo;
		nsList = creatorInfo.nsList;
		lngList = creatorInfo.lngList;
	}
	Array.isArray(i18n.options.ns)? i18n.options.ns : [i18n.options.ns];
	const inputStyle = "display:block;margin:10px;width:100%;padding:8px;font-size:x-large;";
	const lng = `<input name="lng[]" placeholder="Other Languages" value="" style="${inputStyle}">\n`;
	const ns = `<input name="ns[]" placeholder="Other Namespaces: 'common' OR '${process.env.PROJECT_NAME}' OR ..." value="" style="${inputStyle}">\n`;
	const lngInput = lngList.map((lng) => {
		return `<input name="lng[]" placeholder="${lng}" value="${lng}" style="${inputStyle}">`;
	}).join('\n');
	const nsInput = nsList.map((ns) => {
		return `<input name="ns[]" placeholder="${ns}" value="${ns}" style="${inputStyle}">`;
	}).join('\n');
	const html = `<!DOCTYPE html>
<html>
<head>
	<title>reload page</title>
	<base href="${root}">
</head>
<body>
	<form action="" method="post" style="font-size:larger;">
		${lngInput}${lng}${lng}
		<hr>
		${nsInput}${ns}${ns}${ns}${ns}
		<hr>
		<input type="submit" value="update" style="${inputStyle}">
	</form>
</body>
</html>`;
	
	app.get('/_i18n/reload', (req, res, next) => {
		res.header('Content-Type', 'text/html; charset=utf8').send(html);
	});
	app.post('/_i18n/reload', initBodyParser(EBodyType.TYPE_ENCODE), (req, res, next) => {
		(async function () {
			if (!req.body.lng || !req.body.ns) {
				throw {
					code: 400,
					message: 'input invalid',
				};
			}
			
			if (process.env.PROJECT_NAME !== 'i18n') {
				debug_reload('refresh remote resource storage');
				const remoteReloadResult = await request({
					baseUrl: i18n.extraInfo.remoteUrl,
					uri: req.originalUrl,
					form: req.body,
					method: 'POST',
				});
				console.log(remoteReloadResult)
			}
			
			debug_reload('refresh local resource storage');
			if (req['i18n']) {
				req['i18n'].off('languageChanged');
			}
			const lng = [].concat(req.body.lng).filter(e => e);
			const ns = [].concat(req.body.ns).filter(e => e);
			for (const n of ns) {
				for (const l of lng) {
					i18n.removeResourceBundle(l, n);
				}
				i18n['store'].addNamespaces(n);
			}
			i18n.reloadResources(lng, ns);
		})().then((ok) => {
			debug_reload('complete!');
			res.status(200).send('reload complete.');
		}, (e) => {
			error_reload('failed: ', e? e.message : '{*no info*}');
			res.status(e && e.code || 500).send('FAIL: ' + e? e.message : '???');
		});
	});
}
