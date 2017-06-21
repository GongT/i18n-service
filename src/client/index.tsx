import {ReactRender} from "@gongt/ts-stl-client/react/render";
import * as React from "react";
import "whatwg-fetch";
import {MainHolder} from "./main-holder";

const react = new ReactRender();

react.setMainApp(() => {
	return <MainHolder/>;
});
react.render();
