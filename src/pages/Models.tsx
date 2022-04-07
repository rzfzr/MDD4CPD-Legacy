import GoClass from "../components/GoClass";
import PaletteNodes from "../PaletteNodes";
import { processDynamic, getGoMethods, getGoProperties } from "../components/goBuilder"


export default function ModelsPage() {
    let nodesStatic: any[] = [
        { key: -1, name: 'MicroController' },
        { key: -2, name: 'Arduino' },
        { key: -3, name: 'Component' },
    ]
    let linksStatic: any[] = [
        { key: -2, from: -2, to: -1, relationship: "generalization" },
        { key: -3, from: -3, to: -1, relationship: "aggregation" },
        { key: -4, from: -3, to: -3, relationship: "aggregation" },
    ]
    let nodesDynamic: any[] = []
    let linksDynamic: any[] = []

    PaletteNodes.forEach((node, index) => {
        nodesStatic.push({
            key: index,
            name: node.name,
            properties: getGoProperties(node),
            methods: getGoMethods(node),
        })
        if (node.extras.type === 'controller') {
            linksStatic.push({ key: index, from: index, to: -2, relationship: "generalization" })
        } else {
            const { nodes, links } = processDynamic(node, index)
            nodesDynamic.push(...nodes)
            linksDynamic.push(...links)
        }

    });

    return <>
        <GoClass linkdata={linksStatic} nodedata={nodesStatic} arrangement='horizontal' />
        <GoClass linkdata={linksDynamic} nodedata={nodesDynamic} arrangement='vertical' />
    </>
}