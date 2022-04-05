import { MyEditableNodeWidget } from "./MyEditableNodeWidget";
import { MyEditableNodeModel } from "./MyEditableNodeModel";
import { AbstractReactFactory, GenerateModelEvent } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from "@projectstorm/react-diagrams";

export class MyEditableNodeFactory extends AbstractReactFactory<MyEditableNodeModel, DiagramEngine> {
	generateModel(event: GenerateModelEvent): MyEditableNodeModel {
		throw new Error("Method not implemented.");
	}
	// generateModel(event: import("@projectstorm/react-canvas-core").GenerateModelEvent): MyEditableNodeModel {
	// 	return new MyEditableNodeModel({});
	// }
	constructor() {
		super("MyEditable");
	}

	generateReactWidget(event: { model: MyEditableNodeModel }): JSX.Element {
		return <MyEditableNodeWidget nodeModel={event.model} engine={this.engine} />;
	}
}
