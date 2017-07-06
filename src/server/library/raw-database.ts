import {DataModel, MyDocument} from "@gongt/ts-stl-server/database/mongodb";
import {SchemaDefinition, SchemaTypes, Types} from "mongoose";
import {TranslateResourceHolder} from "../../client/defines";

const ISchema: SchemaDefinition = {
	_id: SchemaTypes.ObjectId,
	language: SchemaTypes.String,
	namespace: SchemaTypes.String,
	data: SchemaTypes.Mixed,
};

export interface TranslateResourceDocument extends TranslateResourceHolder, MyDocument {
}

export class LanguageDatabase extends DataModel<TranslateResourceDocument> {
	get tableName() {
		return 'TranslationResource';
	}
	
	protected createSchema() {
		return ISchema;
	}
	
	async getNamespaceList(): Promise<string[]> {
		const namespaceList: string[] = [];
		const data = await this.model.db.db.command({
			"distinct": this.tableName,
			"key": "namespace",
		});
		for (let l of data.values) {
			namespaceList.push(l);
		}
		return namespaceList;
	}
	
	async getLanguageList(): Promise<string[]> {
		const languageList: string[] = [];
		const data = await this.model.db.db.command({
			"distinct": this.tableName,
			"key": "language",
		});
		for (let l of data.values) {
			languageList.push(l);
		}
		return languageList;
	}
	
	async writeKeyAll(path: string, value: string) {
		const ls = await this.getLanguageList();
		let [namespace, keyPath] = path.split(':');
		if (!namespace) {
			throw new Error('no key path');
		}
		if (!keyPath) {
			keyPath = namespace;
			namespace = 'common';
		}
		for (let lng of ls) {
			await this.writeKey(lng, namespace, keyPath, value);
		}
	}
	
	async writeKey(language: string, namespace: string, keyPath: string, value: string) {
		let ret: any;
		if (value === undefined) {
			ret = await this.update({
				language,
				namespace,
			}, {
				$unset: {
					['data.' + keyPath]: 1,
				},
			});
		} else {
			ret = await this.update({
				language,
				namespace,
			}, {
				$set: {
					['data.' + keyPath]: value,
				},
			}, {
				upsert: true,
			});
		}
		
		this.debug('update key: language  = %s', language);
		this.debug('            namespace = %s', namespace);
		this.debug('            path      = %s', keyPath);
		this.debug('            value     = %s', value);
		this.debug('            result    = %j', ret);
		
		return ret;
	}
	
	async addLanguage(language: string): Promise<void> {
		const list = await this.find({
			language: 'en',
		});
		for (let item of list) {
			item.language = language;
			this.debug('create %s on %s', item.namespace, item.language);
			item._id = Types.ObjectId();
			item.isNew = true;
			await this.insert(item);
		}
		if (list.length === 0) {
			const item = this.create();
			item.language = language;
			item.namespace = 'common';
			await this.insert(item);
		}
	}
	
	async readLanguage(language: string, namespace: string): Promise<TranslateResourceHolder> {
		let data = await this.findOne({
			language,
			namespace,
		});
		if (data) {
			return <any>data;
		}
		
		if (language !== 'en') {
			const enData = await this.findOne({
				language: 'en',
				namespace,
			});
			if (enData) {
				this.debug('not found translate %s@%s, copy from en', namespace, language);
				const copy = this.create();
				copy.namespace = enData.namespace;
				copy.data = enData.data;
				copy.language = language;
				const d = await this.insert(copy);
				
				data = await this.findOne({
					language,
					namespace,
				});
				
				if (data) {
					return <any>data;
				}
			}
		}
		
		return {
			language,
			namespace,
			data: {},
		};
	}
}
