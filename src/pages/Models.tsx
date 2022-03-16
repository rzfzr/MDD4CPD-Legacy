import GoClass from "../components/GoClass";
import paletteNodes from "../paletteNodes";

export default function ModelsPage() {

    const defaultNodes: any[] = [
        { key: -1, name: 'MicroController' },
        { key: -2, name: 'Arduino' },
        { key: -3, name: 'Component' },
    ]
    const defaultLinks: any[] = [
        { key: -2, from: -2, to: -1, relationship: "generalization" },
        { key: -3, from: -3, to: -1, relationship: "generalization" },
    ]
    let nodesStatic: any[] = [...defaultNodes]
    let linksStatic: any[] = [...defaultLinks]
    let nodesDynamic: any[] = [...defaultNodes]
    let linksDynamic: any[] = []

    paletteNodes.forEach((node, index) => {
        let methods: any[] = []
        node.ins?.forEach(method => {
            methods.push({ name: method, visibility: 'public' })
        });
        node.outs?.forEach(method => {
            methods.push({ name: method, visibility: 'public' })
        });

        let parsedNode = {
            key: index,
            name: node.name,
            methods: methods
            // properties:
        }
        if (node.extras.type === 'controller') {
            linksStatic.push({ key: index, from: index, to: -2, relationship: "generalization" })
        }

        nodesStatic.push(parsedNode)
        nodesDynamic.push({ "id": index + 250, "category": "Start" })
        nodesDynamic.push(parsedNode)
        nodesDynamic.push({ "id": index + 500, "category": "End" })

    });

    return <>
        <GoClass linkdata={linksStatic} nodedata={nodesStatic} />
        <GoClass linkdata={linksDynamic} nodedata={nodesDynamic} />
    </>
}