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

        data.methods?.forEach((method: string) => {
            this.addBiPort(method)
        });
        data.ins?.forEach((method: string) => {
            this.addInPort(method)
        });
        data.outs?.forEach((method: string) => {
            this.addOutPort(method)
        });

        //Custom setup for diffent types
        const content = { name: 'userName', hasUsername: hasUserName, value: '0', hasValue: hasUserValue, hasUsages: false, hasReturnType: false, returnType: 'byte' }
        this.selectableOptions = ['something', 'went wrong'];
        console.log('data', data)
        switch (data.name) {
            case 'bool':
                content.value = 'true'
                this.selectableOptions = ['true', 'false'];
                break;
            case 'Digital Port':
            case 'Analog Port':
                content.hasUsages = true
                this.selectableOptions = Array.from(Array(100).keys()).map(x => x.toString())//todo: add global context to get current microcontroller limit
                break;
            case 'Constant(s)':
                content.hasReturnType = true
                content.hasUsages = true
                content.hasUsername = true
                break;
            case 'Parameter(s)':
                content.hasReturnType = true
                content.hasUsages = true
                break;
            case 'Function':
                content.value = 'foo'
                content.hasReturnType = true
                content.hasUsages = true
                break;
            case 'Condition':
                content.value = '=='
                this.selectableOptions = ['==', '!=', '<', '>', '<=', '>=', '<=>']
                break;
            default:
                content.value = 'value'
                break;
        }
        this.content = content
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

    addInPort(label: string, after = true, hasHiddenLabel = false): MyPortModel {
        const p = new MyPortModel({
            in: true,
            name: hasHiddenLabel ? label + ' ' : label,
            label: label,
            alignment: PortModelAlignment.LEFT,
            hasHiddenLabel: hasHiddenLabel
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
            alignment: PortModelAlignment.RIGHT,
            hasHiddenLabel: false
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    addBiPort(label: string, after = true): MyPortModel {
        this.addOutPort(label, after)
        return this.addInPort(label, after, true)
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
        const re = {
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
        }

        // console.log('re', re)

        return re;
    }

    getInPorts(): MyPortModel[] {
        return this.portsIn;
    }

    getOutPorts(): MyPortModel[] {
        return this.portsOut;
    }
}