import {IS_SERVER} from "@gongt/ts-stl-library/check-environment";
import * as i18n from "i18next";

export const COMMON_NAMESPACE = 'common';

export interface I18nPlugin {
	__plugin(options: i18n.Options, use: (module: any) => void);
	__modify?(orignal: i18n.I18n): i18n.I18n|void;
	__init?(options: i18n.Options): void;
}

export class I18nCreator {
	private modules: any[];
	private options: i18n.Options;
	private plugins: I18nPlugin[];
	private initPromise: Promise<i18n.TranslationFunction>;
	
	private resolver: [
		(t: i18n.TranslationFunction) => void,
		(e: Error) => void
		] = [null, null];
	
	constructor(options?: i18n.Options) {
		this.plugins = [];
		this.modules = [];
		this.initPromise = new Promise((resolve, reject) => {
			this.resolver = [resolve, reject];
		});
		this.options = {
			debug: false, // isDebugMode(),
			load: 'currentOnly',
			lowerCaseLng: true,
			saveMissing: IS_SERVER,
			saveMissingTo: 'all',
			returnEmptyString: false,
			returnNull: false,
			returnObjects: false,
			ns: [],
		};
		
		if (options) {
			Object.assign(this.options, options, {
				fallbackNS: COMMON_NAMESPACE,
			});
		}
		
		this.registerNamespace(COMMON_NAMESPACE);
		
		this.options['nonExplicitWhitelist'] = false;
		// this.options['initImmediate'] = IS_CLIENT;
	}
	
	registerNamespace(...nss: string[]) {
		(<string[]>this.options.ns).push(...nss);
	}
	
	use(plug: I18nPlugin) {
		this.plugins.push(plug);
		plug.__plugin(this.options, this._use.bind(this));
	}
	
	waitComplete(): Promise<i18n.TranslationFunction> {
		return this.initPromise;
	}
	
	/** @internal */
	private _use(module: any) {
		this.modules.push(module);
	}
	
	private inst: i18n.I18n;
	
	createInstance(): i18n.I18n {
		if (this.inst) {
			return this.inst;
		}
		
		for (let plugin of this.plugins) {
			if (plugin.__init) {
				plugin.__init(this.options);
			}
		}
		console.info('[i18n] i18next create instance: %j', this.options);
		
		let inst = i18n.createInstance();
		
		for (let module of this.modules) {
			inst = inst.use(module);
		}
		
		this.options['nonExplicitWhitelist'] = false;
		inst.init(this.options, (e, t) => {
			if (e) {
				this.resolver[1](e);
			} else {
				this.resolver[0](t);
			}
		});
		
		for (let plugin of this.plugins) {
			if (plugin.__modify) {
				inst = plugin.__modify(inst) || inst;
			}
		}
		
		return this.inst = inst;
	}
}

export class LanguageList implements I18nPlugin {
	constructor(private languageList: string[], private defaultLang?: string) {
	}
	
	setLanguageList(list: string[]) {
		this.languageList = list;
	}
	
	setDefaultLanguage(defaultLang: string) {
		this.defaultLang = defaultLang;
	}
	
	__plugin(options: i18n.Options, use: (module: any) => void) {
		options.whitelist = this.languageList.slice();
		if (IS_SERVER) {
			options.preload = this.languageList.slice();
		}
		
		if (!options.fallbackLng) {
			const defLang: string = this.defaultLang || this.languageList[0]
			options.fallbackLng = {
				'zh-cn': ['zh'],
				'zh-hans': ['zh'],
				'zh-tw': ['zh'],
				"default": [defLang],
			};
		}
	}
}
