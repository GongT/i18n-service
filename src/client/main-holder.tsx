import {BindThis, StatefulBaseComponent} from "@gongt/ts-stl-client/react/stateless-component";
import * as React from "react";
import {CSSProperties} from "react";
import {TranslateResource} from "./defines";
import {FetchApi} from "./fetch-api";
import {globalVar} from "./global";
import {Group} from "./group";

const langSelList = [
	<option value="" selected disabled={true}>--</option>,
];
const textSelList = [
	<option value="" selected disabled={true}>--</option>,
];

(() => {
	const llist = globalVar.get('languageList');
	for (let l of llist) {
		langSelList.push(
			<option value={l}>{l}</option>,
		);
	}
	const nlist = globalVar.get('namespaceList');
	for (let n of nlist) {
		textSelList.push(
			<option value={n}>{n}</option>,
		);
	}
})();

const parentStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
};
const childStyle: CSSProperties = {
	flexGrow: 1,
	display: 'flex',
	flexDirection: 'row',
	margin: '6px 18px',
};
const labelStyle: CSSProperties = {
	width: '38%',
};
const optionStyle: CSSProperties = {
	flexGrow: 1,
};

export interface IState {
	editorReady: boolean,
	content: TranslateResource,
	loading: boolean,
	currentLanguage: string,
	currentNamespace: string,
	failed: string,
}

export class MainHolder extends StatefulBaseComponent<any, IState> {
	state: IState = {
		editorReady: false,
		content: {},
		loading: false,
		currentLanguage: '',
		currentNamespace: '',
		failed: '',
	};
	
	render() {
		if (this.state.editorReady) {
			return <div>
				{this.renderSelector()}
				{this.renderEditor()}
			</div>;
		} else if (this.state.loading) {
			return <div>
				{this.renderSelector()}
				<h1>loading...</h1>
			</div>;
		} else if (this.state.failed) {
			return <div>
				{this.renderSelector(true)}
				<h1>Failed! {this.state.failed}.</h1>
			</div>;
		} else {
			return <div>
				{this.renderSelector(true)}
				{this.renderEmpty()}
			</div>;
		}
	}
	
	renderSelector(enabled: boolean = false) {
		return (
			<div>
				<div style={parentStyle}>
					<div style={childStyle}>
						<label htmlFor="selectLang" style={labelStyle}>language:</label>
						<select
							disabled={!enabled}
							onChange={e => this.setState({'currentLanguage': e.target.value})}
							id="selectLang" style={optionStyle}>
							${langSelList}
						</select>
					</div>
					<div style={childStyle}>
						<label htmlFor="selectNamespace" style={labelStyle}>text list:</label>
						<select
							disabled={!enabled}
							onChange={e => this.setState({'currentNamespace': e.target.value})}
							id="selectNamespace" style={optionStyle}>
							${textSelList}
						</select>
					</div>
					<div style={{...childStyle, flexGrow: 0}}>
						<button onClick={this.startLoading}>OK</button>
					</div>
				</div>
				<div style={{textAlign: 'center'}}>
					<button
						disabled={enabled}
						onClick={this.release}
					>
						close and edit other language
					</button>
				</div>
			</div>
		);
	}
	
	renderEditor() {
		const q = {
			lng: this.state.currentLanguage,
			ns: this.state.currentNamespace,
		};
		return <Group
			title="Resources"
			values={this.state.content}
			query={q}/>;
	}
	
	renderEmpty() {
		return <h1>
			select language above.
		</h1>;
	}
	
	@BindThis
	private release() {
		this.setState({
			editorReady: false,
			content: {},
		});
	}
	
	@BindThis
	private startLoading() {
		if (this.state.loading || this.state.editorReady) {
			return;
		}
		
		this.setState({
			loading: true,
		});
		
		const lng = this.state.currentLanguage;
		const ns = this.state.currentNamespace;
		if (!lng || !ns) {
			return alert('please select language and text list.');
		}
		
		FetchApi(`${globalVar.get('ReadApi')}?lng=${lng}&ns=${ns}`, {}).then((data) => {
			console.log('loaded data: ', data.payload);
			this.setState({
				editorReady: true,
				loading: false,
				failed: '',
				content: data.payload,
			});
		}, (err) => {
			this.setState({
				loading: false,
				failed: err.message || 'no message!',
			});
		});
	}
}
