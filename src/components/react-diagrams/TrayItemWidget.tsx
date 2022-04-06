/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import styled from '@emotion/styled';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReactTooltip from 'react-tooltip';
import GoClass from '../GoClass';

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
		let methods: any[] = []
		this.props.node.methods?.forEach((method: any) => {
			methods.push({ name: method, visibility: 'public' })
		});
		this.props.node.ins?.forEach((method: any) => {
			methods.push({ name: method, visibility: 'public' })
		});
		this.props.node.outs?.forEach((method: any) => {
			methods.push({ name: method, visibility: 'public' })
		});
		const node = {
			key: 0,
			name: this.props.node.name,
			methods: methods,

		}
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

				<a data-tip data-for={'tip-' + this.props.node.name} style={{ float: 'right', marginRight: '6px' }} >
					<OpenInNewIcon style={{ fontSize: '1rem' }} />
				</a>
				<ReactTooltip
					className="interactableTooltip"
					id={'tip-' + this.props.node.name}
					type='light' place="right"
					delayHide={500}
					effect="solid"
				>
					{this.props.node.extras.description ?
						<div className='miniGoAndDescriptionHolder'>
							<GoClass
								linkdata={[]} nodedata={[node]} arrangement='horizontal' />
							<div className='descriptionHolder'>
								{this.props.node.extras.description}
							</div>
						</div>
						: <div className='miniGoHolder'>
							<GoClass
								linkdata={[]} nodedata={[node]} arrangement='horizontal' />
						</div>}
				</ReactTooltip>
			</S.Tray>
		);
	}
}
