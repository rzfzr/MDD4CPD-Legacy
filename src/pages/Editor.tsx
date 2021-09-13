import Code from "../components/Code"
import Diagram from "../components/Diagram";

export default function EditorPage() {
  return <div className="float-container" >
    <div className="float-child-left">
      <Diagram />
    </div>
    <div className="float-child-right">
      <Code />
    </div>
  </div>
}