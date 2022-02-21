import { useEffect } from "react";
import Prism from "prismjs";
import paletteNodes from "../paletteNodes";

export default function PalettePage() {
    useEffect(() => {
        Prism.highlightAll();
    }, [])
    return <div>
        <h3>
            Testing zone for now.
        </h3>
        <h4>
            Edits are not being saved
        </h4>

        {
            paletteNodes.map((obj) => {
                return <div key={obj.name} >
                    <pre >
                        <code className="language-clike">{JSON.stringify(obj, null, "\t")}</code>
                    </pre>
                </div>
            }
            )
        }

    </div>
}