///<reference types="node"/>

import {InitOptions} from "i18next";
import * as Fetch from "i18next-xhr-backend";
import {ajax} from "./fetch.ajax";

export function processBackend(config: InitOptions, remote: string) {
	config.backend = {
		loadPath: remote + '?ns={{ns}}&lng={{lng}}',
		addPath: remote + '?ns={{ns}}&lng={{lng}}',
		allowMultiLoading: true,
		ajax: ajax,
		crossDomain: true,
		withCredentials: true,
	};
	return Fetch;
}
