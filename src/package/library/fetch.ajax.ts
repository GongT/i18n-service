import {IS_SERVER, isomorphicGlobal} from "@gongt/ts-stl-library/check-environment";
import {createLogger} from "@gongt/ts-stl-library/log/debug";
import {LOG_LEVEL} from "@gongt/ts-stl-library/log/levels";
import {HTTP} from "@gongt/ts-stl-library/request/request";

// @formatter:off
// COPY FROM i18next-xhr-backend
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function addQueryString(url, params) {
  if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
    var queryString = '',
        e = encodeURIComponent;

    // Must encode data
    for (var paramName in params) {
      queryString += '&' + e(paramName) + '=' + e(params[paramName]);
    }

    if (!queryString) {
      return url;
    }

    url = url + (url.indexOf('?') !== -1 ? '&' : '?') + queryString.slice(1);
  }

  return url;
}
// @formatter:on

const debug_fetch = createLogger(LOG_LEVEL.DEBUG, 'i18n.fetch');
const debug_error = createLogger(LOG_LEVEL.ERROR, 'i18n.fetch');
const debug_data = createLogger(LOG_LEVEL.DATA, 'i18n.fetch');

const fetcher: AjaxFunction = function (url, options: AjaxFunctionOptions, callback, data, cache) {
	const init: Partial<RequestInit> = {
		cache: 'default',
		headers: options.customHeaders,
		credentials: options.withCredentials? 'include' : 'same-origin',
	};
	
	if (cache) {
		if (!options.queryStringParams) {
			options.queryStringParams = {};
		}
		options.queryStringParams._ = Date.now().toString();
	}
	if (options.queryStringParams) {
		url = addQueryString(url, options.queryStringParams);
	}
	
	if (data) {
		init.method = 'POST';
		if (!init.headers) {
			init.headers = {};
		}
		if (typeof data === 'string') {
			init.body = data;
		} else {
			init.body = addQueryString('', data).substr(1);
			init.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
		}
	} else {
		init.method = 'GET';
	}
	
	if (options.crossDomain) {
		init.mode = 'cors';
	} else if (options.crossDomain === false) {
		init.mode = 'same-origin';
	} else {
		init.mode = 'no-cors';
	}
	
	debug_fetch('fetch: %s', url);
	debug_data(init);
	fetch(url, init).then(function (res: Response) {
		if (res.ok) {
			return res.text().then(function (json) {
				callback(json, res);
			});
		} else {
			debug_error('load failed, HTTP status: %s %s', res.status, res.statusText);
			callback(null, res);
		}
	}).catch((err) => {
		if (!err) {
			err = {};
		}
		if (!err.status) {
			err.status = HTTP.SERVICE_UNAVAILABLE;
		}
		debug_error('load failed: %s', err.message);
		callback(null, err)
	});
};

let ajaxFunc: AjaxFunction = fetcher;
const fetch = isomorphicGlobal.fetch || (
	IS_SERVER? require("node-fetch") : require("whatwg-fetch")
);

export const ajax: AjaxFunction = ajaxFunc;

export interface AjaxFunctionOptions {
	queryStringParams?: {[name: string]: string};
	crossDomain?: boolean;
	withCredentials?: boolean;
	customHeaders?: {[name: string]: string};
}

export interface AjaxFunction {
	(url: string,
	 options: AjaxFunctionOptions,
	 callback: (data: string, res: Response) => void,
	 data?: any,
	 cache?: boolean)
}
