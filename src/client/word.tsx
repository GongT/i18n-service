import {BindThis, StatefulBaseComponent} from "@gongt/ts-stl-client/react/stateless-component";
import * as React from "react";
import {CSSProperties} from "react";

export interface WordProps {
	title: string;
	children: string;
	path: string;
}
const parentStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	borderBottom: '2px solid',
	borderBottomColor: '#8BFF88',
	marginBottom: '3px',
};
const titleStyle: CSSProperties = {
	width: '33%',
	paddingLeft: '1em',
	fontSize: 'larger',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
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

export interface State {
	styles: CSSProperties;
}

export class Word extends StatefulBaseComponent<WordProps, State> {
	state = {
		styles: {},
	};
	
	@BindThis
	onMouseEnter() {
		this.setState({
			styles: hoverStyle,
		});
	}
	
	@BindThis
	onMouseLeave() {
		this.setState({
			styles: {},
		});
	}
	
	render() {
		return (
			<div style={{...parentStyle, ...this.state.styles}}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}>
				<div style={titleStyle}>{this.props.title}</div>
				<span>➡</span>
				<div style={valueStyle}>
					<textarea style={valueStyleText} type="text" placeholder={this.props.title} value={this.props.children}/>
				</div>
			</div>
		);
	}
}
