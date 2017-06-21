import {APP_ROOT_PATH} from "@gongt/ts-stl-server/boot/detect-root";
import {createLogger, LEVEL} from "@gongt/ts-stl-server/debug";
import * as i18n from "i18next";
import * as FsBackend from "i18next-node-fs-backend";
import {resolve} from "path";
import {I18nPlugin} from "../../package/library/base";

const debug = createLogger(LEVEL.INFO, 'i18n');

export class I18nNodejs implements I18nPlugin {
	constructor(private localPath: string = 'locales') {
	}
	
	setLocalPath(path: string) {
		this.localPath = path;
	}
	
	__plugin(options: i18n.Options, use: (module: any) => void) {
		if (options.detection) {
			throw new Error("multiple detector found, that's not supported now.");
		}
		
		use(FsBackend);
		// options['initImmediate'] = false;
		
		const fsRoot = resolve(APP_ROOT_PATH, this.localPath || 'locales');
		options.backend = {
			// path where resources get loaded from
			loadPath: fsRoot + '/{{ns}}/{{lng}}.json',
			// path to post missing resources
			addPath: fsRoot + '/{{ns}}/{{lng}}.json',
			// jsonIndent to use when storing json files
			jsonIndent: 4,
		};
	}
}
