import Code from "../components/Code"
import DiagramWithPalette from '../components/react-diagrams/index';

export default function EditorPage() {
  return <div className="float-container" >
    <div className="float-child-left">
      <DiagramWithPalette />
    </div>
    <div className="float-child-right">
      <Code />
    </div>
  </div>
}