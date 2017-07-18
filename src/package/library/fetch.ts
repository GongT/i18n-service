///<reference types="node"/>

import * as i18n from "i18next";
import * as Fetch from "i18next-xhr-backend";
import {I18nPlugin} from "./base";
import {ajax} from "./fetch.ajax";

export class FetchBackend implements I18nPlugin {
	private url: string;
	
	constructor(url: string = '') {
		this.setRemote(url);
	}
	
	setRemote(url: string) {
		this.url = url.replace(/\/$/g, '');
	}
	
	__plugin(options: i18n.InitOptions, use: (module: any) => void) {
		if (options.backend) {
			throw new Error("multiple backend found, that's not supported now.");
		}
		
		use(Fetch);
		options.backend = {
			// path where resources get loaded from
			loadPath: this.url + '/_i18n/resources.json?ns={{ns}}&lng={{lng}}',
			// path to post missing resources
			addPath: this.url + '/_i18n/resources.json?ns={{ns}}&lng={{lng}}',
			allowMultiLoading: true,
			ajax: ajax,
			crossDomain: true,
			withCredentials: true,
		};
	}
}
