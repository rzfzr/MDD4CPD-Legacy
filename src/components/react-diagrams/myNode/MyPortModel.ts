import {
	LinkModel,
	PortModel,
	PortModelAlignment,
	PortModelGenerics,
	PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { MyRightAngleLinkModel } from './MyRightAngleLinkModel';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';


export interface MyPortModelOptions extends PortModelOptions {
	label?: string;
	in?: boolean;
	hasHiddenLabel: boolean;
}

export interface DefaultPortModelGenerics extends PortModelGenerics {
	OPTIONS: MyPortModelOptions;
}

export class MyPortModel extends PortModel<DefaultPortModelGenerics> {
	constructor(options: MyPortModelOptions) {
		super({
			in: options.in,
			name: options.name,
			label: options.label || options.name,
			hasHiddenLabel: options.hasHiddenLabel,
			alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
			type: 'default'
		});
	}

	deserialize(event: DeserializeEvent<this>) {
		console.log('des model', event)
		super.deserialize(event);
		this.options.hasHiddenLabel = event.data.hasHiddenLabel;
		this.options.in = event.data.in;
		this.options.label = event.data.label;
	}

	serialize() {
		return {
			...super.serialize(),
			hasHiddenLabel: this.options.hasHiddenLabel,
			in: this.options.in,
			label: this.options.label,
		};
	}

	canLinkToPort(port: PortModel): boolean {
		return true;
	}
	createLinkModel(): LinkModel {
		return new MyRightAngleLinkModel()
	}
}
