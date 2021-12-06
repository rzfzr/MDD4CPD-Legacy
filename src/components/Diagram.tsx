import createEngine from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

export default function Diagram() {
    const engine = createEngine();
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <CanvasWidget className='canvas' engine={engine} />
        </div>
    );
}