import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// import "./prism.css";


function generateCode(model: any): string {
    let code = ''
    if (Object.keys(model).length === 0) {
        return 'Empty Diagram!';
    }
    let links: any[] = []
    Object.entries(model.layers[0].models).forEach((x: any) => {
        links.push(x[1])
    })
    let nodes: any[] = []
    let logics: any[] = []
    let components: any[] = []
    let controllers: any[] = []
    let libraries: any[] = []

    Object.entries(model.layers[1].models).forEach((x: any) => {
        const n = x[1]
        nodes.push(n)
        switch (n.extras.type) {
            case 'component':
                components.push(n)
                if (!libraries.includes(n.extras.library))
                    libraries.push(n.extras.library)
                break
            case 'controller':
                controllers.push(n)
                break
            case 'logic':
                logics.push(n)
                break
        }
    })




    // let controller = nodes.find((x: any) => x.name.includes('Arduino'))
    console.log('Generating from model:', model, 'Parsed ', nodes, logics, components, controllers)




    if (nodes.length === 0) return 'You need at least one Node!'
    if (controllers.length === 0) return 'You need an Arduino!'
    if (controllers.length > 1) return 'Only one Arduino allowed!'

    let controller = controllers[0]





    let add = (...message: string[]) => {
        message.forEach((m) => {
            code += m;
        });
        code += "\n";
    };
    let getLink = (linkID: string) => {
        return links.find(l => l.id === linkID)
    }
    let getPort = (nodeID: string, portID: string) => {
        return nodes.find((n: any) => n.id === nodeID).ports
            .find((p: any) => p.id === portID);
    }
    let getNode = (nodeID: string) => {
        return nodes.find((n: any) => n.id === nodeID)
    }
    let getValue = (conditionNode: any) => {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === 'value').links[0]
            let link = getLink(linkID)
            return getPort(link.source, link.sourcePort)
        } catch (error) {
            // console.log(error)
            return { name: '/* Lacking Value */' }
        }
    }
    let getOutcome = (conditionNode: any) => {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === 'True').links[0]
            let link = getLink(linkID)
            return getPort(link.target, link.targetPort)
        } catch (error) {
            // console.log(error)
            return { label: '//Lacking Outcome' }
        }
    }






    libraries.forEach(lib => {
        add('#include <' + lib + '>')
        components.forEach(comp => {
            if (comp.extras.library === lib)
                add(comp.name + ' ' + comp.name.toLowerCase())
        });
        add('')
    });








    controller.ports.forEach((port: any) => {
        add(port.label, "{\n");
        port.links.forEach((l: any) => {
            let link = getLink(l);
            let toPort = getPort(link.target, link.targetPort)
            let toNode = getNode(toPort.parentNode)
            if (toNode.name === "Condition") {
                let value = getValue(toNode)
                let outcome = getOutcome(toNode)

                add('if (', value.name, toPort.name.replace('if', ''), ') {')
                add(outcome.label)
                add("}\n");
            } else {
                console.log(toNode)
                // let outcome = getOutcome(toNode)
                add(toNode.ports[0].name)


            }
            // add(link.target)






        })

        add("}\n");
        // getToPorts(port)

    })

    //     element.methods.forEach((method) => {

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
    function formatCode(original: string) {
        // console.log('formatting ', original)
        let code: any[] = [];
        let level = 0;
        let tab = "    ";
        original.split("\n").forEach((line) => {
            if (line.includes("}")) {
                level--;
            }
            code.push(tab.repeat(level) + line);
            if (line.includes("{")) {
                level++;
            }
        });
        return code.join("\n");
    }
    return formatCode(code);
}
export default function Code() {
    const [code, setCode] = useState('Initializing Generator')
    useEffect(() => {
        Prism.highlightAll();
        setInterval(() => {
            try {
                let temp = localStorage.getItem('model')
                if (temp === localStorage.getItem('oldModel')) {
                    // console.log('Same as old, skipping code generation')
                } else {
                    localStorage.setItem('oldModel', temp || '{}')
                    setCode(generateCode(JSON.parse(temp || '{}')));
                }
            } catch (error) {
                console.log(error)
            }
        }, 1500)
    }, []);
    return (
        <div className="Code">
            <pre className="line-numbers">
                <code className={`language-clike`}>{code}</code>
            </pre>
        </div>
    );
}