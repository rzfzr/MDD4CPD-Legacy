import flowDiagram from '../assets/flow.svg'
import cym_s from '../assets/cym_s.svg'
export default function HomePage() {
    return <div>
        <h2>
            Welcome to MDD4CPS!
        </h2>
        <img src={flowDiagram} alt="Architecture Diagram" style={{ maxHeight: '80vh', maxWidth: '100%' }} />
        <img src={cym_s} alt="CYM-S" style={{ maxHeight: '80vh', maxWidth: '100%' }} />
    </div>
}