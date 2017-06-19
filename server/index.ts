import "@gongt/jenv-data/global";
import {I18nCreator, LanguageList} from "@gongt/ts-stl-library/i18n/base";
import {REQUEST_METHOD} from "@gongt/ts-stl-library/request/request-method";
import {bootExpressApp} from "@gongt/ts-stl-server/boot/express-init";
import {initServiceWait} from "@gongt/ts-stl-server/boot/init-systemd-service";
import {CrossDomainMiddleware} from "@gongt/ts-stl-server/communication/crossdomain/middleware";
import {initDefaultDatabaseConnection, waitDatabaseToConnect} from "@gongt/ts-stl-server/database/mongodb";
import {I18nExpress, I18nRequest} from "@gongt/ts-stl-server/i18n/express";
import {I18nMongodb} from "@gongt/ts-stl-server/i18n/mongodb";
import * as express from "express";
import {Request} from "express-serve-static-core";
import * as logger from "morgan";
import {initTranslationProvider} from "./translation-provider";

const databaseUrl = JsonEnv.DataBaseUrlTemplate.replace('%DATABASE-NAME%', 'Translation');

const cors = new CrossDomainMiddleware;
cors.allowCredentials(true);
cors.allowMethods(REQUEST_METHOD.GET, REQUEST_METHOD.POST);

const app = express();

app.use(logger(':method :url :status - :response-time ms'));

app.use(cors.getMiddleware());

const i18n = new I18nCreator({
	debug: false,
});

i18n.use(new LanguageList(JsonEnv.translation.langList));
i18n.use(new I18nMongodb(databaseUrl));

const iexp = new I18nExpress({
	ignoreRoutes: ['/_i18n'],
});
iexp.attach(app);
i18n.use(iexp);

const n = i18n.createInstance();

app.get('/', (req: Request&I18nRequest, res) => {
	res.send(`<h1>${req.t('xxx')}</h1>`)
});

initDefaultDatabaseConnection(databaseUrl);

const p = Promise.all([
	waitDatabaseToConnect(),
	i18n.waitComplete(),
]).then(() => {
	initTranslationProvider(app, n);
}).then(() => {
	return bootExpressApp(app);
});

initServiceWait(p);
