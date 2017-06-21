import {StatefulBaseComponent} from "@gongt/ts-stl-client/react/stateless-component";
import * as React from "react";
import {Group} from "./group";

const optionList = [
	<option value="" selected>--</option>,
];

export class MainHolder extends StatefulBaseComponent<any, any> {
	state = {
		editorReady: false,
		content: {},
		loading: false,
		currentLanguage: '',
		currentNamespace: '',
	};
	
	render() {
		
		return <div>
			<div style={parentStyle}>
				<select>
					${optionList}
				</select>
			</div>
			{
				this.state.editorReady? this.renderEditor() : this.renderEmpty()
			}
		</div>
	}
	
	renderEditor() {
		return <Group title="Resources" values={this.state.content}/>;
	}
	
	renderEmpty() {
		return <h1>
			select language above.
		</h1>;
	}
}
