import {ApiRequest, ApiResponse} from "@gongt/ts-stl-library/request/protocol";
import {ERequestType} from "@gongt/ts-stl-library/request/request";
import {waitDatabaseToConnect} from "@gongt/ts-stl-server/database/mongodb";
import {JsonApiHandler} from "@gongt/ts-stl-server/express/api-handler";
import {LanguageDatabase} from "../library/raw-database";

let languageList: string[] = [];
let namespaceList: string[] = [];

let languageDatabase: LanguageDatabase;

export function getDatabase(): LanguageDatabase {
	return languageDatabase;
}

export function getLanguageList(): string[] {
	return languageList;
}

export function getNamespaceList(): string[] {
	return namespaceList;
}

export async function refreshLanguageList() {
	languageList = await languageDatabase.getLanguageList();
	console.log('languageList=', languageList);
	namespaceList = await languageDatabase.getNamespaceList();
	console.log('namespaceList=', namespaceList);
}

export function initDatabase() {
	languageDatabase = new LanguageDatabase;
	
	waitDatabaseToConnect().then(refreshLanguageList);
}

export const refresh = new JsonApiHandler<ApiRequest, ApiResponse>(ERequestType.TYPE_POST, '/reload');
refresh.setHandler(async (context) => {
	await refreshLanguageList();
	return {};
});
