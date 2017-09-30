///<reference types="node"/>

import {TranslateService} from "@gongt/i18n-client";
import {ReactRender} from "@gongt/ts-stl-client/react/render";
import {isomorphicGlobal} from "@gongt/ts-stl-library/check-environment";
import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import {EventEmitter} from "events";
import * as React from "react";
import "whatwg-fetch";
import {MainHolder} from "./main-holder";

const i18n = new TranslateService();
const translator = i18n.instance();
export const t = translator.t.bind(translator);

const react = new ReactRender();

GlobalVariable.set(isomorphicGlobal, 'globalEvent', new EventEmitter);

react.setMainApp(() => {
	return <MainHolder/>;
});

translator.wait.catch().then(() => {
	react.render();
});
