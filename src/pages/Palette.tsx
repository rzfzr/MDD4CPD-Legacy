import { useEffect } from "react";
import Prism from "prismjs";
import paletteNodes from "../paletteNodes";
import NodeDiagram from "../components/NodeDiagram";

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
                    <pre >
                        <code className="language-clike">{JSON.stringify(node, null, "\t")}</code>
                    </pre>
                    <NodeDiagram node={node} />
                </div>
            }
            )
        }
    </div>
}