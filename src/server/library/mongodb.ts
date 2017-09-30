import {createLogger} from "@gongt/ts-stl-library/log/debug";
import {LOG_LEVEL} from "@gongt/ts-stl-library/log/levels";
import {InitOptions} from "i18next";

const MongoBackend = require('i18next-node-mongodb-backend');

const debug = createLogger(LOG_LEVEL.INFO, 'i18n');
const error = createLogger(LOG_LEVEL.ERROR, 'i18n');

export function processMongodbBackend(config: InitOptions, databaseUrl: string) {
	if (config.backend) {
		error('ExistsBackendConfig: %O', config.backend);
		throw new Error("multiple backend found, that's not supported now.");
	}
	// options['initImmediate'] = false;
	
	config.backend = {
		uri: databaseUrl,
		collection: 'TranslationResource',
		allowMultiLoading: false, // buggy
	};
	debug('i18n backend mongodb: %s', databaseUrl);
	return MongoBackend;
}

