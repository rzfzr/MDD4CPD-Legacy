import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel
} from '@projectstorm/react-diagrams';

import {
    CanvasWidget
} from '@projectstorm/react-canvas-core';
import { EditableLabelModel } from './react-diagrams/EditableLabelModel';
import { EditableLabelFactory } from './react-diagrams/EditableLabelFactory';


export default function SimpleBottomNavigation() {

    const engine = createEngine();

    engine.getLabelFactories().registerFactory(new EditableLabelFactory());

    const model = new DiagramModel();

    const n0 = new DefaultNodeModel('Arduino', 'green');
    const p00 = n0.addOutPort('setup()');
    const p01 = n0.addOutPort('loop()');
    n0.setPosition(50, 70);



    const n2 = new DefaultNodeModel('Condition', 'grey')
    const p20 = n2.addInPort('if <= 20');
    const p21 = n2.addInPort('value');
    const p23 = n2.addOutPort('True');
    const p24 = n2.addOutPort('False');
    n2.setPosition(230, 100)



    const n3 = new DefaultNodeModel('Led', 'red');
    const p30 = n3.addInPort('setValue()');
    n3.setPosition(400, 70);


    const n4 = new DefaultNodeModel('TemperatureSensor', 'Blue');
    const p40 = n4.addOutPort('getValue()');
    n4.setPosition(30, 170);


    model.addAll(n0, n2, p00.link(p20), p23.link(p30), p40.link(p21), n3, n4);
    engine.setModel(model);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <CanvasWidget className='canvas' engine={engine} />
        </div>
    );
}