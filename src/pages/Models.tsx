import GoClass from "../components/GoClass";
import paletteNodes from "../paletteNodes";

export default function ModelsPage() {
    const startDelta = 1000
    const endDelta = 2000
    const controllerDelta = 3000

    let nodesStatic: any[] = [
        { key: -1, name: 'MicroController' },
        { key: -2, name: 'Arduino' },
        { key: -3, name: 'Component' },
    ]
    let linksStatic: any[] = [
        { key: -2, from: -2, to: -1, relationship: "generalization" },
        { key: -3, from: -3, to: -1, relationship: "generalization" },
    ]
    let nodesDynamic: any[] = []
    let linksDynamic: any[] = []

    paletteNodes.forEach((node, index) => {
        let methods: any[] = []
        node.methods?.forEach(method => {
            methods.push({ name: method, visibility: 'public' })
        });
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
        }


        nodesStatic.push(parsedNode)


        if (node.extras.type === 'controller') {
            linksStatic.push({ key: index, from: index, to: -2, relationship: "generalization" })
        } else {
            nodesDynamic.push({ key: index + controllerDelta, name: 'MicroController' })
            linksDynamic.push({ key: index + controllerDelta, from: index + startDelta, to: index + controllerDelta, text: "relation", relationship: "generalization" })
            nodesDynamic.push({ key: index + startDelta, category: "Start" })
            linksDynamic.push({ key: index + startDelta, from: index + controllerDelta, to: index, text: "relation", relationship: "generalization" })
            nodesDynamic.push(parsedNode)
            linksDynamic.push({ key: index + endDelta, from: index, to: index + endDelta, text: "relation", relationship: "generalization" })
            nodesDynamic.push({ key: index + endDelta, category: "End" })
        }

    });

    return <>
        <GoClass linkdata={linksStatic} nodedata={nodesStatic} />
        <GoClass linkdata={linksDynamic} nodedata={nodesDynamic} />
    </>
}