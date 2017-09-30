import {i18n} from "i18next";
import {DetectorOptions as DetectorOptionsClient} from "i18next-browser-languagedetector";

export interface CookieOption {
	name: string;
	domain: string;
}

export interface DetectOptions {
	cookieName: string;
	cookieDomain?: string;
	qs: string;
}

export interface ITranslationServiceConfig {
	remoteUrl: string;
	detect: DetectOptions;
	langList: string[];
	debug: boolean;
}

export interface ITranslationConfigPassing extends ITranslationServiceConfig {
	language: string;
	projectName: string;
}

export interface DetectorOptionsServer {
	/* COPY from @types/i18next-express-middleware */
	caches?: Array<string>|boolean;
	cookieDomain?: string;
	cookieExpirationDate?: Date;
	lookupCookie?: string;
	lookupFromPathIndex?: number;
	lookupQuerystring?: string;
	lookupSession?: string;
	order?: Array<string>;
}

export type DetectorOptions = DetectorOptionsServer|DetectorOptionsClient;

export interface ITranslationServiceData<Type extends DetectorOptions> {
	remoteUrl: string;
	detection: Type;
	langList: string[];
	debug: boolean;
	language?: string;
	projectName?: string;
}

export type OptionsHandler = (p: Partial<ITranslationServiceConfig>) => ITranslationServiceData<DetectorOptions>;

export interface CreatorInfo {
	detect: DetectOptions;
	nsList: string[];
	lngList: string[];
	detectCookieName: string;
	detectCookieDomain: string;
}

export interface I18nObject extends i18n {
	wait: Promise<void>;
	extraInfo: CreatorInfo;
}
