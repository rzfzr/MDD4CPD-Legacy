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
    content: Object;
    extras: any;
    selectableOptions: string[];
    constructor(data: any, hasUserValue: boolean, hasUserName: boolean) {
        super({
            type: 'MyEditable',
            name: data.name,
            color: data.color,
        });
        this.extras = data.extras;
        console.log('creating', data)

        data.methods?.forEach((method: string) => {
            this.addBiPort(method)
        });
        data.ins?.forEach((method: string) => {
            this.addInPort(method)
        });
        data.outs?.forEach((method: string) => {
            this.addOutPort(method)
        });

        const userName = hasUserName ? 'userName' : false;
        // if(hasUserValue)
        switch (data.name) {
            case 'bool':
                this.content = { name: userName, value: hasUserValue ? 'true' : false }
                this.selectableOptions = ['true', 'false'];
                break;
            case 'port':
                this.content = { name: userName, value: hasUserValue ? '0' : false }
                this.selectableOptions = Array.from(Array(10).keys()).map(x => x.toString())
                break;
            case 'int':
                this.content = { name: userName, value: hasUserValue ? '0' : false }
                this.selectableOptions = ['something', 'went wrong'];
                break;
            case 'Condition':
                this.content = { name: userName, value: hasUserValue ? '==' : false }
                this.selectableOptions = ['==', '!=', '<', '>', '<=', '>=', '<=>']
                break;
            default:
                this.content = { name: userName, value: hasUserValue ? 'value' : false }
                this.selectableOptions = ['something', 'went wrong'];
                break;
        }
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
        console.log('adding port', port)
        super.addPort(port);
        if (port.getOptions().in) {
            if (this.portsIn.indexOf(port) === -1) {
                // this.portsIn = [port, ...this.portsIn]
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

    addBiPort(label: string, after = true): MyPortModel {
        this.addInPort(label, after)
        return this.addOutPort(label, after)
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
            content: this.content,
            selectableOptions: this.selectableOptions
        };
    }

    getInPorts(): MyPortModel[] {
        return this.portsIn;
    }

    getOutPorts(): MyPortModel[] {
        return this.portsOut;
    }
}