import {DataModel} from "@gongt/ts-stl-server/database/mongodb";
import {SchemaDefinition, SchemaTypes} from "mongoose";
import {TranslateResource, TranslateResourceHolder} from "../../client/defines";

const ISchema: SchemaDefinition = {
	_id: SchemaTypes.ObjectId,
	language: SchemaTypes.String,
	namespace: SchemaTypes.String,
	data: SchemaTypes.Mixed,
};

export class LanguageDatabase extends DataModel<TranslateResourceHolder> {
	protected createSchema() {
		return ISchema;
	}
	
	writeKey(language: string, namespace: string, keyPath: string, value: string) {
		return this.update({
			language,
			namespace,
		}, {
			$set: {
				[keyPath]: value,
			},
		}, {
			upsert: true,
		});
	}
	
	async readLanguage(language: string, namespace: string): Promise<TranslateResource> {
		const data = await this.getOne({
			language,
			namespace,
		});
		if (data) {
			return <any>data;
		}
		return {};
	}
}
