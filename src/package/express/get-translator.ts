import {RequestContext} from "@gongt/ts-stl-server/express/base/context";
import {TranslationFunction} from "i18next";

export function T(context: RequestContext<any, any>): TranslationFunction {
	return context._request_raw['t'];
}
