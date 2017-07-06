import {ApiRequest, ApiResponse} from "@gongt/ts-stl-library/request/protocol";
import {ERequestType} from "@gongt/ts-stl-library/request/request";
import {JsonApiHandler} from "@gongt/ts-stl-server/express/api-handler";
import {getDatabase, getLanguageList, refreshLanguageList} from "./_init";
export const LangApi = 'language.json';

interface LanguagePut extends ApiRequest {
	lng: string;
}
export const lang = new JsonApiHandler<LanguagePut, ApiResponse>(ERequestType.TYPE_PUT, '/' + LangApi);
lang.handleArgument('lng').fromGet().filter((d) => {
	return d && !getLanguageList().includes(d);
});
lang.setHandler(async (context) => {
	const data = await getDatabase().addLanguage(context.params.lng);
	await refreshLanguageList();
	return {};
});
