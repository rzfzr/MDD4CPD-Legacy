import modelsDiagram from '../assets/cym_s_extended.svg'
import stateDiagram from '../assets/cym_d.svg'
export default function ModelsPage() {
    return <div>
        <img src={modelsDiagram} alt="Architecture Diagram" style={{ maxHeight: '80vh', maxWidth: '100%' }} />
        <img src={stateDiagram} alt="Architecture Diagram" style={{ maxHeight: '80vh', maxWidth: '90%' }} />
    </div>
}