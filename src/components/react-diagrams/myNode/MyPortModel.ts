import {
	LinkModel,
	PortModel,
	PortModelAlignment,
	PortModelGenerics,
	PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { MyLinkModel } from './MyLinkModel';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface DefaultPortModelOptions extends PortModelOptions {
	label?: string;
	in?: boolean;
}

export interface DefaultPortModelGenerics extends PortModelGenerics {
	OPTIONS: DefaultPortModelOptions;
}

export class MyPortModel extends PortModel<DefaultPortModelGenerics> {
	constructor(isIn: boolean, name?: string, label?: string);
	constructor(options: DefaultPortModelOptions);
	constructor(options: DefaultPortModelOptions | boolean, name?: string, label?: string) {
		if (!!name) {
			options = {
				in: !!options,
				name: name,
				label: label
			};
		}
		options = options as DefaultPortModelOptions;
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
		// if (port instanceof DefaultPortModel) {
		// 	return this.options.in !== port.getOptions().in;
		// }
		return true;
	}

	createLinkModel(): LinkModel {
		const link = new MyLinkModel();
		// let label = new DefaultLabelModel();
		// label.setLabel("I'm a sad label");
		// link.addLabel(label)
		return link
	}
}
