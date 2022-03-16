import GoClass from "../components/GoClass";
import paletteNodes from "../paletteNodes";

export default function ModelsPage() {

    const defaultNodes: any[] = [
        { key: -1, name: 'MicroController' },
        { key: -2, name: 'Arduino' },
        { key: -3, name: 'Component' },
    ]


    let nodesStatic: any[] = defaultNodes
    let linksStatic: any[] = []
    let nodesDynamic: any[] = defaultNodes
    let linksDynamic: any[] = []


    paletteNodes.forEach((node, index) => {
        let methods: any[] = []
        node.ins?.forEach(method => {
            methods.push({ name: method, visibility: 'public' })
        });
        node.outs?.forEach(method => {
            methods.push({ name: method, visibility: 'public' })
        });
        nodesStatic.push(
            {
                key: index,
                name: node.name,
                methods: methods
                // properties:
            }
        )

    });




    linksStatic.push({ key: -2, from: -2, to: -1, relationship: "generalization" })
    linksStatic.push({ key: -3, from: -3, to: -1, relationship: "generalization" })
    paletteNodes.forEach((node, index) => {
        if (node.extras.type === 'controller') {
            linksStatic.push({ key: index, from: index, to: -2, relationship: "generalization" })
        }
    });

    return <>
        <GoClass linkdata={linksStatic} nodedata={nodesStatic} />
        <GoClass linkdata={linksDynamic} nodedata={nodesDynamic} />
    </>
}