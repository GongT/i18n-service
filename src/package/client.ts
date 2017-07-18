import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import * as i18n from "i18next";
import {TranslationFunction} from "i18next";
import {I18nCreator, LanguageList, MyExtendOptions} from "./library/base";
import {BDOptions, CookieOption, I18NextBrowser} from "./library/browser";
import {FetchBackend} from "./library/fetch";

if (!window.fetch) {
	alert('your browser is too old. \nno fetch() api.');
}

export interface ServerOptions extends Partial<i18n.InitOptions> {
	list: string[];
	backend: any;
	detection: BDOptions;
	// language: string;
}
export interface LanguageConfig extends ServerOptions, MyExtendOptions {
}

let promise: Promise<TranslationFunction>;
export function waitLanguageResource() {
	return promise;
}

export function createI18n(options: Partial<LanguageConfig> = <any>{}) {
	if (promise) {
		throw new Error('i18n: only support one instance on client');
	}
	
	console.groupCollapsed('Internationalization Initialization');
	console.info('options: %o', options);
	
	const {list, backend, detection, ...languageConfig}: LanguageConfig = detectLanguageConfig(options);
	console.info('  parsed options: %o', languageConfig);
	
	if (typeof backend !== 'string') {
		throw new TypeError('backend config must be a string');
	}
	
	const i18n = new I18nCreator(languageConfig);
	
	console.info('  languageList: %o', list);
	i18n.use(new LanguageList(list));
	
	console.info('  backend: %s', backend);
	i18n.use(new FetchBackend(backend));
	
	console.info('  detector: ');
	i18n.use(new I18NextBrowser(detection));
	
	i18n.createInstance();
	promise = i18n.waitComplete();
	
	promise.then((t) => {
		console.log(
			'%cInternationalization: %c%s',
			'font-size:large;font-weight:bold;',
			'font-size:large;font-weight:bold;color:red;',
			t('common:hello world'),
		);
	});
	
	console.groupEnd();
	
	return i18n;
}

function detectLanguageConfig(options: Partial<LanguageConfig>): LanguageConfig {
	const getFromServer: any = (GlobalVariable.get(window, 'languageConfigFromServer') || {});
	console.log('language config from server: %o', getFromServer);
	
	const {list, backend, language, projectName, detection, ...serverConfig} = getFromServer;
	
	return {
		...options,
		...serverConfig,
		detection: options.detection || detection || defaultDetection(),
		list: options.list || list || detectLanguageList(),
		backend: options.backend || backend || detectLanguageRemoteUrl(),
		// language: options.language || language || detectCurrentLanguage(),
		projectName: options.projectName || projectName,
	};
}

function defaultDetection(): BDOptions {
	const defaultCookie: CookieOption = {
		name: 'i18n-lang',
		domain: '',
	};
	return {
		cookie: defaultCookie,
		qs: 'language',
	}
}

const getLangFromCookie = /i18n-lang=([a-z-_]+)/i;
function detectCurrentLanguage(): string {
	if (getLangFromCookie.test(document.cookie)) {
		console.log('  read language from cookie.');
		return getLangFromCookie.exec(document.cookie)[1]
	} else {
		console.log('  use navigator language.');
		return navigator.language || 'en';
	}
}

function detectLanguageList() {
	return ['en']
}

function detectLanguageRemoteUrl() {
	return '/_i18n/resources.json';
}
