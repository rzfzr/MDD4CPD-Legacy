import * as React from 'react';
import { Application } from '../components/react-diagrams/Application';
import { TrayItemWidget } from '../components/react-diagrams/TrayItemWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { MyCanvasWidget } from '../components/react-diagrams/MyCanvasWidget';
import styled from '@emotion/styled';
import { MyEditableNodeModel } from '../components/react-diagrams/editableNode/MyEditableNodeModel';
import PaletteNodes from '../PaletteNodes.jsx';
import { useState, useEffect } from 'react';
import Code from '../components/Code';
var ScrollArea = require('react-scrollbar').default;

const app = new Application();

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

function EditorPage() {
  const [model, setModel] = useState("{}")
  const [rerender, setRerender] = React.useState(false);

  const rawModel = app.getDiagramEngine().getModel().serialize()
  const stringModel = JSON.stringify(rawModel, null, 2)

  const groups = [...new Set(PaletteNodes.map(x => x.extras.group || x.extras.type))]
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
                  {PaletteNodes.filter(n => (n.extras.group === group || n.extras.type === group)).map((node) => {
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

              app.getDiagramEngine().getModel().registerListener({
                linksUpdated: (l: any) => {
                  setRerender(!rerender);
                  // console.log("link\n");
                },
                nodesUpdated: (n: any) => {
                  setRerender(!rerender);
                  // console.log("node")
                }
              })
              node = new MyEditableNodeModel(data);

              node.setPosition(app.getDiagramEngine().getRelativeMousePoint(event));
              app.getDiagramEngine().getModel().addNode(node);
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
              <CanvasWidget engine={app.getDiagramEngine()} />
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
export default React.memo(EditorPage)