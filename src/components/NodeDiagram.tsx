export default function NodeDiagram(props: { node: any, canEdit?: boolean }) {
    const { node, canEdit } = props
    const myInput = (all: string) => {
        if (canEdit)
            return <input type="text" id={all} name={all} value={all} ></input>
        return all
    }

    return <>
        <div style={{ maxWidth: '400px', border: 'solid', fontSize: '.9em', color: 'black', margin: '60px 0px 25px 0', backgroundColor: 'lightgrey' }}>
            <div style={{ width: '100%', borderBottom: 'solid 3px', fontSize: '1.2em' }}>
                {myInput(node.name)}
            </div>

            {node.extras.library &&
                <div style={{ width: '100%', borderBottom: 'solid 2px' }}>
                    Library={node.extras.library}
                </div>
            }
            {node.ins && node.ins.length > 0 &&
                node.ins.map((port: any) => {
                    return <div key={port}>
                        <p>{myInput(port)}</p>
                    </div>
                })
            }
            {node.outs && node.outs.length > 0 &&
                node.outs.map((port: any) => {
                    return <div key={port}>
                        <p>{myInput(port)}</p>
                    </div>
                })
            }
        </div>
    </>
}