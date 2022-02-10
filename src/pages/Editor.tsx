import Code from "../components/Code"

import { BodyWidget } from '../components/react-diagrams/BodyWidget';
import { Application } from '../components/react-diagrams/Application';

export default function EditorPage() {
  var app = new Application();
  return <div className="float-container" >
    <div className="float-child-left">
      <BodyWidget app={app} />
    </div>
    <div className="float-child-right">
      <Code />
    </div>
  </div>
}