import * as SRD from '@projectstorm/react-diagrams';
import { EditableLabelFactory } from './custom-label/EditableLabelFactory';
import { MyEditableNodeFactory } from './editableNode/MyEditableNodeFactory';

/**
 * @author Dylan Vorster
 */
export class Application {
	protected activeModel: any;//SRD.DiagramModel
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = SRD.default();
		this.diagramEngine.getLabelFactories().registerFactory(new EditableLabelFactory());
		this.diagramEngine.getNodeFactories().registerFactory(new MyEditableNodeFactory());
		this.newModel();
	}

	public newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setModel(this.activeModel);
	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}
