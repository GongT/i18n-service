export interface TranslateResourceHolder {
	language: string;
	namespace: string;
	data: TranslateResource;
}
export interface TranslateResource {
	[id: string]: TranslateResource|string;
}
