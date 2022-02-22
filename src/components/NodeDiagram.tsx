
export default function NodeDiagram(props: { node: any }) {
    return <>
        <div style={{ maxWidth: '400px', border: 'solid', fontSize: '.9em', color: 'black', margin: '60px 0px 25px 0', backgroundColor: 'lightgrey' }}>
            <div style={{ width: '100%', borderBottom: 'solid 3px', fontSize: '1.2em' }}>
                {props.node.name}
            </div>

            {props.node.extras.library &&
                <div style={{ width: '100%', borderBottom: 'solid 2px' }}>
                    Library={props.node.extras.library}
                </div>
            }
            {props.node.ins && props.node.ins.length > 0 &&
                props.node.ins.map((port: any) => {
                    return <div key={port}>
                        <p>{port}</p>
                    </div>
                })
            }
            {props.node.outs && props.node.outs.length > 0 &&
                props.node.outs.map((port: any) => {
                    return <div key={port}>
                        <p>{port}</p>
                    </div>
                })
            }
        </div>
    </>
}