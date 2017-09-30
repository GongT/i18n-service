import {isomorphicGlobal} from "@gongt/ts-stl-library/check-environment";
import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import {DetectorOptions as DetectorOptionsClient} from "i18next-browser-languagedetector";
import {ITranslationConfigPassing, ITranslationServiceConfig, ITranslationServiceData,} from "package/def";

// const getLangFromCookie = /i18n-lang=([a-z-_]+)/i;

export function detectClientConfig(options: Partial<ITranslationServiceConfig>): ITranslationServiceData<DetectorOptionsClient> {
	const serverData: ITranslationConfigPassing = (GlobalVariable.get(isomorphicGlobal, 'languageConfigFromServer') || {});
	console.log('language config from server: %o', options);
	options = Object.assign({}, serverData, options);
	options.debug = serverData.debug || options.debug;
	
	if (options.remoteUrl) {
		if (location.protocol === 'https:' && /^http:/.test(options.remoteUrl)) {
			options.remoteUrl = options.remoteUrl.replace(/^http:/, 'https:');
		}
	} else {
		options.remoteUrl = location.origin;
	}
	
	const ret: ITranslationServiceData<DetectorOptionsClient> = {
		remoteUrl: options.remoteUrl,
		langList: options.langList || ['en'],
		debug: options.debug,
		projectName: serverData.projectName,
		detection: {
			order: ['querystring', 'cookie', 'navigator'],
			caches: ['cookie'],
			lookupQuerystring: 'language',
			lookupCookie: 'i18n-lang',
			cookieDomain: '',
		},
	};
	
	if (!options.detect) {
		let defDomain: string = location.hostname;
		if (/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/.test(defDomain)) {
			// is ip address, do nothing
		} else {
			const hostBase = defDomain.split(/\./g).slice(-2).join('.');
			if (hostBase.indexOf('.') !== -1) {
				defDomain = '.' + defDomain;
			}
		}
		options.detect = {
			cookieName: 'i18nLng',
			cookieDomain: defDomain,
			qs: 'language',
		};
	}
	if (options.detect.cookieDomain) {
		ret.detection.cookieDomain = options.detect.cookieDomain;
	}
	if (options.detect.cookieName) {
		ret.detection.lookupCookie = options.detect.cookieName;
	}
	
	return ret;
}
