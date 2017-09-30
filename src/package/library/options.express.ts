import {JsonEnv} from "@gongt/jenv-data";
import {alertJenv} from "@gongt/jenv-data/alert";
import * as i18n from "i18next";
import {DetectorOptionsServer, ITranslationServiceConfig, ITranslationServiceData} from "package/def";

const ps: Promise<i18n.TranslationFunction[]>[] = [];
export const isSelfDebugging = process.env.I18N_PACKAGE_DEBUG || (process.env.PROJECT_NAME === 'i18n' && !process.env.RUN_IN_DOCKER);

export function detectServerConfig(options: Partial<ITranslationServiceConfig>): ITranslationServiceData<DetectorOptionsServer> {
	const ret: ITranslationServiceData<DetectorOptionsServer> = {
		remoteUrl: options.remoteUrl,
		langList: options.langList,
		debug: options.debug || false,
		projectName: process.env.PROJECT_NAME,
		detection: {
			order: ['querystring', 'cookie', 'header'],
			caches: ['cookie'],
			lookupQuerystring: 'language',
			lookupCookie: 'i18n-lang',
			cookieDomain: '',
			lookupFromPathIndex: -1,
		},
	};
	
	alertJenv(options, 'detect');
	if (!options.detect) {
		options.detect = JsonEnv.translation.detect;
	}
	if (options.detect.cookieDomain) {
		ret.detection.cookieDomain = options.detect.cookieDomain;
	}
	if (options.detect.cookieName) {
		ret.detection.lookupCookie = options.detect.cookieName;
	}
	
	alertJenv(ret, 'langList');
	ret.langList = JsonEnv.translation.langList;
	
	alertJenv(ret, 'remoteUrl');
	if (isSelfDebugging) { // debugging myself
		ret.remoteUrl = `http://127.0.0.1:${JsonEnv.translation.debugPort}`;
	} else if (JsonEnv.translation.serverUrl) {
		ret.remoteUrl = JsonEnv.translation.serverUrl
	} else {
		ret.remoteUrl = 'http://i18n.' + JsonEnv.baseDomainName;
	}
	if (/\/$/.test(ret.remoteUrl)) {
		ret.remoteUrl = ret.remoteUrl.replace(/\/$/g, '');
	}
	
	if (!ret.debug) {
		if (process.env.I18N_DEBUG) {
			ret.debug = true;
		}
	}
	
	return ret;
}
