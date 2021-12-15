import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { MyPortModel } from '../myNode/MyPortModel';

export interface DefaultNodeModelOptions extends BasePositionModelOptions {
    name?: string;
    color?: string;
    content?: string;
}

export interface DefaultNodeModelGenerics extends NodeModelGenerics {
    OPTIONS: DefaultNodeModelOptions;
}

export class MyEditableNodeModel extends NodeModel<DefaultNodeModelGenerics> {
    protected portsIn: MyPortModel[];
    protected portsOut: MyPortModel[];
    content: string;
    extras: any;
    constructor(name: string, color: string) {
        super({
            type: 'MyEditable',
            name: name,
            color: color,
            content: 'value'
        });
        this.content = 'value'
        this.portsOut = [];
        this.portsIn = [];
    }

    doClone(lookupTable: {}, clone: any): void {
        clone.portsIn = [];
        clone.portsOut = [];
        super.doClone(lookupTable, clone);
    }

    removePort(port: MyPortModel): void {
        super.removePort(port);
        if (port.getOptions().in) {
            this.portsIn.splice(this.portsIn.indexOf(port), 1);
        } else {
            this.portsOut.splice(this.portsOut.indexOf(port), 1);
        }
    }

    addPort<T extends MyPortModel>(port: T): T {
        super.addPort(port);
        if (port.getOptions().in) {
            if (this.portsIn.indexOf(port) === -1) {
                this.portsIn.push(port);
            }
        } else {
            if (this.portsOut.indexOf(port) === -1) {
                this.portsOut.push(port);
            }
        }
        return port;
    }

    addInPort(label: string, after = true): MyPortModel {
        const p = new MyPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    addOutPort(label: string, after = true): MyPortModel {
        const p = new MyPortModel({
            in: false,
            name: label,
            label: label,
            alignment: PortModelAlignment.RIGHT
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    addExtras(extras: any): any {
        this.extras = extras;
        return this.extras
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.options.name = event.data.name;
        this.options.color = event.data.color;
        this.portsIn = _.map(event.data.portsInOrder, (id) => {
            return this.getPortFromID(id);
        }) as MyPortModel[];
        this.portsOut = _.map(event.data.portsOutOrder, (id) => {
            return this.getPortFromID(id);
        }) as MyPortModel[];
        this.extras = event.data.extras
        this.content = event.data.content
    }

    serialize(): any {
        return {
            ...super.serialize(),
            name: this.options.name,
            color: this.options.color,
            portsInOrder: _.map(this.portsIn, (port) => {
                return port.getID();
            }),
            portsOutOrder: _.map(this.portsOut, (port) => {
                return port.getID();
            }),
            extras: this.extras,
            content: this.content
        };
    }

    getInPorts(): MyPortModel[] {
        return this.portsIn;
    }

    getOutPorts(): MyPortModel[] {
        return this.portsOut;
    }
}