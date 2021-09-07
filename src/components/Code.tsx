import { useEffect } from "react";
import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
import "./prism.css";
export default function Code(props: { code: string, language: string }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="Code">
            <pre className="line-numbers">
                <code className={`language-${props.language}`}>{props.code}</code>
            </pre>
        </div>
    );
}