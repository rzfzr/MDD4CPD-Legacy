import * as React from 'react';
import { Application } from './Application';
import { TrayItemWidget } from './TrayItemWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { MyCanvasWidget } from './MyCanvasWidget';
import styled from '@emotion/styled';
import { MyEditableNodeModel } from './editableNode/MyEditableNodeModel';
import paletteNodes from '../../paletteNodes';
import { useState, useEffect } from 'react';
import Code from '../Code';
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
		width: 100%;
		grid-template-columns: 55% 1fr;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
		
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;

	export const Code = styled.div`
		position: absolute;
		background-color: #2d2d2d ;
		left:50%;
		top:0;
		right:0;
		bottom:0;
		margin:0;
		padding:0;
		`;

}

function BodyWidget(props: BodyWidgetProps) {
	const [model, setModel] = useState("{}")
	const [rerender, setRerender] = React.useState(false);

	const rawModel = props.app.getDiagramEngine().getModel().serialize()
	const stringModel = JSON.stringify(rawModel, null, 2)

	const groups = [...new Set(paletteNodes.map(x => x.extras.group || x.extras.type))]

	console.log(groups)
	useEffect(() => {
		if (stringModel !== model) {
			setModel(stringModel);
		}
	}, [stringModel, model]);

	return (
		<S.Body>
			<S.Content >
				<div>
					<ScrollArea
						speed={1}
						className="area"
						contentClassName="content"
						horizontal={false}
						style={{ height: '95vh' }}
						smoothScrolling={true}
						verticalScrollbarStyle={{ backgroundColor: 'white' }}
					>
						{
							groups.map((group) => {
								return <div key={group} style={{ border: 'dashed white 1px', marginBottom: '20px' }}>
									<h6 style={{ margin: '0px 0px 0px 0px' }}>{group[0].toUpperCase() + group.slice(1) + 's'}:</h6>
									{paletteNodes.filter(n => (n.extras.group === group || n.extras.type === group)).map((node) => {
										return <TrayItemWidget key={node.name} node={node} />
									})}
								</div>
							}
							)
						}
					</ScrollArea>
				</div>
				<S.Layer
					onDrop={(event) => {
						let data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
						if (data) {
							let node: any = {};

							props.app.getDiagramEngine().getModel().registerListener({
								linksUpdated: (l: any) => {
									setRerender(!rerender);
									// console.log("link\n");
								},
								nodesUpdated: (n: any) => {
									setRerender(!rerender);
									// console.log("node")
								}
							})
							switch (data.extras.type) {
								case "variable":
								case "constant":
									node = new MyEditableNodeModel(data, true, true);
									break;
								case "parameter":
								case "port":
								case "logic":
									node = new MyEditableNodeModel(data, true, false);
									break;
								case "controller":
								case "built-in":
								case "built-in-constant":
								case "component":
								default:
									node = new MyEditableNodeModel(data, false, false);
									break;
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
						<MyCanvasWidget >
							<CanvasWidget engine={props.app.getDiagramEngine()} />
						</MyCanvasWidget>
					</div>
				</S.Layer>
			</S.Content>
			<S.Code>
				<Code model={model} />
			</S.Code>
		</S.Body >
	)

}
export default React.memo(BodyWidget)