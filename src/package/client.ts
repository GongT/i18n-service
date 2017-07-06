import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import {I18nCreator, LanguageList} from "./library/base";
import {FetchBackend} from "./library/fetch";

if (!window.fetch) {
	alert('your browser is too old. \nno fetch() api.');
}

export interface Options {
	list: string[];
	backend: string;
}

export function createI18n(options: Partial<Options> = <any>{}) {
	console.info('init i18n: ', options);
	
	const i18n = new I18nCreator;
	
	i18n.use(new LanguageList(options.list || lngDefine.options.list));
	i18n.use(new FetchBackend(options.backend || lngDefine.options.backend));
	
	i18n.createInstance();
	
	return i18n;
}

const globalVar = new GlobalVariable();
const lngDefine: any = globalVar.get('languageConfigFromServer') || {};
if (!lngDefine.language) {
	lngDefine.language = detectLanguage();
}
if (!lngDefine.options) {
	lngDefine.options = {};
}

if (!lngDefine.options.list) {
	lngDefine.options.list = detectLanguageList();
}

if (!lngDefine.options.backend) {
	lngDefine.options = {};
}

const getLangFromCookie = /i18n-lang=([a-z-_]+)/i;
function detectLanguage(): string {
	if (getLangFromCookie.test(document.cookie)) {
		return getLangFromCookie.exec(document.cookie)[1]
	} else {
		return navigator.language || 'en';
	}
}

function detectLanguageList() {
	return ['en']
}

function detectLanguageRemoteUrl() {
	return '/_i18n/resources.json';
}
