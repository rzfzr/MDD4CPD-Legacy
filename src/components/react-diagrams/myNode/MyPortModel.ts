import {
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
	hasHiddenLabel?: boolean;
}

export interface DefaultPortModelGenerics extends PortModelGenerics {
	OPTIONS: MyPortModelOptions;
}

export class MyPortModel extends PortModel<DefaultPortModelGenerics> {
	extras: any;
	constructor(options: MyPortModelOptions) {
		super({
			in: options.in,
			name: options.name,
			label: options.label || options.name,
			alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
			type: 'default',
			extras: { hasHiddenLabel: options.hasHiddenLabel }
		});
	}

	deserialize(event: DeserializeEvent<this>) {
		console.log('des model', event)
		super.deserialize(event);
		this.options.extras = event.data.extras;
		this.options.in = event.data.in;
		this.options.label = event.data.label;
	}

	serialize() {
		console.log('res', this)
		return {
			...super.serialize(),
			in: this.options.in,
			label: this.options.label,
			extras: this.options.extras,
		};
	}

	canLinkToPort(port: PortModel): boolean {
		return true;
	}
	createLinkModel(): MyRightAngleLinkModel {
		console.log('creating link', new MyRightAngleLinkModel())
		return new MyRightAngleLinkModel()
	}
}
