import React, { useEffect, useRef, useContext } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import CopyWrapper from '../CopyWrapper';
import MathContext from './MathContext'; 

const Math = ({ formula, block = false }) => {
    const formulaRef = useRef(null);
    const context = useContext(MathContext);

    if (!context) {
        throw new Error("Math component must be used within a MathProvider");
    }
    
    const { macros } = context;

    useEffect(() => {
        if (formulaRef.current) {
            katex.render(formula, formulaRef.current, {
                throwOnError: false,
                displayMode: block,
                macros: macros 
            });
        }
    }, [formula, block, macros]);

    return (
        <CopyWrapper textToCopy={formula}>
            <span ref={formulaRef} style={{ display: block ? 'block' : 'inline', textAlign: block ? 'center' : 'left' }}>
            </span>
        </CopyWrapper>
    );
};

export default Math;