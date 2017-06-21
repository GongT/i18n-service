import {DataModel} from "@gongt/ts-stl-server/database/mongodb";
import {SchemaDefinition, SchemaTypes} from "mongoose";
import {TranslateResourceHolder} from "../../client/defines";

const ISchema: SchemaDefinition = {
	_id: SchemaTypes.ObjectId,
	language: SchemaTypes.String,
	namespace: SchemaTypes.String,
	data: SchemaTypes.Mixed,
};

export class LanguageDatabase extends DataModel<TranslateResourceHolder> {
	get tableName() {
		return 'TranslationResource';
	}
	
	protected createSchema() {
		return ISchema;
	}
	
	async writeKey(language: string, namespace: string, keyPath: string, value: string) {
		const ret = await this.update({
			language,
			namespace,
		}, {
			$set: {
				['data.' + keyPath]: value,
			},
		}, {
			upsert: true,
		});
		
		this.debug('update key: language  = %s', language);
		this.debug('            namespace = %s', namespace);
		this.debug('            path      = %s', keyPath);
		this.debug('            value     = %s', value);
		this.debug('            result    = %j', ret);
		
		return ret;
	}
	
	async readLanguage(language: string, namespace: string): Promise<TranslateResourceHolder> {
		const data = await this.getOne({
			language,
			namespace,
		});
		if (data) {
			return <any>data;
		}
		return {
			language,
			namespace,
			data: {},
		};
	}
}
