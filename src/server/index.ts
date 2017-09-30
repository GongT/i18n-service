import {JsonEnv} from "@gongt/jenv-data";
import {REQUEST_METHOD} from "@gongt/ts-stl-library/request/request-method";
import {bootExpressApp} from "@gongt/ts-stl-server/boot/express-init";
import {initServiceWait} from "@gongt/ts-stl-server/boot/init-systemd-service";
import {CrossDomainMiddleware} from "@gongt/ts-stl-server/communication/crossdomain/middleware";
import {initDefaultDatabaseConnection, waitDatabaseToConnect} from "@gongt/ts-stl-server/database/mongodb";
import {provideWithExpress} from "@gongt/ts-stl-server/express/middlewares/well-known-provider";
import * as express from "express";
import {Request} from "express-serve-static-core";
import * as logger from "morgan";
import {I18nExpress, I18nRequest} from "../package/express/index";
import {LocalTranslateService} from "./library/local-service";
import {translationRoutes} from "./translate-editor";

export const i18nDatabaseUrl = JsonEnv.DataBaseUrlTemplate.replace('%DATABASE-NAME%', 'Translation');
initDefaultDatabaseConnection(i18nDatabaseUrl);

const cors = new CrossDomainMiddleware;
cors.allowCredentials(true);
cors.allowMethods(REQUEST_METHOD.GET, REQUEST_METHOD.POST);

const app = express();

app.use(logger(':method :url :status - :response-time ms'));

app.use(cors.getMiddleware());

const i18n = new LocalTranslateService({
	debug: false,
	remoteUrl: JsonEnv.DataBaseUrlTemplate.replace('%DATABASE-NAME%', 'Translation'),
});
const instance = i18n.instance(process.env.PROJECT_NAME);

provideWithExpress(app, new I18nExpress(instance, {
	app: {
		ignoreRoutes: [
			'/public',
		],
	},
}));

app.get('/', (req: Request&I18nRequest, res) => {
	res.send(`<h1>translate test: ${req.t('xxx')}</h1>`)
});

translationRoutes(app, instance);

const p = Promise.all([
	waitDatabaseToConnect(),
	instance.wait,
]).then(() => {
	return bootExpressApp(app);
});

initServiceWait(p);
