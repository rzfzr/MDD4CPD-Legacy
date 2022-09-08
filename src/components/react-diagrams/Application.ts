import * as SRD from '@projectstorm/react-diagrams';
import { MyEditableNodeFactory } from './editableNode/MyEditableNodeFactory';

import {
	RightAngleLinkFactory,
} from '@projectstorm/react-diagrams';
import { EditableLabelFactory } from './custom-link-label/EditableLabelFactory';

export class Application {
	protected activeModel: any;//SRD.DiagramModel
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = SRD.default();

		this.diagramEngine.getNodeFactories().registerFactory(new MyEditableNodeFactory());
		this.diagramEngine.getLinkFactories().registerFactory(new RightAngleLinkFactory());
		this.diagramEngine.getLabelFactories().registerFactory(new EditableLabelFactory());

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
