import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import CopyWrapper from './CopyWrapper';

const sharedMacros = {
    // sets
    "\\C": "\\mathbb{C}",
    "\\Q": "\\mathbb{Q}",
    "\\D": "\\mathbb{D}",
    "\\K": "\\mathbb{K}",

    // notations
    "\\lim": "\\underset{#1}{\\text{lim}}",
    "\\cases": "\\begin{cases} #1 \\end{cases}",
    "\\ifff": "\\underset{\\begin{matrix}#1\\end{matrix}}{\\iff}",
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

    return (
        <CopyWrapper textToCopy={formula}>
            <span ref={formulaRef} style={{ display: block ? 'block' : 'inline', textAlign: block ? 'center' : 'left' }}>
            </span>
        </CopyWrapper>
    );
};

export default Math;