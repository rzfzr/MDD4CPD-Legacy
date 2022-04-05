export type Node = {
    name: string,
    color: string,
    extras: Extras,
    ins?: any[],
    outs?: any[],
    methods?: any[],
}
export type Extras = {
    group?: string,
    type: 'parameter' | 'variable' | 'controller' | 'component' | 'logic' | 'built-in-constant' | 'built-in' | 'constant' | 'port',
    library?: string,
    returnType: false | string,
    portType?: false | 'Digital' | 'Analog'
    hasUsages?: boolean,
    link?: string,
    hasUsername?: boolean,
    analogPorts?: number,
    digitalPorts?: number,
    selectableOptions?: any[],
    userName?: string,
    value?: string,
}