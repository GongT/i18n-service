import {BaseComponent, BindThis} from "@gongt/ts-stl-client/react/stateless-component";
import {isomorphicGlobal} from "@gongt/ts-stl-library/check-environment";
import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import * as React from "react";
import {CSSProperties} from "react";
import {FetchApi} from "./fetch-api";
import {globalVar} from "./global";

export interface AnyEditProps {
}

const parentStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	margin: '6px 18px',
};
const growStyle: CSSProperties = {
	flexGrow: 1,
	display: 'flex',
};
const popStyle: CSSProperties = {
	height: '2.3em',
	position: 'fixed',
	left: 0,
	top: 0,
	width: '100%',
	zIndex: 1000,
	background: 'white',
};

export class AnyEdit extends BaseComponent<AnyEditProps> {
	state: {
		wantPath: string;
		loading: boolean;
		addLang: string;
	} = {
		wantPath: '',
		loading: false,
		addLang: '',
	};
	
	waitPromise(p: Promise<any>) {
		this.setState({loading: true});
		p.then(() => {
			this.setState({loading: false});
		}, (err) => {
			this.setState({loading: false});
			alert('failed: ' + err.message);
		});
	}
	
	@BindThis
	onRemovePath() {
		const p = FetchApi(`${globalVar.get('PathApi')}?path=${this.state.wantPath}`, {
			method: 'DELETE',
		});
		this.waitPromise(p);
	}
	
	@BindThis
	onAddPath() {
		const p = FetchApi(`${globalVar.get('PathApi')}?path=${this.state.wantPath}`, {
			method: 'PUT',
			body: '',
		});
		this.waitPromise(p);
	}
	
	@BindThis
	changePathValue(e) {
		this.outerChangeValue(e.target.value);
	}
	
	@BindThis
	outerChangeValue(val) {
		this.setState({wantPath: val});
	}
	
	@BindThis
	changeLangValue(e) {
		this.setState({addLang: e.target.value});
	}
	
	componentDidMount() {
		GlobalVariable.get(isomorphicGlobal, 'globalEvent').on('change', this.outerChangeValue)
	}
	
	componentWillUnmount() {
		GlobalVariable.get(isomorphicGlobal, 'globalEvent').removeListener('change', this.outerChangeValue)
	}
	
	@BindThis
	onAddLang() {
		const p = FetchApi(`${globalVar.get('LangApi')}?lng=${this.state.addLang}`, {
			method: 'PUT',
			body: '',
		});
		this.waitPromise(p);
	}
	
	render() {
		return (
			<div style={popStyle}>
				<div style={parentStyle}>
					<div style={growStyle}>
						<input type="text" onChange={this.changePathValue} value={this.state.wantPath} placeholder="add remove translation" style={growStyle}/>
						&nbsp;
						<input type="button" onClick={this.onRemovePath} value="&nbsp;&nbsp;删除&nbsp;&nbsp;"/>
						&nbsp;
						<input type="button" onClick={this.onAddPath} value="&nbsp;&nbsp;添加&nbsp;&nbsp;"/>
					</div>
					<div>&nbsp;&nbsp;&nbsp;</div>
					<div style={growStyle}>
						<input type="text" onChange={this.changeLangValue} placeholder="add new language" style={growStyle}/>
						&nbsp;
						<input type="button" onClick={this.onAddLang} value="&nbsp;&nbsp;添加&nbsp;&nbsp;"/>
					</div>
				</div>
			</div>
		);
	}
}
