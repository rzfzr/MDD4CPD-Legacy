import BodyWidget from '../components/react-diagrams/BodyWidget';
import { Application } from '../components/react-diagrams/Application';

export default function EditorPage() {
  var app = new Application();
  return <BodyWidget app={app} />
}