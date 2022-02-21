import { useEffect } from "react";
import Prism from "prismjs";
import paletteNodes from "../paletteNodes";

export default function PalettePage() {
    useEffect(() => {
        Prism.highlightAll();
    }, [])
    return <div>

        {
            paletteNodes.map((node) => {
                return <div key={node.name} className="grid-container" style={{
                    display: 'grid',
                    gridTemplateColumns: ' 1fr 1fr',
                    gridGap: '20px'
                }}>
                    <pre className="grid-child ">
                        <code className="language-clike">{JSON.stringify(node, null, "\t")}</code>
                    </pre>
                    <div className="grid-child">
                        <div style={{ maxWidth: '400px', border: 'solid', fontSize: '.9em', color: 'black', margin: '60px 0px 25px 0', backgroundColor: 'lightgrey' }}>
                            <div style={{ width: '100%', borderBottom: 'solid 3px', fontSize: '1.2em' }}>
                                {node.name}
                            </div>

                            {node.extras.library &&
                                <div style={{ width: '100%', borderBottom: 'solid 2px' }}>
                                    Library={node.extras.library}
                                </div>
                            }
                            {node.ins && node.ins.length > 0 &&
                                node.ins.map((port: any) => {
                                    return <div key={port}>
                                        <p>{port}</p>
                                    </div>
                                })
                            }
                            {node.outs && node.outs.length > 0 &&
                                node.outs.map((port: any) => {
                                    return <div key={port}>
                                        <p>{port}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            )
        }

    </div>
}