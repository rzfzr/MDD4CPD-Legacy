/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import styled from '@emotion/styled';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import modelsDiagram from '../../assets/cym_s_extended.svg'
// import { Dispatch, SetStateAction, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
export interface TrayItemWidgetProps {
	model: any;
	color?: string;
	name: string;
}

namespace S {
	export const Tray = styled.div<{ color: string }>`
		color: white;
		font-family: Helvetica, Arial;
		font-size:0.8em;
		padding: 0px 5px;
		margin:	 0px ;
		border: solid 1px ${(p) => p.color};
		border-radius: 100px;
		margin-bottom: 2px;
		cursor: pointer;
	`;
}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps> {
	render() {
		return (
			<S.Tray
				color={this.props.color || 'red'}
				draggable={true}
				onDragStart={(event) => {
					event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
				}}
				className="tray-item">
				{this.props.name}
				<a data-tip data-for='sadFace' >
					<OpenInNewIcon style={{ fontSize: '1rem' }} />
				</a>
				<ReactTooltip id='sadFace' type='warning' effect='solid'>
					<span>Show sad face</span>
					<img src={modelsDiagram} alt="Architecture Diagram" style={{ maxHeight: '80vh', maxWidth: '100%' }} />
				</ReactTooltip>
			</S.Tray>
		);
	}
}
