import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from './Application';
import { TrayItemWidget } from './TrayItemWidget';
import { MyNodeModel } from './myNode/MyNodeModel';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

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

let paletteNodes = [
	{
		name: 'Arduino Uno',
		color: 'green',
		extras: {
			type: 'controller',
			analogPorts: 6,
			digitalPorts: 14,
		},
		ins: [],
		outs: [
			'setup()',
			'loop()'
		]
	},
	{
		name: 'Arduino Mega',
		color: 'green',
		extras: {
			type: 'controller',
			analogPorts: 16,
			digitalPorts: 54,
		},
		ins: [],
		outs: [
			'setup()',
			'loop()'
		]
	},
	{
		name: 'Condition',
		extras: { type: 'logic' },
		color: 'grey',
		outs: [
			'True',
			'False'
		],
		ins: [
			'if <= 20',
			'value'
		]
	},
	{
		name: 'Loop',
		extras: { type: 'logic' },
		color: 'grey',
		outs: [
			'True',
			'False'
		],
		ins: [
			'for',
			'value'
		]
	},
	{
		name: 'Led',
		color: 'red',
		extras: { type: 'component', library: 'Setter.h' },
		ins: [
			'setValue()'
		],
		outs: []

	},
	{
		name: 'TemperatureSensor',
		color: 'blue',
		extras: { type: 'component', library: 'Getter.h' },
		ins: [],
		outs: [
			'getValue()'
		]
	},
	{
		name: 'Button',
		color: 'blue',
		extras: { type: 'component', library: 'Getter.h' },
		ins: [],
		outs: [
			'getValue()'
		]
	},
	{
		name: 'Servo',
		color: 'orange',
		extras: { type: 'component', library: 'Servo.h' },
		ins: [
			'void detach()',
			'void write(int)',
			'void writeMicroseconds(int)',
		],
		outs: [
			'uint8_t attach(int)',
			'uint8_t attach(int, int, int)',
			'int read()',
			'int readMicroseconds()',
			'bool attached()',
		]
	},
	{
		name: 'Stepper',
		color: 'orange',
		extras: { type: 'component', library: 'Stepper.h' },
		ins: [
			'Stepper(int, int, int)',
			'Stepper(int, int, int, int, int)',
			'Stepper(int, int, int, int, int, int)',
			'-',
			'void setSpeed(long whatSpeed)',
			'void step(int number_of_steps)',
		],
		outs: [
			'int version(void)',
		]
	}
]



export class BodyWidget extends React.Component<BodyWidgetProps> {
	componentDidMount() {
		setInterval(() => {
			let temp = JSON.stringify(this.props.app.getDiagramEngine().getModel().serialize())
			if (temp !== localStorage.getItem('model')) {
				localStorage.setItem('model', temp);
			}
		}, 1500)
	}
	render() {
		return (
			<S.Body>
				<S.Content style={{ width: '100%', height: '100%' }}>
					{/* <div style={{ width: '10%', height: '100%' }}>  */}
					<TrayWidget >

						{paletteNodes.map(node =>
							// <Favorite key={favorite.position} favorite={favorite} />
							<TrayItemWidget model={node} name={node.name} color={node.color} />
						)}


						{/* <TrayItemWidget model={{ type: 'Condition' }} name="Condition" color="grey" /> */}
						{/* <div style={{ width: '100%', height: '5%' }}>
							<Button variant="contained"
								onClick={() => {
									localStorage.setItem('model', JSON.stringify(this.props.app.getDiagramEngine().getModel().serialize()));
								}}>Save</Button>
							</div> */}
					</TrayWidget>
					{/* </div> */}

					<S.Layer
						onDrop={(event) => {
							var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							// var nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

							let node: any = null;//DefaultNodeModel
							if (data) {
								node = new MyNodeModel(data.name, data.color);

								node.extras = data.extras
								data.outs.forEach((method: string) => {
									node.addOutPort(method)
								});
								data.ins.forEach((method: string) => {
									node.addInPort(method)

								});
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
	}
}
