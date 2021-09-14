import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from './Application';
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

import { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'
export interface BodyWidgetProps {
	app: Application;
}


namespace S {
	export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	`;

	export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
}




export class BodyWidget extends React.Component<BodyWidgetProps> {
	static contextType = GlobalContext

	componentDidMount() {
		const { model, setModel } = this.context

		console.log('model', model, 'setmodel')
	}
	//  const { model } = useContext(GlobalContext)
	// console.log('Favorites:', model)


	// console.log('rendering bodyWidget')

	render() {
		return (
			<GlobalContext.Consumer>
				{(props: any) => {
					return (
						<S.Body>
							<S.Content style={{ width: '100%', height: '100%' }}>
								<TrayWidget>
									<TrayItemWidget model={{ type: 'Arduino' }} name="Arduino" color="green" />
									<TrayItemWidget model={{ type: 'Condition' }} name="Condition" color="grey" />
									<TrayItemWidget model={{ type: 'LED' }} name="LED" color="red" />
									<TrayItemWidget model={{ type: 'TemperatureSensor' }} name="TemperatureSensor" color="blue" />
									<div style={{ width: '100%', height: '5%' }}>
										<Button variant="contained"
											onClick={() => {
												let temp = JSON.stringify(this.props.app.getDiagramEngine().getModel().serialize())
												// props.setModel(temp)
												localStorage.setItem('model', temp);
											}}>Save</Button>
									</div>
								</TrayWidget>

								<S.Layer
									onDrop={(event) => {
										var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
										// var nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

										let node: any = null;//DefaultNodeModel
										if (data.type === 'Arduino') {
											node = new DefaultNodeModel('Arduino', 'green');
											node.addOutPort('setup()');
											node.addOutPort('loop()');
										} else if (data.type === 'Condition') {
											node = new DefaultNodeModel('Condition', 'grey')
											node.addInPort('if <= 20');
											node.addInPort('value');
											node.addOutPort('True');
										} else if (data.type === 'LED') {
											node = new DefaultNodeModel('Led', 'red');
											node.addInPort('setValue()');
										} else if (data.type === 'TemperatureSensor') {
											node = new DefaultNodeModel('TemperatureSensor', 'Blue');
											node.addOutPort('getValue()');
										}
										var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
										node.setPosition(point);
										this.props.app.getDiagramEngine().getModel().addNode(node);
										this.forceUpdate();
									}}
									onDragOver={(event) => {
										event.preventDefault();
									}}>
									<div style={{ width: '100%', height: '100%' }}>
										<DemoCanvasWidget >
											<CanvasWidget engine={this.props.app.getDiagramEngine()} />
										</DemoCanvasWidget>
									</div>
								</S.Layer>
							</S.Content>
						</S.Body>
					)
				}}

			</GlobalContext.Consumer>
		);
	}
}
