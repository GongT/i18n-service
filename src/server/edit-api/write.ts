import {ApiRequest, ApiResponse, STATUS_CODE} from "@gongt/ts-stl-library/request/protocol";
import {ERequestType, RawBodyType} from "@gongt/ts-stl-library/request/request";
import {RequestError} from "@gongt/ts-stl-library/request/request-error";
import {JsonApiHandler} from "@gongt/ts-stl-server/express/api-handler";
import * as i18n from "i18next";
import {getDatabase, getLanguageList, getNamespaceList, refreshLanguageList} from "./_init";

export const WriteApi = 'write.json';

// write api
interface LanguageSet extends ApiRequest {
	lng: string;
	ns: string;
	value: string;
	path: string;
}

export const write = new JsonApiHandler<LanguageSet, ApiResponse&any>(ERequestType.TYPE_POST, '/' + WriteApi);
write.handleArgument('ns').fromGet().filter((d) => {
	return getNamespaceList().includes(d);
});
write.handleArgument('lng').fromGet().filter((d) => {
	return getLanguageList().includes(d);
});
write.handleArgument('path').fromGet();
write.handleArgument('value').fromBody().type(RawBodyType.TYPE_TEXT);
write.setHandler(async (context) => {
	const {ns, lng, value, path} = context.params;
	if (!value || !path) {
		throw new RequestError(STATUS_CODE.INVALID_INPUT, 'empty value');
	}
	
	const ret = await getDatabase().writeKey(lng, ns, path, value);
	
	if (context._request_raw['i18n']) {
		context._request_raw['i18n'].off('languageChanged');
	}
	
	let reloadRet: any;
	try {
		reloadRet = i18n['reloadResources'](<any>lng, <any>ns);
	} catch (e) {
		reloadRet = e;
	}
	
	await refreshLanguageList();
	return {
		ret: ret,
		reload: reloadRet,
	};
});
