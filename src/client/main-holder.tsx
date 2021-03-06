import {BindThis, StatefulBaseComponent} from "@gongt/ts-stl-client/react/stateless-component";
import * as React from "react";
import {CSSProperties} from "react";
import {AnyEdit} from "./any";
import {TranslateResource} from "./defines";
import {FetchApi} from "./fetch-api";
import {globalVar} from "./global";
import {Group} from "./group";
import {t} from "./index";

const langSelList = [
	<option key="-" value="" disabled={true}>--</option>,
];
const textSelList = [
	<option key="-" value="" disabled={true}>--</option>,
];

(() => {
	const llist = globalVar.get('languageList');
	for (let l of llist) {
		langSelList.push(
			<option key={l} value={l}>{l}</option>,
		);
	}
	const nlist = globalVar.get('namespaceList');
	for (let n of nlist) {
		textSelList.push(
			<option key={n} value={n}>{n}</option>,
		);
	}
})();

const parentStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	margin: '6px 18px',
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
				{this.renderAnyEdit()}
				{this.renderSelector()}
				{this.renderEditor()}
			</div>;
		} else if (this.state.loading) {
			return <div>
				{this.renderAnyEdit()}
				{this.renderSelector()}
				<h1>loading...</h1>
			</div>;
		} else if (this.state.failed) {
			return <div>
				{this.renderAnyEdit()}
				{this.renderSelector(true)}
				<h1>Failed! {this.state.failed}.</h1>
			</div>;
		} else {
			return <div>
				{this.renderAnyEdit()}
				{this.renderSelector(true)}
				{this.renderEmpty()}
			</div>;
		}
	}
	
	renderAnyEdit() {
		return (<div key="any-area">
			<div style={{height: '1.5em'}}/>
			<AnyEdit/>
			<hr/>
		</div>);
	}
	
	renderSelector(enabled: boolean = false) {
		return (
			<div key="control-area">
				<div key="actions" style={parentStyle}>
					<button onClick={this.refresh}>
						{t('refresh language list')}
					</button>
					<button onClick={this.reload}>
						{t('reload language cache')}
					</button>
				</div>
				<div key="select" style={parentStyle}>
					<label htmlFor="selectLang">language:</label>
					<select
						disabled={!enabled}
						onChange={e => this.setState({'currentLanguage': e.target.value})}
						id="selectLang" style={optionStyle} defaultValue="">
						${langSelList}
					</select>
					&nbsp;&nbsp;&nbsp;
					<label htmlFor="selectNamespace">text list:</label>
					<select
						disabled={!enabled}
						onChange={e => this.setState({'currentNamespace': e.target.value})}
						id="selectNamespace" style={optionStyle} defaultValue="">
						${textSelList}
					</select>
					&nbsp;&nbsp;&nbsp;
					<button onClick={this.startLoading}>OK</button>
					<div>&nbsp;|&nbsp;</div>
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
	private refresh() {
		FetchApi(`reload`, {})
			.then(console.log.bind(console))
			.then(() => {
				location.reload(true);
			})
			.catch(console.error.bind(console));
	}
	
	@BindThis
	private reload() {
		FetchApi(`/_i18n/reload`, {})
			.then(console.log.bind(console))
			.then(() => {
				location.reload(true);
			})
			.catch(console.error.bind(console));
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
