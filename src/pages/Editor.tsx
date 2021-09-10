import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

import Code from "../components/Code"
import Diagram from "../components/Diagram";

export default function EditorPage() {

  const { model } = useContext(GlobalContext)

  const code = model;
  return <div className="float-container" >
    <div className="float-child-left">
      <Diagram />
    </div>
    <div className="float-child-right">
      <Code code={code} language="clike" />
    </div>
  </div>
}