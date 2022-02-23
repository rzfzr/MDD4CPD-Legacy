import * as React from 'react';
import { Application } from './Application';
import { TrayItemWidget } from './TrayItemWidget';
import { MyNodeModel } from './myNode/MyNodeModel';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import { MyEditableNodeModel } from './editableNode/MyEditableNodeModel';
import paletteNodes from '../../paletteNodes';
import { useState, useEffect } from 'react';
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
	useEffect(() => {
		if (stringModel !== model) {
			setModel(stringModel);
		}
	}, [stringModel, model]);

	return (
		<div className="float-container" >
			<div className="float-child-left">
				<S.Body>
					<S.Content >
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
										localStorage.setItem('model', JSON.stringify(rawModel));
										console.log('Saved')
									}}>
									Save
								</Button>
								<Button variant="contained" size='small'
									onClick={() => {
										props.app.getActiveDiagram().deserializeModel(
											JSON.parse(localStorage.getItem('model') || '{}'),
											props.app.getDiagramEngine());
										console.log('Loaded')
										setModel(stringModel);
										setTimeout(() => {
											setRerender(!rerender);
										}, 10);
									}}>
									Load
								</Button>
								<Button variant="contained" size='small'
									onClick={() => {
										props.app.getActiveDiagram().deserializeModel(
											JSON.parse('{"id":"b61bb7d6-efee-4caf-8b8c-be7dfa140acd","offsetX":0,"offsetY":0,"zoom":100,"gridSize":0,"layers":[{"id":"0df10e02-9519-4a32-9c90-cb48681c24cd","type":"diagram-links","isSvg":true,"transformed":true,"models":{}},{"id":"c18e36ab-c0ce-4def-8c51-0c09d00cfe0b","type":"diagram-nodes","isSvg":false,"transformed":true,"models":{}}]}'),
											props.app.getDiagramEngine());
										setTimeout(() => {
											setRerender(!rerender);
										}, 10);
									}}>
									Clear
								</Button>
							</div>
						</div>
						<S.Layer
							onDrop={(event) => {
								let data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
								if (data) {
									let node: any = {};
									if (data.extras.type === "variable") {
										node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
									} else if (data.extras.type === "constant") {
										node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs);
									} else if (data.extras.type === 'port') {
										node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs, false);
									} else if (data.extras.type === "logic") {
										node = new MyEditableNodeModel(data.name, data.color, data.extras, data.ins, data.outs, false);
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