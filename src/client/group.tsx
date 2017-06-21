import {BaseComponent} from "@gongt/ts-stl-client/react/stateless-component";
import * as React from "react";
import {CSSProperties, ReactElement} from "react";
import {TranslateResource} from "./defines";
import {Word} from "./word";

export interface GroupProps {
	title: string;
	values: TranslateResource;
	path?: string;
	query: {lng: string; ns: string;};
}

const groupStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	margin: "4px 10px 0",
};
const boxStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	border: "gray 1px solid",
	borderLeft: "green 4px solid",
	padding: "4px 12px 12px 12px",
	boxSizing: 'border-box',
};
const parentPathStyle: CSSProperties = {
	color: 'gray',
	fontSize: 'smaller',
};

export class Group extends BaseComponent<GroupProps> {
	render() {
		const words: ReactElement<any>[] = [];
		const subs: ReactElement<any>[] = [];
		
		let subPath = '';
		let parentPath = '';
		if (this.props.path) {
			subPath = this.props.path + '.';
			const s = this.props.path.split('.');
			s.pop();
			parentPath = s.join('.')
		}
		
		Object.keys(this.props.values).forEach((k: string) => {
			const v = this.props.values[k];
			
			if (typeof v === 'string') {
				words.push(<Word title={k} path={subPath + k} query={this.props.query}>{v}</Word>);
			} else {
				subs.push(<Group title={k} path={subPath + k} values={v} query={this.props.query}/>);
			}
		});
		
		return (<div style={groupStyle} className="group">
			<h3 style={{margin: 0}}>
				<span style={parentPathStyle}>{parentPath}</span>
				{this.props.title}
			</h3>
			<div style={boxStyle}>
				<div className="wordList">{words}</div>
				<div className="subGroup">{subs}</div>
			</div>
		</div>);
	}
}
