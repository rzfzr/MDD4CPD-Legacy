//@ts-nocheck
import * as _ from "lodash";
import { PortModel, PortModelAlignment } from "@projectstorm/react-diagrams";

export class EditablePortModel extends PortModel {

	constructor(pos: PortModelAlignment = PortModelAlignment.TOP) {
		super({ alignment: pos, name: pos });
	}
	serialize() {
		return _.merge(super.serialize(), {
			position: this.options.alignment
		});
	}
}
