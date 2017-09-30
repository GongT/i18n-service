import {IS_CLIENT, IS_SERVER} from "@gongt/ts-stl-library/check-environment";
import {createInstance, InitOptions} from "i18next";
import {CreatorInfo, DetectorOptions, I18nObject, ITranslationServiceConfig, ITranslationServiceData} from "./def";
import {processDetector} from "./library/detect";
import {processBackend} from "./library/fetch";
import {processLanguageList} from "./library/language-list";
import {detectClientConfig} from "./library/options.client";
import {detectServerConfig} from "./library/options.express";

export const COMMON_NAMESPACE = 'common';

export class TranslateService {
	protected options: ITranslationServiceData<DetectorOptions>;
	protected config: InitOptions;
	protected registry = new Map<string|symbol, I18nObject>();
	protected inputConfig: Partial<ITranslationServiceConfig>;
	
	constructor(options: Partial<ITranslationServiceConfig> = {}) {
		this.options = IS_SERVER? detectServerConfig(options) : detectClientConfig(options);
		
		this.inputConfig = options;
		
		this.config = {
			debug: this.options.debug, // isDebugMode(),
			load: 'languageOnly',
			lowerCaseLng: true,
			saveMissing: IS_SERVER,
			saveMissingTo: 'all',
			returnEmptyString: false,
			returnNull: false,
			returnObjects: false,
			nonExplicitWhitelist: false,
			fallbackNS: COMMON_NAMESPACE,
			// defaultNS: ns,
			// ns: ns === COMMON_NAMESPACE? [ns] : [COMMON_NAMESPACE, ns],
		};
		
		this.createInstance(COMMON_NAMESPACE);
	}
	
	protected * init(config: InitOptions): IterableIterator<any> {
		const options = this.options;
		yield processLanguageList(config, options.langList);
		yield processBackend(config, options.remoteUrl);
		
		if (IS_CLIENT && options.language) {
			config.lng = options.language;
		} else {
			yield processDetector(config, options.detection);
		}
	}
	
	instance(namespace: string = this.options.projectName): I18nObject {
		if (!namespace) {
			throw new TypeError('no namespace.');
		}
		if (this.registry.has(namespace)) {
			return this.registry.get(namespace);
		}
		this.registry.set(namespace, this.createInstance(namespace));
		
		return this.registry.get(namespace);
	}
	
	removeInstance(namespace) {
		this.registry.delete(namespace);
	}
	
	private createInstance(namespace: string): I18nObject {
		const config = Object.assign({}, this.config);
		config.defaultNS = namespace;
		config.ns = [namespace];
		
		for (const data of Array.from(this.registry.keys())) {
			config.ns.push(data.toString());
		}
		
		const ret = createInstance();
		
		const complete = new Promise((resolve, reject) => {
			const wrappedCallback = (err, data) => err? reject(err) : resolve(data);
			for (const plugin of this.init(config)) {
				if (plugin) {
					ret.use(plugin)
				}
			}
			ret.init(config, wrappedCallback);
		});
		
		Object.defineProperty(ret, 'wait', {
			value: complete,
		});
		const extraInfo: CreatorInfo = {
			nsList: config.ns.slice(),
			lngList: this.options.langList,
			detectCookieName: this.options.detection.lookupCookie,
			detectCookieDomain: this.options.detection.cookieDomain,
			detect: this.inputConfig.detect,
		};
		Object.defineProperty(ret, 'extraInfo', {
			value: extraInfo,
		});
		
		return ret as any;
	}
}
