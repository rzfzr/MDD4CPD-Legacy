import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

import Code from "../components/Code"
import Diagram from "../components/Diagram";

function generateCode(model: any): string {
  let code = ''
  let links: any[] = []
  Object.entries(model.layers[0].models).forEach((x: any) => {
    links.push(x[1])
  })
  let nodes: any[] = []
  Object.entries(model.layers[1].models).forEach((x: any) => {
    nodes.push(x[1])
  })

  let controller = nodes.find((x: any) => x.name === 'Arduino')



  console.log(controller, links, nodes)

  //   let generateDecision = (element: any) => {
  //     console.log("GeneratingDecision for ", element.name, element);
  //     element.methods.forEach((method) => {
  //       p(method.methodText, "{\n");

  //       console.log("................................", this.getToElements(method));

  //       this.getToElements(method).forEach((toElement) => {
  //         console.log("getToElements:", method, toElement);

  //         let relation = this.relations.find((rel) => rel.toElement == toElement);

  //         console.log("-------------------------------------method, ", method);
  //         console.log("toElement, ", toElement);
  //         console.log("relation, ", relation);
  //         if (toElement.name && (toElement.name.includes("if") || toElement.name.includes("while")) && relation) {
  //           const conditionText = toElement.name.includes("if") ? "if" : "while"; //todo add more

  //           // let value = toElement.methodText;

  //           let value = this.relations.find(
  //             (relation) => relation.fromElement.name == toElement.name && relation.name == "Value"
  //           ).toElement.methodText;

  //           let ifTrues = this.relations.filter(
  //             (relation) => relation.fromElement.name == toElement.name && relation.name == "True"
  //           );
  //           console.log("trues: --------------------------------");
  //           ifTrues.forEach((t) => {
  //             console.log(t);
  //             console.log(t.coordinates.h, t.coordinates.w, t.coordinates.x, t.coordinates.y);

  //             console.table(t.toElement);
  //           });
  //           console.log("--------------------------------");

  //           let ifFalses = this.relations.filter(
  //             (relation) => relation.fromElement.name == toElement.name && relation.name == "False"
  //           );

  //           let condition = toElement.name.replace("if", "").replace("while", "").replace(" ", "");

  //           p(conditionText, " (", value, " ", condition, "){ \n");

  //           ifTrues.forEach((ifTrue) => {
  //             p(ifTrue.toElement.name || ifTrue.toElement.parentName, ";");
  //           });

  //           ifFalses.forEach((ifFalse) => {
  //             p("else {");
  //             p(ifFalse.toElement.name || ifFalse.toElement.parentName, ";");
  //           });

  //           p("}");
  //         } else {
  //           p(toElement.methodText, ";");
  //           p("\n}");
  //         }
  //       });

  //       p("}\n");
  //     });
  //   };

  //   let p = (...message) => {
  //     message.forEach((m) => {
  //       code += m;
  //     });
  //     code += "\n";
  //   };
  //   let usedDigital = 0;
  //   let usedAnalog = 0;
  //   let usedLibraries = [];

  //   this.components.forEach((component) => {
  //     usedDigital += parseInt(component.digitalPorts);
  //     usedAnalog += parseInt(component.analogPorts);
  //     console.log(component);

  //     if (component.type == "component") usedLibraries.push(component.name);
  //   });

  //   usedLibraries.forEach((lib) => {
  //     p("#include <" + lib + ".h>");
  //   });
  //   p("// Code generated for Arduino ", this.arduino.model);
  //   p(
  //     "// with ",
  //     this.arduino.digitalPorts,
  //     " digital ports in total with ",
  //     usedDigital,
  //     " in use and ",
  //     this.arduino.digitalPorts - usedDigital,
  //     " free"
  //   );
  //   p(
  //     "// and ",
  //     this.arduino.analogPorts,
  //     " analog ports in total with ",
  //     usedAnalog,
  //     " in use and ",
  //     this.arduino.analogPorts - usedAnalog,
  //     " free"
  //   );

  //   generateDecision(this.arduino);

  return code;
}
export default function EditorPage() {
  const { model } = useContext(GlobalContext)
  let code = ''
  console.log(model)
  if (model != {})
    code = generateCode(model)
  // code += JSON.stringify(model);
  // console.log(model)

  return <div className="float-container" >
    <div className="float-child-left">
      <Diagram />
    </div>
    <div className="float-child-right">
      <Code code={code} language="clike" />
    </div>
  </div>
}