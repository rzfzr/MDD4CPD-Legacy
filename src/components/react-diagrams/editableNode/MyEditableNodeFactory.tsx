import { MyEditableNodeWidget } from "./MyEditableNodeWidget";
import { MyEditableNodeModel } from "./MyEditableNodeModel";
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from "@projectstorm/react-diagrams";

export class MyEditableNodeFactory extends AbstractReactFactory<MyEditableNodeModel, DiagramEngine> {
	generateModel(event: import("@projectstorm/react-canvas-core").GenerateModelEvent): MyEditableNodeModel {
		return new MyEditableNodeModel('name', 'pink', 'test', ['t'], ['t']);
	}
	constructor() {
		super("MyEditable");
	}

	generateReactWidget(event: { model: MyEditableNodeModel }): JSX.Element {
		return <MyEditableNodeWidget nodeModel={event.model} engine={this.engine} />;
	}
}
