import * as i18n from "i18next";
import {I18nPlugin} from "./base";
const BrowserDetector = require("i18next-browser-languagedetector");

export interface CookieOption {
	name: string;
	domain: string;
}
export interface BDOptions {
	cookie: CookieOption;
	qs: string;
}
export class I18NextBrowser implements I18nPlugin {
	constructor(protected opt: BDOptions) {
	}
	
	__plugin(options: i18n.InitOptions, use: (module: any) => void) {
		use(BrowserDetector);
		options.detection = {
			// order and from where user language should be detected
			order: ['cookie', 'navigator'],
			lookupQuerystring: this.opt.qs,
			lookupCookie: this.opt.cookie.name,
			// cache user language on
			caches: ['cookie'],
			excludeCacheFor: ['cimode'],
			// optional expire and domain for set cookie
			cookieDomain: this.opt.cookie.domain,
		};
	}
}
