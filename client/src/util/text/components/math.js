import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const sharedMacros = {
    // sets
    "\\C": "\\mathbb{C}",
    "\\Q": "\\mathbb{Q}",
    "\\D": "\\mathbb{D}",

    // notations
    "\\lim": "\\underset{#1}{\\text{lim}}",
};

const Math = ({ formula, block = false }) => {
    const formulaRef = useRef(null);

    useEffect(() => {
        if (formulaRef.current) {
            katex.render(formula, formulaRef.current, {
                throwOnError: false,
                displayMode: block,
                macros: sharedMacros
            });
        }
    }, [formula, block]);

    return <span ref={formulaRef} style={{ display: block ? 'block' : 'inline', textAlign: block ? 'center' : 'left' }}></span>;
};

export default Math;