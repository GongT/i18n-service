import {ApiRequest, ApiResponse} from "@gongt/ts-stl-library/request/protocol";
import {ERequestType} from "@gongt/ts-stl-library/request/request";
import {JsonApiHandler} from "@gongt/ts-stl-server/express/api-handler";
import {TranslateResource} from "../../client/defines";
import {getDatabase, getLanguageList, getNamespaceList} from "./_init";
export const ReadApi = 'read.json';

// read api
interface LanguageGet extends ApiRequest {
	lng: string;
	ns: string;
}
interface LanguageResponse extends ApiResponse {
	lng: string;
	ns: string;
	payload: TranslateResource;
}
export const read = new JsonApiHandler<LanguageGet, LanguageResponse>(ERequestType.TYPE_GET, '/' + ReadApi);
read.handleArgument('ns').fromGet().filter((d) => {
	return getNamespaceList().includes(d);
});
read.handleArgument('lng').fromGet().filter((d) => {
	return getLanguageList().includes(d);
});
read.setHandler(async (context) => {
	const data = await getDatabase().readLanguage(context.params.lng, context.params.ns);
	return {
		ns: data.namespace,
		lng: data.language,
		payload: data.data,
	};
});
