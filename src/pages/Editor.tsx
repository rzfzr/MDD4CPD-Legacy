import Code from "../components/Code"

import BodyWidget from '../components/react-diagrams/BodyWidget';
import { Application } from '../components/react-diagrams/Application';

export default function EditorPage() {
  console.log("EditorPage render");
  var app = new Application();

  return <BodyWidget app={app} />

}