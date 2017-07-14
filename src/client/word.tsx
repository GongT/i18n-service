import {BindThis, StatefulBaseComponent} from "@gongt/ts-stl-client/react/stateless-component";
import {isomorphicGlobal} from "@gongt/ts-stl-library/check-environment";
import {GlobalVariable} from "@gongt/ts-stl-library/pattern/global-page-data";
import * as React from "react";
import {CSSProperties} from "react";
import {FetchApi} from "./fetch-api";
import {globalVar} from "./global";

export interface WordProps {
	title: string;
	children: string;
	path: string;
	query: {lng: string; ns: string;};
}
const parentStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	borderBottom: '2px solid',
	borderBottomColor: '#8BFF88',
	marginBottom: '3px',
};
const verticalStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
};
const titleStyle: CSSProperties = {
	width: '33%',
	paddingLeft: '1em',
	fontSize: 'larger',
	...verticalStyle,
};
const valueStyle: CSSProperties = {
	display: 'flex',
	flexGrow: 1,
};
const valueStyleText: CSSProperties = {
	resize: 'vertical',
	width: '100%',
	border: 'none',
	margin: '2px',
	background: 'transparent',
	boxSizing: 'border-box',
};
const hoverStyle: CSSProperties = {
	borderBottomColor: '#ff5e63',
};
const changeStyle: CSSProperties = {
	borderBottomColor: '#ff000b',
};

export interface State {
	changed: boolean;
	styles: CSSProperties;
	focus: boolean;
	currentValue: string;
	loading: boolean;
}

export class Word extends StatefulBaseComponent<WordProps, State> {
	state: State = {
		styles: {},
		changed: false,
		focus: false,
		currentValue: null,
		loading: false,
	};
	
	@BindThis
	save() {
		if (!this.state.changed || this.state.loading) {
			return;
		}
		
		this.setState({
			loading: true,
		});
		
		FetchApi(`${globalVar.get('WriteApi')}?lng=${this.props.query.lng}&ns=${this.props.query.ns}&path=${this.props.path}`, {
			method: 'POST',
			body: this.state.currentValue,
		}).then(() => {
			this.setState({
				loading: false,
				changed: false,
				styles: {},
			});
		}, (err) => {
			alert('save failed: ' + err.message);
			this.setState({
				styles: hoverStyle,
				loading: false,
			});
		})
	}
	
	@BindThis
	oBlur() {
		if (!this.state.changed) {
			this.setState({
				styles: {},
				focus: false,
			});
		}
	}
	
	@BindThis
	onFocus() {
		if (!this.state.changed) {
			this.setState({
				styles: hoverStyle,
				focus: true,
			});
		}
	}
	
	@BindThis
	onChange(e) {
		const currentValue = e.target.value;
		if (currentValue === this.props.children) {
			this.setState({
				currentValue,
				styles: {},
				changed: false,
			});
		} else {
			this.setState({
				currentValue,
				styles: changeStyle,
				changed: true,
			});
		}
	}
	
	@BindThis
	onMouseEnter() {
		if (!this.state.changed && !this.state.focus) {
			this.setState({
				styles: hoverStyle,
			});
		}
	}
	
	@BindThis
	onMouseLeave() {
		if (!this.state.changed && !this.state.focus) {
			this.setState({
				styles: {},
			});
		}
	}
	
	@BindThis
	titleDoubleClick() {
		GlobalVariable.get(isomorphicGlobal, 'globalEvent').emit('change', this.props.query.ns + ':' + this.props.path);
	}
	
	render() {
		return (
			<div style={{...parentStyle, ...this.state.styles}}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}>
				<div style={titleStyle} onDoubleClick={this.titleDoubleClick}>{this.props.title}</div>
				<span>➡</span>
				<div style={valueStyle}>
					<textarea
						style={valueStyleText}
						placeholder={this.props.title}
						defaultValue={this.props.children}
						onChange={this.onChange}
						onFocus={this.onFocus}
						onBlur={this.oBlur}
					/>
				</div>
				<div style={verticalStyle}>
					<button
						onClick={this.save}
						disabled={!this.state.changed || this.state.loading}
						style={{opacity: this.state.changed? 1 : 0.6}}>
						{String.fromCodePoint(128190)}
					</button>
				</div>
			</div>
		);
	}
}
