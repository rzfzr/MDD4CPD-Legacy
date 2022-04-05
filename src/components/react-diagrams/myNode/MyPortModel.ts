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
		super.deserialize(event);
		this.options.extras = event.data.extras;
		this.options.in = event.data.in;
		this.options.label = event.data.label;
	}

	serialize() {
		return {
			...super.serialize(),
			in: this.options.in,
			label: this.options.label,
			extras: this.options.extras,
		};
	}

	canLinkToPort(port: PortModel): boolean {
		console.log('linking ', port.getOptions().id)
		return port.getOptions().id !== this.getOptions().id
	}
	createLinkModel(): MyRightAngleLinkModel {

		function hsl2rgb(h: any, s: any, l: any) {
			let a = s * Math.min(l, 1 - l);
			let f = (n: any, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return [f(0), f(8), f(4)];
		}
		let link = new MyRightAngleLinkModel()
		link.setWidth(5)
		link.setColor('rgb(' + hsl2rgb(Math.random() * 360, 100, 100) +
			')')
		return link
	}
}
