import {ApiRequest, ApiResponse} from "@gongt/ts-stl-library/request/protocol";
import {ERequestType} from "@gongt/ts-stl-library/request/request";
import {JsonApiHandler} from "@gongt/ts-stl-server/express/api-handler";
import {getDatabase, refreshLanguageList} from "./_init";

export const PathApi = 'path.json';

interface PathAdd extends ApiRequest {
	path: string;
}

export const path = new JsonApiHandler<PathAdd, ApiResponse&any>(ERequestType.TYPE_PUT, '/' + PathApi);
path.handleArgument('path').fromGet().filter((d) => {
	return d.length > 0 && !/^\.|\.$/.test(d);
});
path.setHandler(async (context) => {
	const result = await getDatabase().writeKeyAll(context.params.path, context.params.path);
	await refreshLanguageList();
	return {result};
});

export const path_del = new JsonApiHandler<PathAdd, ApiResponse&any>(ERequestType.TYPE_DELETE, '/' + PathApi);
path_del.handleArgument('path').fromGet().filter((d) => {
	return d.length > 0 && !/^\.|\.$/.test(d);
});
path_del.setHandler(async (context) => {
	const result = await getDatabase().writeKeyAll(context.params.path, undefined);
	await refreshLanguageList();
	return {result};
});
