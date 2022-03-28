/* eslint-disable jsx-a11y/anchor-is-valid */
import Prism from "prismjs";
import { useEffect } from "react";
import "./prism.css";
// import PrismEdit from "./PrismEdit";
import Xarrow from "react-xarrows";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReactTooltip from 'react-tooltip';
import GoClass from './GoClass';

import { processDynamic } from "../components/goBuilder"


function generateCode(model: any): { code: string, problems: any[] } {

    // #region Reviewed Functions
    function addConstantDeclarations(constants: any) {
        if (constants.length > 0) {
            add('// Constants')
            constants.forEach((constant: any) => {
                add(`#define ${constant.content.name} ${constant.content.value} //${constant.name}`)
            });
            add('')
        }
    }
    function addFunctionDeclarations(functions: any) {
        if (functions.length > 0) {
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
    }
    function addLibraries(libraries: any) {
        if (libraries.length > 0) {
            add('// Libraries')
            libraries.forEach((lib: any) => {
                add('#include <' + lib + '>')
            });
            add('')
            add('// Objects')
            libraries.forEach((lib: any) => {
                components.forEach(comp => {
                    if (comp.extras.library === lib)
                        add(comp.name + ' ' + comp.instance)
                });
            });
        }
    }
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
    function warnAboutNodesWithoutLinks(nodes: any) {
        nodes.forEach((node: any) => {
            let hasLink = false
            node.ports.forEach((port: any) => {
                if (port.links.length > 0) {
                    hasLink = true
                }
            });
            if (!hasLink) {
                warn('This component has no links', [node])
            }
        });
    }
    function warnAboutMultipleUsePorts(nodes: any) {
        nodes.filter((node: any) => node.extras.type === 'variable' || node.extras.type === 'parameter')
            .forEach((node: any) => {
                node.ports.forEach((port: any) => {
                    if (port.links.length > 1) {
                        warn(`This ${node.name.toLowerCase()} has more than one link in the same ${port.label} port.`, [node])
                    } else {
                        if (port.links.length === 0) {
                            warn(`This ${node.name.toLowerCase()} is not being used.`, [node])
                        }
                    }
                });
            });
    }
    function getLinksFromModel(model: any) {
        const temp: any[] = []
        Object.entries(model.layers[0].models).forEach((link: any) => {
            temp.push(link[1])
        })
        return temp
    }
    function getNodesFromModel(model: any) {
        const temp: any[] = []
        Object.entries(model.layers[1].models).forEach((node: any) => {
            temp.push(node[1])
        })
        return temp
    }
    function getComponentsFromNodes(nodes: any) {
        let temp: any[] = []
        nodes.filter((node: any) => node.extras?.type === 'component')
            .forEach((node: any) => {
                node.instance = node.name.toLowerCase().replace(' ', '') +
                    temp.filter(t => t.extras?.library === node.extras?.library).length
                temp.push(node)
            });
        return temp
    }
    function warnAboutNumberOfControllers(controllers: any) {
        if (controllers.length === 0) {
            warn('No micro-controller')
        }
        if (controllers.length > 1) {
            warn('More than one micro-controller', controllers)
        }
    }
    function add(...message: string[]) {
        message.forEach((m) => {
            code += m;
        });
        code += "\n";
        return code;
    };
    function addHeaderComments() {
        addOnTop("")
        addOnTop(`Digital ports ${usedDigital.length}/${controller?.extras.digitalPorts} ${usedDigital.length > 0 ? `(${usedDigital})` : ""}`, "*/")
        addOnTop(`Analog ports ${usedAnalog.length}/${controller?.extras.analogPorts} ${usedAnalog.length > 0 ? `(${usedAnalog})` : ""} `)
        addOnTop("/* Code generated for ", controller?.name);

        function addOnTop(...message: string[]) {
            let top = ''
            message.forEach((m) => {
                top += m;
            });
            code = top + "\n" + code
        };
    }
    function getLink(linkID: string) {
        return links.find(l => l.id === linkID);
    }
    function getPort(nodeID: string, portID: string) {
        try {
            return nodes.find((n: any) => n.id === nodeID).ports
                .find((p: any) => p.id === portID);
        } catch (error) {
            return "// Loose end";
        }
    }
    function getNode(nodeID: string) {
        return nodes.find((n: any) => n.id === nodeID);
    }
    function getParent(childNode: any) {
        return nodes.find((n: any) => n.id === childNode.parentNode);
    }
    function warn(message: string, nodes: any[] = [], type: any = 'not used') {
        problems.push({ message, nodes: nodes });
        return problems;
    }
    // #endregion

    // #region Unreviewed Functions
    function addLifecycleMethods() {
        add(`// Micro-controller's Lifecycle`)
        controller?.ports.forEach((port: any) => {
            add('void ', port.label, "{");
            port.links.forEach((l: any) => {
                processLink(l)
            })
            add("}\n");
        })
    }
    function getCoditionalValue(conditionNode: any, portName: any): string {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === portName).links[0];
            let link = getLink(linkID);
            let port = getPort(link.source, link.sourcePort);
            let parent = getParent(port);

            if (['variable', 'port'].includes(parent.extras.type)) {
                return parent.content.value;
            }
            else if (['component'].includes(parent.extras.type)) {
                return parent.instance + '.' + port.name;
            } else {
                return add('Unknown extras.type');
            }
        } catch (error) {
            return '/* Lacking Value */';
        }
    }

    function getOutcome(conditionNode: any, ifThis = 'True') {
        try {
            let linkID = conditionNode.ports.find((p: any) => p.name === ifThis).links[0];
            let link = getLink(linkID);
            return getPort(link.target, link.targetPort);
        } catch (error) {
            return { label: '// Lacking Outcome' };
        }
    }

    // function oldRemoveTypes(name: string): string {
    //     const firstSpace = name.indexOf(' ') + 1;
    //     const openningRound = name.indexOf('(');
    //     const closingRound = name.indexOf(')');

    //     const functionName = name.substring(firstSpace, openningRound);
    //     const params = name.substring(openningRound + 1, closingRound).split(',');
    //     let result = functionName;
    //     params.forEach(param => {
    //         if (!param.includes('=')) {
    //             let thisParam = String(param.split(' ').slice(-1));
    //             result += thisParam;
    //         }
    //     });
    //     console.log('removing types from "', name, '" params ', params, ' returning :', result);
    //     return result;
    // }

    function callWithParameters(node: any, ...contents: any) {
        try {
            if (node.extras.type === 'constant') {
                contents.push(node.content.name);
            } else {
                contents.push(node.content.value);
            }
        } catch (error) {
            console.log('error, no parameter?');
        }
        node.ports.forEach((port: any) => {
            port.links.forEach((l: any) => {
                const link = getLink(l);
                const toPort = getPort(link.target, link.targetPort);
                const toNode = getNode(toPort.parentNode);
                if (!toNode) {
                    warn('Loose link', [node]);
                } else if (toNode?.id === node?.id) { //skip as it is the previous link
                    if (toNode.instance) {
                        add(toNode.instance + '.' + toPort.name.split("(").shift() + '(' + contents + ');');
                    }
                } else if (toNode?.extras?.type === 'built-in') {
                    add(toPort.name.split("(").shift() + '(' + contents + ');');
                } else if (!toNode?.instance) { //points to another variable/port
                    callWithParameters(toNode, ...contents);
                } else { //points to a class instance, we hope it is a method call
                    //todo: check for parameter type and numbers
                    add(toNode.instance + '.' + (toPort.name.split("(").shift()) + '(' + contents + ');');
                }
            });
        });
    }
    function processCall(fromNode: any, fromPort: any, toNode: any, toPort: any) {
        if (['variable', 'constant', 'parameter'].includes(toNode?.extras?.type)) {
            callWithParameters(toNode);
        } else if (['port'].includes(toNode?.extras?.type)) {
            if (toNode.name.includes('Digital')) {
                usedDigital.push(toNode.content.value);
            } else {
                usedAnalog.push(toNode.content.value);
            }
            callWithParameters(toNode);
        } else { //is a component or function?
            if (toNode?.instance) {
                add(toNode.instance + '.' + (toPort.name) + '();');
            } else if (fromNode?.instance) {
                add(fromNode.instance + '.' + (fromPort.name) + '();');
            } else {
                warn('Loose connection', [fromNode]);
            }
        }
    }
    function processLink(l: any) {
        const link = getLink(l);
        const toPort = getPort(link.target, link.targetPort);
        if (!toPort)
            return;
        const toNode = getNode(toPort.parentNode);
        const fromPort = getPort(link.source, link.sourcePort);
        const fromNode = getNode(fromPort.parentNode);

        if (toNode?.extras?.type === 'built-in') {
            add(toPort.name + '()');
        } else if (toNode?.name === "Function") {
            add(toNode.content.value, '(', ');');
        } else if (toNode?.name === "Condition") {
            const xValue = getCoditionalValue(toNode, 'x');
            const yValue = getCoditionalValue(toNode, 'y');

            const outcome2 = getOutcome(toNode);
            const toNode2 = getParent(outcome2);

            const outcome3 = getOutcome(toNode, 'False');
            const toNode3 = getParent(outcome3);

            add('if (', xValue, ' ' + toNode.content.value + ' ', yValue, ') {');
            if (toNode2) {
                callWithParameters(toNode2);
            } else {
                add('/* Lacking code to be executed if conditional is true */');
            }
            if (toNode3) {
                add('} else {');
                callWithParameters(toNode3);
            }
            add("}\n");

        } else {
            processCall(fromNode, fromPort, toNode, toPort);
        }
    }
    // #endregion


    // #region Shared Variables
    let code = ''

    const problems: any[] = []

    const links: any[] = getLinksFromModel(model)
    const nodes: any[] = getNodesFromModel(model)
    const logics: any[] = nodes.filter(node => node.extras?.type === 'logic')
    const components: any[] = getComponentsFromNodes(nodes)
    const controllers: any[] = nodes.filter(node => node.extras?.type === 'controller')
    const controller = controllers[0]

    const libraries: any[] = [...new Set(components.map(component => component.extras.library))]
    const constants: any[] = nodes.filter(node => node.extras?.type === 'constant').map((constant) => {
        constant.content.name = constant.content.name.toUpperCase()
        return constant
    })

    const usedDigital: number[] = []
    const usedAnalog: number[] = []


    // #endregion



    // #region Lifecycle
    warnAboutNumberOfControllers(controllers)
    warnAboutNodesWithoutLinks(nodes)
    warnAboutMultipleUsePorts(nodes)
    addLibraries(libraries)
    addFunctionDeclarations(logics.filter(l => l.name === 'Function'))
    addConstantDeclarations(constants)
    addLifecycleMethods()
    addHeaderComments()
    // #endregion

    return { code: indentCode(code), problems };
}
export default function Code(props: { model: string }) {
    // console.log('CodeComponent render')

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
        <div className="Code">
            <div style={{ border: problems.length !== 0 ? 'solid yellow 2px' : 'dotted black 2px' }}>
                <div style={{ border: problems.length !== 0 ? 'solid yellow 1px' : 'dotted white 1px', fontSize: '1em' }}>
                    {problems.length} Problems!
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

                        let nodedata: any[] = []
                        let linkdata: any[] = []
                        p.nodes.forEach((node: any, index: number) => {
                            const { nodes, links } = processDynamic(node, index)
                            nodedata.push(...nodes)
                            linkdata.push(...links)
                        });

                        return <div id={problemId} key={problemId} style={{ fontSize: '0.6em', border: 'solid white 1px' }}>

                            Model violation: {p.message}
                            <a data-tip data-for={'tip-' + problemId} style={{ float: 'left', marginRight: '6px' }} >
                                <OpenInNewIcon style={{ fontSize: '1rem' }} />
                            </a>
                            <ReactTooltip
                                className="interactableTooltip"
                                id={'tip-' + problemId}
                                type='light' place="bottom"
                                delayHide={500}
                                effect="solid"
                            >
                                <div className='miniGoHolder'>


                                    <GoClass
                                        linkdata={linkdata} nodedata={nodedata} arrangement='horizontal' />
                                </div>
                            </ReactTooltip>


                            {p.nodes.map((node: any, index: any) => {
                                return <div key={index} style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
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
            <pre style={{
                height: '100%', overflow: 'auto'
            }}>
                <code className="language-clike">{code}</code>
            </pre >
        </div >
    );
}