
const startDelta = 1000
const endDelta = 2000
const controllerDelta = 3000
const methodDelta = 4000




export function transformAllIntoMethods(node: any) {
    let methods: any[] = []
    node.methods?.forEach((method: any) => {
        methods.push({ name: method, visibility: 'public' })
    });
    node.ins?.forEach((method: any) => {
        methods.push({ name: method, visibility: 'public' })
    });
    node.outs?.forEach((method: any) => {
        methods.push({ name: method, visibility: 'public' })
    });
    return methods
}





export function processDynamic(node: any, index: number) {
    let nodes: any[] = []
    let links: any[] = []


    nodes.push({ key: index + controllerDelta, name: 'MicroController' })
    links.push({
        key: index + controllerDelta,
        from: index + startDelta,
        to: index + controllerDelta,
        relationship: "state"
    })
    nodes.push({ key: index + startDelta, category: "Start" })

    transformAllIntoMethods(node).forEach((method, methodIndex) => {
        console.log('found method', method)
        links.push({
            key: index + startDelta + methodIndex * methodDelta,
            from: index + controllerDelta,
            to: index, text: method.name,
            relationship: "state"
        })
    });
    nodes.push({
        key: index,
        name: node.name,
    })
    links.push({
        key: index + endDelta,
        from: index,
        to: index + endDelta,
        relationship: "state"
    })
    nodes.push({ key: index + endDelta, category: "End" })

    return { nodes, links }
}