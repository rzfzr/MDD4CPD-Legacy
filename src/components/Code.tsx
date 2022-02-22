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
    const constants: any[] = []

    const usedDigital: number[] = []
    const usedAnalog: number[] = []

    Object.entries(model.layers[1].models).forEach((x: any) => {
        const n = x[1]
        nodes.push(n)
        switch (n.extras.type) {
            case 'component':
                n.instance = n.name.toLowerCase().replace(' ', '') + components.filter(c => c.extras.library === n.extras.library).length
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
            case 'variable':
                break
            case 'constant':
                n.content.name = n.content.name.toUpperCase()
                constants.push(n)
                break
        }
    })

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
        return code;
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
        try {
            return nodes.find((n: any) => n.id === nodeID).ports
                .find((p: any) => p.id === portID);
        } catch (error) {
            return "// Loose end"
        }
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
                return parent.content.value
            }
            else if (['component'].includes(parent.extras.type)) {
                return parent.instance + '.' + port.name
            } else {
                return add('Unknown extras.type')
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
    let removeTypes = (name: string): string => {
        const functionName = name.substring(name.indexOf(' ') + 1, name.indexOf('(') !== -1 ? name.indexOf('(') : name.length)
        const params = name.substring(name.indexOf('('), name.indexOf(')') - 1).split(',')
        let result = functionName
        params.forEach(param => {
            if (!param.includes('=')) {
                let thisParam = String(param.split(' ').slice(-1))
                result += thisParam
            }
        });
        // console.log('removing types from', name, 'params ', params, ' returning', result)
        return result;
    }

    let callWithParameters = (node: any, ...contents: any) => {
        if (node.extras.type === 'constant') {
            contents.push(node.content.name)
        } else {
            contents.push(node.content.value)
        }


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
                    add(toNode.instance + '.' + removeTypes(toPort.name.split("(").shift()) + '(' + contents + ')')
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

        if (toNode?.name === "Function") {
            console.log('fun', toNode);
            add(toNode.content.value, '(', ');')
        } else if (toNode?.name === "Condition") {
            const xValue = getCoditionalValue(toNode, 'x')
            const yValue = getCoditionalValue(toNode, 'y')

            const outcome2 = getOutcome(toNode)
            const toNode2 = getParent(outcome2)

            const outcome3 = getOutcome(toNode, 'False')
            const toNode3 = getParent(outcome3)

            add('if (', xValue, ' ' + toNode.content.value + ' ', yValue, ') {')
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
            if (['variable', 'constant'].includes(toNode?.extras?.type)) {
                callWithParameters(toNode)
            } else if (['port'].includes(toNode?.extras?.type)) {
                console.log('found port', toNode)
                if (toNode.name.includes('Digital')) {
                    console.log('it was digital');
                    usedDigital.push(toNode.content.value)
                } else {
                    console.log('it was analog');
                    usedAnalog.push(toNode.content.value)
                }
                callWithParameters(toNode)
            } else {
                if (toNode?.instance) {
                    add(toNode.instance + '.' + removeTypes(toPort.name) + '()')
                } else {
                    add(fromNode.instance + '.' + removeTypes(fromPort.name) + '()')
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
            add('void ', logic.content.value, '() {')

            const callPort = logic.ports.find((x: any) => x.alignment === 'right')
            callPort.links.forEach((l: any) => {
                processLink(l)
            });
            add('}')
        }
    });



    add('// Constants')
    constants.forEach(constant => {
        add(`#define ${constant.content.name} ${constant.content.value} //${constant.name}`)
    });


    add('')
    add('// Micro-controller Lifecycle')
    // let content.value: string | null = null
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
    // console.log('CodeComponent render')
    const model = props.model
    let code = 'Initializing Generator'
    if (model === "{}" || model === "") {
        //
    } else {
        try {
            code = generateCode(JSON.parse(model))
        } catch (error) {
            console.log('erro', error)
        }
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