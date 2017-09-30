import {IS_SERVER} from "@gongt/ts-stl-library/check-environment";
import {InitOptions} from "i18next";
import {DetectorOptions} from "../def";

const Detector = IS_SERVER
	? require("i18next-express-middleware").LanguageDetector
	: require("i18next-browser-languagedetector");

export function processDetector(config: InitOptions, detect: DetectorOptions) {
	config.detection = detect;
	return Detector;
}
