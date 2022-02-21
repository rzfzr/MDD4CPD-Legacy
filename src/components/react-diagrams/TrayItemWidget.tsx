/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import styled from '@emotion/styled';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReactTooltip from 'react-tooltip';
export interface TrayItemWidgetProps {
	node: any;
}

namespace S {
	export const Tray = styled.div<{ color: string }>`
		color: white;
		font-family: Helvetica, Arial;
		font-size:0.6em;
		padding: 2px 0px;
		margin:	 5px 10px ;
		border: solid 1px ${(p) => p.color};
		border-radius: 100px;
		margin-bottom: 2px;
		cursor: pointer;
		background: rgb(20, 20, 20);
	`;
}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps> {
	render() {
		// const label = this.props.node.name.includes(" ") && this.props.node.name.length > 15 ? (<div>
		// 	{this.props.node.name.substr(0, this.props.node.name.indexOf(' '))}
		// 	<br />
		// 	{this.props.node.name.substr(this.props.node.name.indexOf(' ') + 1)}</div>) : this.props.node.name
		return (
			<S.Tray
				color={this.props.node.color || 'red'}
				draggable={true}
				onDragStart={(event) => {
					event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.node));
					event.dataTransfer.setDragImage(new Image(), 10, 10);
				}}
				className="tray-item">

				{this.props.node.name}

				<a data-tip data-for={'tip-' + this.props.node.name} >
					<OpenInNewIcon style={{ fontSize: '1rem' }} />
				</a>
				<ReactTooltip id={'tip-' + this.props.node.name} type='light' place="bottom">
					<div style={{ width: '300px', height: '300px', backgroundColor: 'white', border: 'solid', fontSize: '1.3em' }}>
						<div style={{ width: '100%', borderBottom: 'solid 3px', fontSize: '2em' }}>
							{this.props.node.name}
						</div>
						<div style={{ width: '100%', borderBottom: 'solid 2px' }}>
							Library={this.props.node.extras.library}
						</div>
						{this.props.node.ins && this.props.node.ins.length > 0 &&
							this.props.node.ins.map((port: any) => {
								return <div key={port}>
									<p>{port}</p>
								</div>
							})
						}
						{this.props.node.outs && this.props.node.outs.length > 0 &&
							this.props.node.outs.map((port: any) => {
								return <div key={port}>
									<p>{port}</p>
								</div>
							})
						}
					</div>
					{/* {JSON.stringify(this.props.node)} */}
				</ReactTooltip>
			</S.Tray>
		);
	}
}
