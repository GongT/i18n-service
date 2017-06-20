import {IS_CLIENT, isomorphicGlobal} from "@gongt/ts-stl-library/check-environment";

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
		init.body = addQueryString('', data).substr(1);
		init.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
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
	
	// console.log('fetch: %s | %j', url, init)
	fetch(url, init).then(function (res: Response) {
		if (res.ok) {
			return res.text().then(function (json) {
				callback(json, res);
			});
		}
		
		return callback('', res);
	});
};

let ajaxFunc: AjaxFunction;
if (isomorphicGlobal.hasOwnProperty('fetch')) {
	ajaxFunc = fetcher
} else if (IS_CLIENT) {
	ajaxFunc = undefined; // use default - XMLHTTPRequest
} else {
	require("isomorphic-fetch");
	ajaxFunc = fetcher;
}
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
