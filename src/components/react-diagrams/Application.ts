import * as SRD from '@projectstorm/react-diagrams';
import { PortModelAlignment } from '@projectstorm/react-diagrams';
import { EditableLabelFactory } from './custom-label/EditableLabelFactory';
import { EditableNodeFactory } from './custom-node/custom_nodes/editableNode/EditableNodeFactory';
import { DiamondNodeFactory } from './diamond/DiamondNodeFactory';
import { DiamondPortModel } from './diamond/DiamondPortModel';
import { SimplePortFactory } from './diamond/SimplePortFactory';

/**
 * @author Dylan Vorster
 */
export class Application {
	protected activeModel: any;//SRD.DiagramModel
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = SRD.default();
		this.diagramEngine
			.getPortFactories()
			.registerFactory(new SimplePortFactory('diamond', (config) => new DiamondPortModel(PortModelAlignment.LEFT)));
		this.diagramEngine.getNodeFactories().registerFactory(new DiamondNodeFactory());
		this.diagramEngine.getLabelFactories().registerFactory(new EditableLabelFactory());

		this.diagramEngine.getNodeFactories().registerFactory(new EditableNodeFactory());
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
