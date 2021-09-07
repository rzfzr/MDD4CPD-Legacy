import { Link } from "react-router-dom";
export default function HomePage() {
    return <div> Welcome to MDD4IoT!
        <li><Link to="/">Home</Link></li>
        <li><Link to="/editor">Editor</Link></li>
    </div>
}