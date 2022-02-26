import Prism from "prismjs";
import { useEffect } from "react";
import "./prism.css";
import PrismEdit from "./PrismEdit";
import Xarrow from "react-xarrows";


function generateCode(model: any): { code: string, problems: any[] } {
    let problems: any[] = []
    let code = ''
    const add = (...message: string[]) => {
        message.forEach((m) => {
            code += m;
        });
        code += "\n";
        return code;
    };
    const addOnTop = (...message: string[]) => {
        let top = ''
        message.forEach((m) => {
            top += m;
        });
        code = top + "\n" + code
    };
    const getLink = (linkID: string) => {
        return links.find(l => l.id === linkID)
    }
    const getPort = (nodeID: string, portID: string) => {
        try {
            return nodes.find((n: any) => n.id === nodeID).ports
                .find((p: any) => p.id === portID);
        } catch (error) {
            return "// Loose end"
        }
    }
    const getNode = (nodeID: string) => {
        return nodes.find((n: any) => n.id === nodeID)
    }
    const getCoditionalValue = (conditionNode: any, portName: any): string => {
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
    const getOutcome = (conditionNode: any, ifThis = 'True') => {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === ifThis).links[0]
            let link = getLink(linkID)
            return getPort(link.target, link.targetPort)
        } catch (error) {
            return { label: '// Lacking Outcome' }
        }
    }
    const getParent = (childNode: any) => {
        return nodes.find((n: any) => n.id === childNode.parentNode)
    }
    const removeTypes = (name: string): string => {
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
    const callWithParameters = (node: any, ...contents: any) => {
        try {
            if (node.extras.type === 'constant') {
                contents.push(node.content.name)
            } else {
                contents.push(node.content.value)
            }
        } catch (error) {
            console.log('error, no parameter?')
        }
        node.ports.forEach((port: any) => {
            port.links.forEach((l: any) => {
                const link = getLink(l);
                const toPort = getPort(link.target, link.targetPort)
                const toNode = getNode(toPort.parentNode)
                if (!toNode) {
                    warn('Loose link', [node])
                } else if (toNode?.id === node?.id) {//skip as it is the previous link
                    if (toNode.instance) {
                        add(toNode.instance + '.' + removeTypes(toPort.name.split("(").shift()) + '(' + contents + ');')
                    }
                } else if (toNode?.extras?.type === 'built-in') {
                    add(removeTypes(toPort.name.split("(").shift()) + '(' + contents + ');')
                } else if (!toNode?.instance) {//points to another variable/port
                    callWithParameters(toNode, ...contents)
                } else {//points to a class instance, we hope it is a method call
                    //todo: check for parameter type and numbers
                    add(toNode.instance + '.' + removeTypes(toPort.name.split("(").shift()) + '(' + contents + ');')
                }
            })
        })
    }
    const processCall = (fromNode: any, fromPort: any, toNode: any, toPort: any) => {
        if (['variable', 'constant', 'parameter'].includes(toNode?.extras?.type)) {
            callWithParameters(toNode)
        } else if (['port'].includes(toNode?.extras?.type)) {
            if (toNode.name.includes('Digital')) {
                usedDigital.push(toNode.content.value)
            } else {
                usedAnalog.push(toNode.content.value)
            }
            callWithParameters(toNode)
        } else {
            if (toNode?.instance) {
                add(toNode.instance + '.' + removeTypes(toPort.name) + '();')
            } else if (fromNode.instance) {
                add(fromNode.instance + '.' + removeTypes(fromPort.name) + '();')
            } else {
                warn('Loose connection', [fromNode])
            }
        }
    }
    const processLink = (l: any) => {
        const link = getLink(l);
        const toPort = getPort(link.target, link.targetPort)
        const toNode = getNode(toPort.parentNode)
        const fromPort = getPort(link.source, link.sourcePort)
        const fromNode = getNode(fromPort.parentNode)

        if (toNode?.extras?.type === 'built-in') {
            add(removeTypes(toPort.name) + '()')
        } else if (toNode?.name === "Function") {
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
            processCall(fromNode, fromPort, toNode, toPort)
        }
    }

    const warn = (message: string, nodes: any[] = [], type: any = 'not used') => {
        problems.push({ message, nodes: nodes });
        return problems
    };

    if (Object.keys(model).length === 0) {
        return { code: '// Empty Diagram!', problems: [] };
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

        let hasLink = false
        n.ports.forEach((port: any) => {
            if (port.links.length > 0) {
                hasLink = true
            }
        });
        if (!hasLink) {
            warn('This component has no links', [n])
        }
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
            case 'parameter':
                console.log(n);
                if (hasLink) {
                    n.ports.forEach((port: any) => {
                        if (port.links.length > 1) {
                            warn(`This ${n.name.toLowerCase()} has more than one link in the same ${port.label} port.`, [n])
                        } else {
                            if (port.links.length === 0)
                                warn(`This ${n.name.toLowerCase()} is not being used.`, [n])
                        }
                    });
                }
                break
            case 'constant':
                n.content.name = n.content.name.toUpperCase()
                constants.push(n)
                break
        }
    })

    if (controllers.length === 0) {
        return { code: '', problems: warn('No micro-controller') }
    }
    if (controllers.length > 1) {
        return {
            code: '// Only one Arduino allowed!',
            problems: warn('More than one micro-controller', controllers)
        }
    }

    let controller = controllers[0]

    if (libraries.length > 0) {
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
    }

    if (logics.filter(l => l.name === 'Function').length > 0) {
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
    }

    if (constants.length > 0) {
        add('// Constants')
        constants.forEach(constant => {
            add(`#define ${constant.content.name} ${constant.content.value} //${constant.name}`)
        });
        add('')
    }

    add(`// Micro-controller's Lifecycle`)
    // let content.value: string | null = null
    controller.ports.forEach((port: any) => {
        add('void ', port.label, "{");
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
    return { code: indentCode(code), problems };
}
export default function Code(props: { model: string }) {
    console.log('CodeComponent render')
    const model = props.model
    let code = ''
    let problems: any[] = []

    if (model === "{}" || model === "") {
    } else {
        const generated = generateCode(JSON.parse(model))
        code = generated.code
        let cleanProblems: any[] = []
        generated.problems.forEach(dirty => {
            if (cleanProblems.findIndex(p => p.message === dirty.message) === -1) {
                const sameNodes = Array.from(new Set([].concat(...generated.problems.filter(p => p.message === dirty.message).map(p => p.nodes))))
                cleanProblems.push({ message: dirty.message, nodes: sameNodes })
            }
        });
        problems = cleanProblems
    }

    useEffect(() => {
        Prism.highlightAll();
    }, [props])
    return (
        <>
            <div className="Code">
                {
                    problems.length !== 0 &&
                    <div style={{ border: 'solid yellow 2px' }}>
                        <div style={{ border: 'solid yellow 1px', fontSize: '1em' }}>
                            Problems!
                        </div>
                        {
                            problems.map((p: any, index: any) => {
                                if (p.nodes.length > 0) {
                                    p.nodes.forEach((node: any) => {
                                        const el = document.querySelector(`[data-nodeid='${node.id}']`)
                                        if (el) el.setAttribute('id', node.id)
                                    });
                                }
                                const problemId = p.nodes.length > 0 ? 'problem-' + p.nodes[0].id + index : 'problem-nodeless' + index
                                return <div id={problemId} key={problemId} style={{ fontSize: '0.6em', border: 'solid white 1px' }}>
                                    Model violation: {p.message}
                                    {p.nodes.map((node: any, index: any) => {
                                        return <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                                            <Xarrow
                                                strokeWidth={2}
                                                start={problemId}
                                                end={node.id}
                                                color='yellow'
                                            />
                                        </div>
                                    })}
                                </div>
                            })
                        }
                    </div>
                }
                <pre >
                    <code className="language-clike">{code}</code>
                </pre>
            </div>
            <PrismEdit />
        </>
    );
}