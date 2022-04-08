/* eslint-disable jsx-a11y/anchor-is-valid */
import Prism from "prismjs";
import { Fragment, useEffect } from "react";
import "./prism.css";
// import PrismEdit from "./PrismEdit";
import Xarrow from "react-xarrows";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReactTooltip from 'react-tooltip';
import GoClass from './GoClass';

import { processDynamic } from "../components/goBuilder"

const returnTypes = ['byte', 'unsigned int', 'unsigned long', 'int', 'long', 'bool', 'float', 'double', 'char']
const ordinals = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh']

const paramTypes = ['variable', 'constant', 'parameter', 'port', 'built-in-constant']

function generateCode(model: any): { code: string, problems: any[] } {

    // #region Reviewed Functions
    function addConstantDeclarations(constants: any) {
        if (constants.length > 0) {
            add("")
            add('// Constants')
            constants.forEach((constant: any) => {
                let params = constant.extras.value.split(',')
                const isArray = params.length > 1
                const count = isArray ? '[' + params.length + ']' : ''
                params = isArray ? '{' + params.map((x: any) => x) + '}' : params
                add(`#define ${constant.extras.returnType} ${constant.extras.name}${count} = ${params};`)
            });
        }
    }
    function addVariableDeclarations(variables: any) {
        if (variables.length > 0) {
            add("")
            add('// Variables')
            variables.forEach((variable: any) => {
                let params = variable.extras.value.split(',')
                const isArray = params.length > 1
                const count = isArray ? '[' + params.length + ']' : ''
                params = isArray ? '{' + params.map((x: any) => x) + '}' : params

                const equals = params[0] !== '' ? '=' : ''
                add(`${variable.extras.returnType} ${variable.extras.name}${count} ${equals} ${params}; `)
            });
        }
    }
    function addFunctionDeclarations(functions: any) {
        if (functions.length > 0) {
            add('// Functions')
            logics.forEach(logic => {
                if (logic.name === "Function") {
                    add(`${logic.extras.returnType} ${logic.extras.value}{
                `)
                    const callPort = logic.ports.find((x: any) => x.alignment === 'right')
                    callPort.links.forEach((l: any) => {
                        processLink(l)
                    });
                    add('}')
                }
            });
        }
    }
    function addLibraries() {
        const libraries: any[] = [...new Set(components.map(component => component.extras.library))]

        if (libraries.length > 0) {
            add("")
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
    function formattedParameters(params: any) {
        return params.map((par: any) => {
            switch (par.extras.type) {
                case 'parameter':
                case 'port':
                    return par.extras.value
                case 'constant':
                case 'variable':
                    return par.extras.name
                case 'built-in-constant':
                    return par.name
                default:
                    return 'error on node type'
            }
        })
    }
    function indentCode(original: string) {
        let code: any[] = [];
        let level = 0;
        let tab = "    ";
        original.split("\n").forEach((line) => {
            if (line.includes("}")) {
                level--;
            }
            code.push(tab.repeat(Math.max(level, 0)) + line);
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
                warn('This component has no links', node)
            }
        });
    }
    function warnAboutPortUsage() {
        usedDigital.forEach(port => {
            if (port.extras.value >= controller?.extras.digitalPorts) {
                warn(`This ${port.name} does not exist on this micro - controller`, port)
            }
        });
        usedAnalog.forEach(port => {
            if (port.extras.value >= controller?.extras.analogPorts) {
                warn(`This ${port.name} does not exist on this micro - controller`, port)
            }
        });
    }
    function warnAboutMultipleUsePorts(nodes: any) {
        nodes.filter((node: any) => paramTypes.includes(node.extras.type))
            .forEach((node: any) => {
                node.ports.forEach((port: any) => {
                    if (port.links.length > 1) {
                        warn(`This ${node.name.toLowerCase()} has more than one link in the same ${port.label} port.`, node)
                    } else {
                        if (port.links.length === 0) {
                            warn(`This ${node.name.toLowerCase()} is not being used.`, node)
                        }
                    }
                });
            });
    }
    function warnAboutLooseLinks(links: any) {
        links.forEach((link: any) => {
            const fromPort = getPort(link.source, link.sourcePort);
            const fromNode = getNode(fromPort?.parentNode)
            const toPort = getPort(link.target, link.targetPort);
            if (!toPort) {
                warn('Loose link', fromNode);
            }

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
    function warnAboutNumberOfControllers() {
        const controllers: any[] = nodes.filter(node => node.extras?.type === 'controller')
        if (controllers.length === 0) {
            warn('No micro-controller')
        }
        if (controllers.length > 1) {
            controllers.forEach(controller => {
                warn('More than one micro-controller', controller)
            });
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
        add("/* Code generated for ", controller?.name);
        const uniqueDigitals = [...new Set(usedDigital.map(u => u.extras.value))]
        const uniqueAnalogs = [...new Set(usedAnalog.map(u => u.extras.value))]

        add(`Analog ports ${uniqueAnalogs.length} /${controller?.extras.analogPorts} ${usedAnalog.length > 0 ? `(${uniqueAnalogs.map(port => port)})` : ""} `)
        add(`Digital ports ${uniqueDigitals.length}/${controller?.extras.digitalPorts} ${usedDigital.length > 0 ? `(${uniqueDigitals.map(port => port)})` : ""}`, "    */")
    }
    function getLink(linkID: string) {
        return links.find(l => l.id === linkID);
    }
    function getPort(nodeID: string, portID: string) {
        try {
            return nodes.find((n: any) => n.id === nodeID).ports
                .find((p: any) => p.id === portID);
        } catch (error) {
            return null;
        }
    }
    /**
     * Only to be used for paramTypes !
     */
    function getOutPort(inPort: any) {
        try {
            const node = getNode(inPort.parentNode)
            const portPosition = node.portsInOrder.indexOf(inPort.id)
            const outPortId = node.portsOutOrder[portPosition]
            const outPort = node.ports.find((p: { id: any; }) => p.id === outPortId)
            return outPort
        } catch (error) {
            return null
        }
    }

    function getNode(nodeID: string) {
        return nodes.find((n: any) => n.id === nodeID);
    }
    // function getParent(childNode: any) {
    //     return nodes.find((n: any) => n.id === childNode.parentNode);
    // }
    function warn(message: string, node: any = null, port: any = null) {
        problems.push({ message, node, port });
        return problems;
    }
    function addLifecycleMethods() {
        add("")
        add(`// Micro-controller's Lifecycle`)
        controller?.ports.forEach((port: any) => {
            add('void ', port.label, "{");
            port.links.forEach((l: any) => {
                processLink(l)
            })
            add("}\n");
        })
    }
    // #endregion

    // #region Unreviewed Functions
    function processLink(l: any) {
        function callWithParameters(port: any, params: any) {
            // console.log('calling', port, params)

            const node = getNode(port.parentNode)
            const expected = port.name?.split('(')[1].split(')')[0].split(',').filter((x: any) => x !== '')
            const received: any[] = []

            params.forEach((p: any) => {
                if (paramTypes.includes(p.extras.type)) {
                    received.push(...p.extras.value.split(',').map((m: any) => p.extras.returnType + ' ' + m))
                }
            })

            const expMin = expected.filter((e: any) => !e.includes('=')).length
            const expMax = expected.length

            if (received.length < expMin || received.length > expMax) {
                const count = expMin === expMax ? expMin : `${expMin} to ${expMax}`
                warn(`The function call "${port.name}" is receiving ${received.length} parameters instead of the expected ${count}`, node, port)
                return
            }

            expected.forEach((ex: any, index: number) => {
                const expectedType = returnTypes.find((rt: any) => ex.trim().startsWith(rt)) || node.extras?.returnType
                const re = received[index]

                if (ex.includes('=') && !re) {//uses default value

                } else {
                    const receivedType = returnTypes.find((rt: any) => re.startsWith(rt))

                    if (expectedType !== receivedType) {
                        warn(`The function call "${port.name}" expects its ${ordinals[index]} parameter to be of type "${expectedType}", received "${receivedType}" instead`, node, port)
                    }
                }
            })

            if (node?.instance) {
                add(node.instance
                    + '.'
                    + port.name.substring(port.name.indexOf(' ') + 1, port.name.indexOf('('))
                    + '('
                    + formattedParameters(params)
                    + ')'
                    + ';');
            } else if (fromNode?.instance) {
                add(fromNode.instance + '.' + (fromPort.name) + '();');
            } else if (port.name.startsWith('void setValue')) {
                let variableParams = formattedParameters(params)

                // variableParams = variableParams.split(',')
                // console.log('adding', node.extras.name, variableParams)
                add(node.extras.name + ' = ' + variableParams)
            } else if (node.extras.type === 'built-in') {
                add(port.name.substring(port.name.indexOf(' ') + 1, port.name.indexOf('('))
                    + '('
                    + formattedParameters(params)
                    + ') '
                    + ';');
            } else if (node.extras.type === 'logic') {
                add(node.extras.value)
            } else {
                console.log('confusion at ', port, node, fromNode)
                add('confusion')
                // warn('Loose connection', [fromNode]);
            }
            // try {
            //     if (node.extras.type === 'constant') {
            //         contents.push(node.extras.name);
            //     } else {
            //         contents.push(node.extras.value);
            //     }
            // } catch (error) {
            //     console.log('error, no parameter?');
            // }
            // node.ports.forEach((port: any) => {
            //     port.links.forEach((l: any) => {
            //         const link = getLink(l);
            //         const toPort = getPort(link.target, link.targetPort);
            //         const toNode = getNode(toPort?.parentNode);
            //         if (!toNode) {
            //         } else if (toNode?.id === node?.id) { //skip as it is the previous link
            //             if (toNode.instance) {
            //                 add(toNode.instance + '.' + toPort.name.split("(").shift() + '(' + contents + ');');
            //             }
            //         } else if (toNode?.extras?.type === 'built-in') {
            //             add(toPort.name.split("(").shift() + '(' + contents + ');');
            //         } else if (!toNode?.instance) { //points to another variable/port
            //             callWithParameters(toNode, ...extrass);
            //         } else { //points to a class instance, we hope it is a method call
            //             //todo: check for parameter type and numbers
            //             add(toNode.instance + '.' + (toPort.name.split("(").shift()) + '(' + contents + ');');
            //         }
            //     });
            // });
        }
        // function getCoditionalValue(conditionNode: any, portName: any): string {
        //     try {
        //         let linkID = conditionNode.ports.find((p: any) => p.name === portName).links[0];
        //         let link = getLink(linkID);
        //         let port = getPort(link.source, link.sourcePort);
        //         let parent = getParent(port);

        //         if (['variable', 'port'].includes(parent.extras.type)) {
        //             return parent.extras.value;
        //         }
        //         else if (['component'].includes(parent.extras.type)) {
        //             return parent.instance + '.' + port.name;
        //         } else {
        //             return add('Unknown extras.type');
        //         }
        //     } catch (error) {
        //         return '/* Lacking Value */';
        //     }
        // }
        // function getOutcome(conditionNode: any, ifThis = 'True') {
        //     try {
        //         let linkID = conditionNode.ports.find((p: any) => p.name === ifThis).links[0];
        //         let link = getLink(linkID);
        //         return getPort(link.target, link.targetPort);
        //     } catch (error) {
        //         return { label: '// Lacking Outcome' };
        //     }
        // }

        const link = getLink(l); if (!link) return
        const fromPort = getPort(link.source, link.sourcePort);
        const fromNode = getNode(fromPort.parentNode);
        const toPort = getPort(link.target, link.targetPort); if (!toPort) return
        const toNode = getNode(toPort.parentNode);

        const params: any[] = []
        if (paramTypes.includes(toNode?.extras?.type)) {
            params.push(toNode)

            let nextFromPort = getOutPort(toPort); if (!nextFromPort) return
            let nextLink = getLink(nextFromPort.links[0]); if (!nextLink) return
            let nextToPort = getPort(nextLink.target, nextLink.targetPort); if (!nextToPort) return
            let nextToNode = getNode(nextToPort.parentNode)

            while (paramTypes.includes(nextToNode?.extras?.type && nextToPort.label.startsWith('void setValue'))) {
                params.push(nextToNode)

                nextFromPort = getOutPort(nextToPort); if (!nextFromPort) return
                nextLink = getLink(nextFromPort.links[0]); if (!nextLink) return
                nextToPort = getPort(nextLink.target, nextLink.targetPort); if (!nextToPort) return
                nextToNode = getNode(nextToPort.parentNode)
            }

            // console.log('going to call', nextToPort.name)
            // console.log('with the following params', params.map((p: any) => p.extras.value))
            callWithParameters(nextToPort, params)
        } else { //is a component or function?
            callWithParameters(toPort, params)

        }

        // if (toNode?.extras?.type === 'built-in') {
        //     add(toPort.name + '()');
        // } else if (toNode?.name === "Function") {
        //     add(toNode.extras.value, '(', ');');
        // } else if (toNode?.name === "Condition") {
        //     const xValue = getCoditionalValue(toNode, 'x');
        //     const yValue = getCoditionalValue(toNode, 'y');

        //     const outcome2 = getOutcome(toNode);
        //     const toNode2 = getParent(outcome2);

        //     const outcome3 = getOutcome(toNode, 'False');
        //     const toNode3 = getParent(outcome3);

        //     add('if (', xValue, ' ' + toNode.extras.value + ' ', yValue, ') {');
        //     if (toNode2) {
        //         callWithParameters(toNode2);
        //     } else {
        //         add('/* Lacking code to be executed if conditional is true */');
        //     }
        //     if (toNode3) {
        //         add('} else {');
        //         callWithParameters(toNode3);
        //     }
        //     add("}\n");
        // } 
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



    // #endregion


    // #region Shared Variables
    let code = ''
    const problems: any[] = []

    const links: any[] = getLinksFromModel(model)
    const nodes: any[] = getNodesFromModel(model)
    const logics: any[] = nodes.filter(node => node.extras?.type === 'logic')
    const components: any[] = getComponentsFromNodes(nodes)
    const controller = nodes.find(node => node.extras?.type === 'controller')
    const constants: any[] = nodes.filter(node => node.extras?.type === 'constant').map((constant) => {
        constant.extras.name = constant.extras.name.toUpperCase()
        return constant
    })
    const variables: any[] = nodes.filter(node => node.extras?.type === 'variable')

    const usedDigital: any[] = [...new Set(nodes.filter(node => node.extras?.portType === 'Digital'))]
    const usedAnalog: any[] = [...new Set(nodes.filter(node => node.extras?.portType === 'Analog'))]
    // #endregion



    // #region Generator Lifecycle
    console.log('----- Starting Code Generation -----')
    addHeaderComments()
    warnAboutNumberOfControllers()
    warnAboutPortUsage()
    warnAboutNodesWithoutLinks(nodes)
    warnAboutMultipleUsePorts(nodes)
    warnAboutLooseLinks(links)
    addLibraries()
    addFunctionDeclarations(logics.filter(l => l.name === 'Function'))
    addConstantDeclarations(constants)
    addVariableDeclarations(variables)
    addLifecycleMethods()
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
        ({ code, problems } = generateCode(JSON.parse(model)))
        console.log('p', problems)
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
                        if (p.node?.id) {
                            const el = document.querySelector(`[data-nodeid='${p.node.id}']`)
                            if (el) el.setAttribute('id', p.node.id)
                        }
                        const problemId = p.node ? 'problem-' + p.node.id + index : 'problem-nodeless' + index

                        let nodes: any[] = []
                        let links: any[] = []
                        if (p.node) {
                            ({ nodes, links } = processDynamic(p.node, 0, false, p.port))
                        }

                        return <div id={problemId} key={problemId} style={{ fontSize: '0.6em', border: 'solid white 1px' }}>
                            Model violation: {p.message}
                            {p.node &&
                                <Fragment>
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
                                                linkdata={links} nodedata={nodes} arrangement='horizontal' />
                                        </div>
                                    </ReactTooltip>
                                </Fragment>
                            }

                            {p.node && <div key={index} style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                                <Xarrow
                                    strokeWidth={2}
                                    start={problemId}
                                    end={p.node.id}
                                    color='yellow'
                                />
                            </div>
                            }
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