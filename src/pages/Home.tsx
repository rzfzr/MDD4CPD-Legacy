import masterDiagram from '../assets/master.png'
export default function HomePage() {
    return <div>
        <h2>
            Welcome to MDD4IoT!
        </h2>
        <div>
            <img src={masterDiagram} alt="Architecture Diagram" style={{ backgroundColor: "white", maxHeight: '80vh', maxWidth: '100%' }} />
        </div>

    </div>
}