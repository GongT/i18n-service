import {createLogger, LEVEL} from "@gongt/ts-stl-server/debug";
import * as i18n from "i18next";
import {I18nPlugin} from "../../package/library/base";
const MongoBackend = require('i18next-node-mongodb-backend');

const debug = createLogger(LEVEL.INFO, 'i18n');

export class I18nMongodb implements I18nPlugin {
	constructor(private databaseUrl: string, private collection = 'TranslationResource') {
	}
	
	__plugin(options: i18n.InitOptions, use: (module: any) => void) {
		if (options.backend) {
			throw new Error("multiple backend found, that's not supported now.");
		}
		use(MongoBackend);
		// options['initImmediate'] = false;
		
		options.backend = {
			uri: this.databaseUrl,
			collection: this.collection,
		};
	}
}
