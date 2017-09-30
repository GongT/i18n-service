import {IS_CLIENT} from "@gongt/ts-stl-library/check-environment";
import {InitOptions} from "i18next";
import {TranslateService} from "../../package/index";
import {processDetector} from "../../package/library/detect";
import {processLanguageList} from "../../package/library/language-list";
import {i18nDatabaseUrl} from "../index";
import {processMongodbBackend} from "./mongodb";

export class LocalTranslateService extends TranslateService {
	protected * init(config: InitOptions): IterableIterator<any> {
		const options = this.options;
		yield processLanguageList(config, options.langList);
		yield processMongodbBackend(config, i18nDatabaseUrl);
		
		if (IS_CLIENT && options.language) {
			config.lng = options.language;
		} else {
			yield processDetector(config, options.detection);
		}
	}
}
