import React, { useState, useRef, useCallback } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useEditable } from "use-editable";

const Edit = () => {
    const editorRef = useRef(null);
    const [code, setCode] = useState(
        'function test() {}\n\nconsole.log("hello");'
    );

    const onEditableChange = useCallback((code) => {
        setCode(code.slice(0, -1));
    }, []);

    useEditable(editorRef, onEditableChange, {
        disabled: false,
        indentation: 2
    });

    return (
        <Highlight {...defaultProps} code={code} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style} ref={editorRef}>
                    {tokens.map((line, i) => (
                        <React.Fragment key={i}>
                            {line
                                .filter((token) => !token.empty)
                                .map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            {"\n"}
                        </React.Fragment>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};

export default Edit;
