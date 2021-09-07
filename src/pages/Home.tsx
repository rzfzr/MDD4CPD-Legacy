import { Link } from "react-router-dom";
import masterDiagram from '../assets/master.svg'
export default function HomePage() {
    return <div>
        <h2>
            Welcome to MDD4IoT!
        </h2>
        <div>
            <img src={masterDiagram} alt="Architecture Diagram" style={{ backgroundColor: "white" }} />
        </div>

    </div>
}