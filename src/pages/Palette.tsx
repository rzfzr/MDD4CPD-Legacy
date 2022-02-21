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
        <div className="Code">
            <pre >
                <code className="language-clike">{JSON.stringify(paletteNodes, null, "\t")}</code>
            </pre>
        </div>
    </div>
}