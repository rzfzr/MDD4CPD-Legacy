import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default function Code(props: { code: string, language: string }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="Code">
            <pre>
                <code className={`language-${props.language}`}>{props.code}</code>
            </pre>
        </div>
    );
}