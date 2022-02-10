import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import { Application } from './Application';
import { TrayItemWidget } from './TrayItemWidget';
import { MyNodeModel } from './myNode/MyNodeModel';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import { DiamondNodeModel } from './diamond/DiamondNodeModel';
import { EditableLabelModel } from './custom-label/EditableLabelModel';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { EditableNodeModel } from './custom-node/custom_nodes/editableNode/EditableNodeModel';
import { MyEditableNodeModel } from './editableNode/MyEditableNodeModel';
import paletteNodes from '../../paletteNodes';
import { useContext, useEffect, useState } from 'react';
import Code from '../Code';
// import { Dispatch, SetStateAction, useEffect } from 'react';

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
let lastType = ''

// extends React.Component < BodyWidgetProps >
function BodyWidget(props: BodyWidgetProps) {
	console.log('BodyWidget render')

	const [model, setModel] = useState("{}")
	const [rerender, setRerender] = React.useState(false);


	useEffect(
		() => {

			setInterval(() => {
				const rawModel = props.app.getDiagramEngine().getModel().serialize()
				const str = JSON.stringify(rawModel)
				console.log('setting model')
				setModel(str);
			}, 2000)
		}, []
	)

	return (
		<div className="float-container" >

			<div className="float-child-left">
				<S.Body>
					<S.Content style={{ width: '100%', height: '100%' }}>
						<TrayWidget >
							{
								paletteNodes.map((node) => {
									if (node.extras.type !== lastType) {
										lastType = node.extras.type
										return <div key={node.name}>
											<p style={{ margin: "0px", fontSize: "0.9em" }}>{node.extras.type}:</p>
											<TrayItemWidget model={node} name={node.name} color={node.color} />
										</div>
									}
									return <TrayItemWidget key={node.name} model={node} name={node.name} color={node.color} />
								}
								)}
						</TrayWidget>
						<S.Layer
							onDrop={(event) => {
								let data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));



								if (data) {
									if (data.name === 'Diamond') {
										const node = new DiamondNodeModel();
										node.setPosition(props.app.getDiagramEngine().getRelativeMousePoint(event));
										props.app.getDiagramEngine().getModel().addNode(node);
									} else if (data.name === 'LabelEdit') {
										const node1 = new DefaultNodeModel('Node1', 'red');
										const port1 = node1.addOutPort('out');
										node1.setPosition(250, 100);
										const node2 = new DefaultNodeModel('Node2', 'green');
										const port2 = node2.addInPort('in');
										node2.setPosition(800, 300);
										const link1 = port1.link(port2);
										link1.addLabel(
											new EditableLabelModel({
												value: 'Hello, I am label!'
											})
										);
										props.app.getDiagramEngine().getModel().addAll(node1, port1, node2, port2, link1);
									} else if (data.name === 'NodeEdit') {
										const node = new EditableNodeModel("Node1");
										node.setPosition(100, 200);
										node.setPosition(props.app.getDiagramEngine().getRelativeMousePoint(event));
										props.app.getDiagramEngine().getModel().addNode(node);
									} else if (data.extras.type === "variable" || data.extras.type === 'port') {
										const node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
										console.log('node', node)

										node.setPosition(props.app.getDiagramEngine().getRelativeMousePoint(event));
										props.app.getDiagramEngine().getModel().addNode(node);
									} else if (data.extras.type === "logic") {
										const node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
										console.log('node', node)
										node.setPosition(props.app.getDiagramEngine().getRelativeMousePoint(event));
										props.app.getDiagramEngine().getModel().addNode(node);
									} else if (data.extras.type === "diagram") {
										props.app.getActiveDiagram().deserializeModel(data.extras.diagram,
											props.app.getDiagramEngine());
									} else {
										const node = new MyNodeModel(data.name, data.color);
										node.extras = data.extras
										data.outs.forEach((method: string) => {
											node.addOutPort(method)
										});
										data.ins.forEach((method: string) => {
											node.addInPort(method)
										});
										node.setPosition(props.app.getDiagramEngine().getRelativeMousePoint(event));
										props.app.getDiagramEngine().getModel().addNode(node);
									}
								}
								setRerender(!rerender);
							}}
							onDragOver={(event: any) => {
								event.preventDefault();
							}}>
							<div style={{ width: '100%', height: '100%' }}>
								<DemoCanvasWidget >
									<CanvasWidget engine={props.app.getDiagramEngine()} />
								</DemoCanvasWidget>
							</div>
						</S.Layer>
					</S.Content>
				</S.Body >
			</div>
			<div className="float-child-right">
				<Code model={model} />
			</div>
		</div>
	)

}
export default React.memo(BodyWidget)