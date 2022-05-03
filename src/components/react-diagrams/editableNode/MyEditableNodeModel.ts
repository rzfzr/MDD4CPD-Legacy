import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { MyPortModel } from '../myNode/MyPortModel';

export interface DefaultNodeModelOptions extends BasePositionModelOptions {
    name?: string;
    color?: string;
}

export interface DefaultNodeModelGenerics extends NodeModelGenerics {
    OPTIONS: DefaultNodeModelOptions;
}

export class MyEditableNodeModel extends NodeModel<DefaultNodeModelGenerics> {
    portsIn: MyPortModel[] = [];
    portsOut: MyPortModel[] = [];
    extras: Object;
    selectableOptions: string[];
    constructor(data: any) {
        super({
            type: 'MyEditable',
            name: data.name,
            color: data.color,
        });

        data.extras.returnType = data.extras.returnType || 'byte'
        data.extras.value = data.extras.value || 'value'

        this.extras = data.extras;

        data.methods?.forEach((biPort: string) => {
            this.addInPort(biPort)
            this.addOutPort(biPort + ' ', true, true)
        });
        data.ins?.forEach((inPort: string) => {
            this.addInPort(inPort)
        });
        data.outs?.forEach((outPort: string) => {
            this.addOutPort(outPort)
        });
        this.selectableOptions = data.extras.selectableOptions || false;
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
    //todo add changeport?
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

    addInPort(name: string, after = true): MyPortModel {
        const p = new MyPortModel({
            in: true,
            name: name,
            label: name,
            alignment: PortModelAlignment.LEFT,
            hasHiddenLabel: false
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }


    renamePort(oldName: string, newName: string): void {
        const portInIndex = this.portsIn.findIndex(p => p.getOptions().name === oldName)

        this.portsIn[portInIndex].getOptions().name = newName
        this.portsIn[portInIndex].getOptions().label = newName

        this.ports[newName] = this.ports[oldName];
        delete this.ports[oldName];
    }




    addOutPort(name: string, after = true, hasHiddenLabel = false): MyPortModel {
        const p = new MyPortModel({
            in: false,
            name: name,
            label: hasHiddenLabel ? name + ' ' : name,
            alignment: PortModelAlignment.RIGHT,
            hasHiddenLabel: hasHiddenLabel
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
        this.selectableOptions = event.data.selectableOptions
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
            selectableOptions: this.selectableOptions
        }
    }

    getInPorts(): MyPortModel[] {
        return this.portsIn;
    }

    getOutPorts(): MyPortModel[] {
        return this.portsOut;
    }
}