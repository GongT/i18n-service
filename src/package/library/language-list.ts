import {IS_SERVER} from "@gongt/ts-stl-library/check-environment";
import {InitOptions} from "i18next";

export function processLanguageList(options: InitOptions, langList: string[]) {
	options.whitelist = langList.slice();
	
	if (IS_SERVER) {
		options.preload = langList.slice();
	}
	
	if (!options.fallbackLng) {
		const defLang: string = langList[0];
		options.fallbackLng = <any>{
			'default': [defLang],
			'0': defLang,
		};
	}
}
