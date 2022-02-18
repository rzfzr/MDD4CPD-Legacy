import Prism from "prismjs";
import { useEffect } from "react";
import "./prism.css";
import PrismEdit from "./PrismEdit";

function generateCode(model: any): string {
    let code = ''
    if (Object.keys(model).length === 0) {
        return '// Empty Diagram!';
    }
    const links: any[] = []
    Object.entries(model.layers[0].models).forEach((x: any) => {
        links.push(x[1])
    })
    const nodes: any[] = []
    const logics: any[] = []
    const components: any[] = []
    const controllers: any[] = []
    const libraries: any[] = []

    const usedDigital: number[] = []
    const usedAnalog: number[] = []

    // const functions: any[] = []

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
        // console.log('----', code);
        code += "\n";
    };
    let addOnTop = (...message: string[]) => {
        let top = ''
        message.forEach((m) => {
            top += m;
        });
        code = top + "\n" + code
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

            if (['variable', 'port'].includes(parent.extras.type)) {
                return parent.content
            }
            else if (['component'].includes(parent.extras.type)) {
                return parent.instance + '.' + port.name
            } else {
                return 'Unknown extras.type'

            }
        } catch (error) {
            return '/* Lacking Value */'
        }
    }
    let getOutcome = (conditionNode: any, ifThis = 'True') => {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === ifThis).links[0]
            let link = getLink(linkID)
            return getPort(link.target, link.targetPort)
        } catch (error) {
            return { label: '// Lacking Outcome' }
        }
    }
    let getParent = (childNode: any) => {
        return nodes.find((n: any) => n.id === childNode.parentNode)
    }
    let removeType = (name: string): string => {//todo: should accept multiple
        return String(name.split(' ').slice(-1))
    }

    let callWithParameters = (node: any, ...contents: any) => {
        contents.push(node.content)
        node.ports.forEach((port: any) => {
            port.links.forEach((l: any) => {
                const link = getLink(l);
                const toPort = getPort(link.target, link.targetPort)
                const toNode = getNode(toPort.parentNode)
                if (toNode.id === node.id) {
                    //skip as it is the previous link
                } else if (!toNode.instance) {//points to another variable/port
                    callWithParameters(toNode, ...contents)
                } else {//points to a class instance, we hope it is a method call
                    //todo: check for parameter type and numbers
                    add(toNode.instance + '.'
                        + removeType(toPort.name.split("(").shift())
                        + '(' + contents + ')')
                }
            })
        })
    }

    const processLink = (l: any) => {
        const link = getLink(l);
        const toPort = getPort(link.target, link.targetPort)
        const toNode = getNode(toPort.parentNode)
        const fromPort = getPort(link.source, link.sourcePort)
        const fromNode = getNode(fromPort.parentNode)

        if (toNode.name === "Function") {
            console.log(toNode);
            add(toNode.content, '(', ');')
        } else if (toNode.name === "Condition") {
            const xValue = getCoditionalValue(toNode, 'x')
            const yValue = getCoditionalValue(toNode, 'y')

            const outcome2 = getOutcome(toNode)
            const toNode2 = getParent(outcome2)

            const outcome3 = getOutcome(toNode, 'False')
            const toNode3 = getParent(outcome3)

            add('if (', xValue, ' ' + toNode.content + ' ', yValue, ') {')
            if (toNode2) {
                callWithParameters(toNode2)
            } else {
                add('/* Lacking code to be executed if conditional is true */')
            }
            if (toNode3) {
                add('} else {')
                callWithParameters(toNode3)
            }
            add("}\n");

        } else {
            if (['variable'].includes(toNode.extras.type)) {
                callWithParameters(toNode)
            } else if (['port'].includes(toNode.extras.type)) {
                console.log('found port', toNode)
                if (toNode.name.includes('Digital')) {
                    console.log('it was digital');
                    usedDigital.push(toNode.content)
                } else {
                    console.log('it was analog');
                    usedAnalog.push(toNode.content)
                }
                callWithParameters(toNode)
            } else {
                if (toNode.instance) {
                    add(toNode.instance + '.' + removeType(toPort.name))
                } else {
                    add(fromNode.instance + '.' + removeType(fromPort.name))
                }
            }
        }
    }
    add('// Libraries')
    libraries.forEach(lib => {
        add('#include <' + lib + '>')
    });

    add('')

    add('// Objects')
    libraries.forEach(lib => {
        components.forEach(comp => {
            if (comp.extras.library === lib)
                add(comp.name + ' ' + comp.instance)
        });
    });

    add('// Functions')
    logics.forEach(logic => {
        if (logic.name === "Function") {
            add('void ', logic.content, '() {')
            console.log('logiccccc, ', logic)

            let callPort = logic.ports.find((x: any) => x.alignment === 'right')



            callPort.links.forEach((l: any) => {
                processLink(l)
            });

            // const toNode = getNode(toPort.parentNode)

            // const outcome2 = getOutcome(toNode)
            // const toNode2 = getParent(outcome2)
            // callWithParameters(toNode2)
            console.log('port', callPort);


            add('}')
        }
    });
    add('')
    add('// Micro-controller Lifecycle')




    // let content: string | null = null
    controller.ports.forEach((port: any) => {
        add(port.label, "{");
        port.links.forEach((l: any) => {
            processLink(l)
        })
        add("}\n");
    })

    addOnTop("")
    addOnTop(`Digital ports ${usedDigital.length}/${controller.extras.digitalPorts} ${usedDigital.length > 0 ? `(${usedDigital})` : ""}`, "*/")
    addOnTop(`Analog ports ${usedAnalog.length}/${controller.extras.analogPorts} ${usedAnalog.length > 0 ? `(${usedAnalog})` : ""} `)
    addOnTop("/* Code generated for ", controller.name);

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
export default function Code(props: { model: string }) {
    console.log('CodeComponent render')
    const model = props.model
    let code = 'Initializing Generator'
    if (model === "{}" || model === "") {
        //
    } else {
        code = generateCode(JSON.parse(model))
    }
    useEffect(() => {
        Prism.highlightAll();
    }, [props])
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