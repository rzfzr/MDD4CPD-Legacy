import {
	PortModel,
	PortModelAlignment,
	PortModelGenerics,
	PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { MyRightAngleLinkModel } from './MyRightAngleLinkModel';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { EditableLabelModel } from '../custom-link-label/EditableLabelModel';

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
		// console.log('checking if can link', port)
		return port.getOptions().id !== this.getOptions().id
	}
	createLinkModel(): MyRightAngleLinkModel {
		function genColor(seed: any) {
			let color: any = Math.floor((Math.abs(Math.sin(seed) * 16777215)));
			color = color.toString(16);
			// pad any colors shorter than 6 characters with leading 0s
			while (color.length < 6) {
				color = '0' + color;
			}
			console.log('generated color', color, 'with seed', seed)
			return color;
		}

		let link = new MyRightAngleLinkModel()


		// console.log('creating link model')
		// link.getOptions().testName = 'Test';
		// link.addLabel(
		// 	new EditableLabelModel({
		// 		value: 'Hello, I am label!'
		// 	})
		// );
		link.setWidth(5)

		setTimeout(() => {
			try {
				const ports = Object.values(link.getSourcePort().getParent().getPorts())
				const linkQuantity = Object.values(ports).map(port => Object.keys(port.links).length)
					.reduce((acc: any, l: any) => { return acc + l }, 0)

				if (linkQuantity) {
					link.setColor('#' + genColor(3 + linkQuantity))
				} else {
					throw (new Error('no links'))
				}
			} catch (error) {
				link.setColor('#f42921')

			}

		}, 500);

		return link
	}
}
