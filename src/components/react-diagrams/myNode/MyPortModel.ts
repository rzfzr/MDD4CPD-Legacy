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
	hasHiddenLabel?: boolean;
}

export interface DefaultPortModelGenerics extends PortModelGenerics {
	OPTIONS: MyPortModelOptions;
}

export class MyPortModel extends PortModel<DefaultPortModelGenerics> {
	constructor(isIn: boolean, name?: string, label?: string);
	constructor(isIn: boolean, name?: string, label?: string);
	constructor(options: MyPortModelOptions);
	constructor(options: MyPortModelOptions | boolean, name?: string, label?: string, hasHiddenLabel?: boolean) {
		if (name) {
			options = {
				in: !!options,
				name: name,
				label: label
			};
		}
		options = options as MyPortModelOptions;
		super({
			label: options.label || options.name,
			alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
			type: 'default',
			...options
		});
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.in = event.data.in;
		this.options.label = event.data.label;
	}

	serialize() {
		return {
			...super.serialize(),
			in: this.options.in,
			label: this.options.label
		};
	}

	canLinkToPort(port: PortModel): boolean {
		return true;
	}

	createLinkModel(): LinkModel {
		return new MyRightAngleLinkModel()
	}
}
