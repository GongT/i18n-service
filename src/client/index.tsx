import {ReactRender} from "@gongt/ts-stl-client/react/render";
import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import * as React from "react";
import "whatwg-fetch";
import {MainHolder} from "./main-holder";

export const globalVar = new GlobalVariable();
const react = new ReactRender();

react.setMainApp(() => {
	return <MainHolder/>;
});
react.render(globalVar);
