import { useEffect, useState } from "react";
import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
import "./prism.css";
import PrismEdit from "./PrismEdit";


function generateCode(model: any): string {
    let code = ''
    if (Object.keys(model).length === 0) {
        return '// Empty Diagram!';
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
                n.instance = n.name.toLowerCase() + components.filter(c => c.extras.library === n.extras.library).length
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

    // console.log('Generating from model:', model, 'Parsed ', nodes, logics, components, controllers)

    if (nodes.length === 0) return '// You need at least one Node!'
    if (controllers.length === 0) return '// You need an Arduino!'
    if (controllers.length > 1) return '// Only one Arduino allowed!'

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
    let getCoditionalValue = (conditionNode: any, portName: any): string => {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === portName).links[0]
            let link = getLink(linkID)
            let port = getPort(link.source, link.sourcePort)
            let parent = getParent(port)

            if (parent.extras.type === 'variable') {
                return parent.content
            }
            else if (parent.extras.type === 'component') {
                return parent.instance + '.' + port.name
            } else {
                return 'Unknown extras.type'

            }
        } catch (error) {
            return '/* Lacking Value */'
        }
    }
    let getOutcome = (conditionNode: any) => {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === 'True').links[0]
            let link = getLink(linkID)
            return getPort(link.target, link.targetPort)
        } catch (error) {
            return { label: '// Lacking Outcome' }
        }
    }
    let getParent = (childNode: any) => {
        return nodes.find((n: any) => n.id === childNode.parentNode)
    }
    add("/* Code generated for ", controller.name);
    add('Analog ports N/' + controller.extras.analogPorts)
    add('Digital ports M/' + controller.extras.digitalPorts)
    add("*/")
    add('')

    libraries.forEach(lib => {
        add('#include <' + lib + '>')
        components.forEach(comp => {
            if (comp.extras.library === lib)
                add(comp.name + ' ' + comp.instance)
        });
        add('')
    });


    let removeType = (name: string): string => {//todo: should accept multiple
        return String(name.split(' ').slice(-1))
    }
    let replaceVariable = (call: string, variable: string) => {//todo: should accept multiple
        console.log('replacing', call, variable)
        return call.split("(").shift() + '(' + variable + ')'
    }

    let content: string | null = null
    controller.ports.forEach((port: any) => {
        add(port.label, "{");
        port.links.forEach((l: any) => {
            let link = getLink(l);
            let toPort = getPort(link.target, link.targetPort)
            let toNode = getNode(toPort.parentNode)
            let fromPort = getPort(link.source, link.sourcePort)
            let fromNode = getNode(fromPort.parentNode)
            if (toNode.name === "Condition") {
                let xValue = getCoditionalValue(toNode, 'x')
                let yValue = getCoditionalValue(toNode, 'y')
                let outcome = getOutcome(toNode)
                console.log('here', link, toNode, toPort, xValue, yValue, outcome)
                add('if (', xValue, ' ' + toNode.content + ' ', yValue, ') {')
                add(getParent(outcome)?.instance + '.' + outcome.label)
                add("}\n");
            } else {
                if (toNode.extras.type === 'variable') {
                    content = toNode.content
                    toNode.ports.forEach((port: any) => {
                        port.links.forEach((l: any) => {
                            let link = getLink(l);
                            let toPort = getPort(link.target, link.targetPort)
                            let toNode = getNode(toPort.parentNode)

                            if (toNode.instance && content) {
                                add(toNode.instance + '.' + replaceVariable(removeType(toPort.name), content))
                                content = null;
                            }
                        })
                    })
                } else {
                    if (toNode.instance) {
                        add(toNode.instance + '.' + removeType(toPort.name))
                    } else {
                        add(fromNode.instance + '.' + removeType(fromPort.name))
                    }
                }
            }
        })
        add("}\n");
    })

    function indentCode(original: string) {
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
    return indentCode(code);
}
export default function Code() {
    const [code, setCode] = useState('Initializing Generator')
    useEffect(() => {
        Prism.highlightAll();
        setInterval(() => {
            try {
                let temp = localStorage.getItem('model')
                if (temp !== localStorage.getItem('oldModel')) {
                    localStorage.setItem('oldModel', temp || '{}')
                    setCode(generateCode(JSON.parse(temp || '{}')));
                    Prism.highlightAll();
                }
            } catch (error) {
                // console.log(error)
            }
        }, 1500)
    }, []);
    return (
        <>
            <div className="Code">
                <pre >
                    <code className="language-clike">{code}</code>
                </pre>
            </div>
            <PrismEdit />

        </>
    );
}