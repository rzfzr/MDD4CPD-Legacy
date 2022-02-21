import * as React from 'react';
import { Application } from './Application';
import { TrayItemWidget } from './TrayItemWidget';
import { MyNodeModel } from './myNode/MyNodeModel';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import { EditableNodeModel } from './custom-node/custom_nodes/editableNode/EditableNodeModel';
import { MyEditableNodeModel } from './editableNode/MyEditableNodeModel';
import paletteNodes from '../../paletteNodes';
import { useState } from 'react';
import Code from '../Code';
import { Button } from '@material-ui/core';
var ScrollArea = require('react-scrollbar').default;
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

function BodyWidget(props: BodyWidgetProps) {
	const [model, setModel] = useState("{}")
	const [rerender, setRerender] = React.useState(false);

	const rawModel = props.app.getDiagramEngine().getModel().serialize()
	const stringModel = JSON.stringify(rawModel)

	const groups = [...new Set(paletteNodes.map(x => x.extras.type))]

	if (stringModel !== model) {
		setModel(stringModel);
	}
	return (
		<div className="float-container" >
			<div className="float-child-left">
				<S.Body>
					<S.Content style={{ width: '100%', height: '100%' }}>
						<div>

							<ScrollArea
								speed={1}
								className="area"
								contentClassName="content"
								horizontal={false}
								style={{ height: '88vh' }}
								smoothScrolling={true}
								verticalScrollbarStyle={{ backgroundColor: 'white' }}
							>
								{
									groups.map((group) => {
										return <div key={group} style={{ border: 'dashed white 1px', marginBottom: '20px' }}>
											<h6 style={{ margin: '0px 0px 0px 0px' }}>{group + 's'}:</h6>
											{paletteNodes.filter(n => n.extras.type === group).map((node) => {
												return <TrayItemWidget key={node.name} node={node} />
											})}
										</div>
									}
									)
								}
							</ScrollArea>
							<div style={{ marginBottom: '0px' }}>
								<Button variant="contained" size='small'
									onClick={() => {
										const temp = JSON.stringify(rawModel)
										localStorage.setItem('model', temp);
										console.log('Saved')
										// alert('Saved!')
									}}>
									Save
								</Button>
								<Button variant="contained" size='small'
									onClick={() => {
										props.app.getActiveDiagram().deserializeModel(
											JSON.parse(localStorage.getItem('model') || '{}'),
											props.app.getDiagramEngine());
										setModel(stringModel);
										setRerender(!rerender);
										console.log('Loaded')
										// setTimeout(() => {
										// 	alert('Loaded!')
										// }, 10);
									}}>
									Load
								</Button>
							</div>
						</div>
						<S.Layer
							onDrop={(event) => {
								let data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));

								if (data) {
									if (data.extras.type === "diagram") {
										props.app.getActiveDiagram().deserializeModel(data.extras.diagram,
											props.app.getDiagramEngine());
									} else {
										let node: any = {};
										if (data.name === 'NodeEdit') {
											node = new EditableNodeModel("Node1");
											node.setPosition(100, 200);
										} else if (data.extras.type === "variable") {
											node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
										} else if (data.extras.type === "constant") {
											node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
										} else if (data.extras.type === 'port') {
											node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
										} else if (data.extras.type === "logic") {
											node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
										} else {
											node = new MyNodeModel(data.name, data.color);
											node.extras = data.extras
											data.outs.forEach((method: string) => {
												node.addOutPort(method)
											});
											data.ins.forEach((method: string) => {
												node.addInPort(method)
											});
										}
										node.setPosition(props.app.getDiagramEngine().getRelativeMousePoint(event));
										props.app.getDiagramEngine().getModel().addNode(node);
									}
								}
								setRerender(!rerender);
							}}
							onDragOver={(event: any) => {
								event.preventDefault();
							}}
							onClick={(event: any) => {
								setRerender(!rerender);
							}}
						>
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
		</div >
	)

}
export default React.memo(BodyWidget)