import React, { useEffect, useRef, useContext, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import CopyWrapper from '../CopyWrapper';
import MathContext from './MathContext';

const Math = ({ formula, block = false }) => {
    const formulaRef = useRef(null);
    const {macros, setMacros} = useContext(MathContext);

    useEffect(() => {
        if (formulaRef.current) {
            const newcommandRegex = /\\newcommand\*?\{(.*?)\}\{(.*?)\}/g;
            const matches = Array.from(formula.matchAll(newcommandRegex));
            const tempMatches = {...macros}
            for (const match of matches){
                const alias = '\\'+match[1];
                const command = match[2];
                tempMatches[alias] = command;
            }
            setMacros(tempMatches)
        }
    }, [formula]);


    useEffect(() => {
        if (formulaRef.current) {
            katex.render(formula, formulaRef.current, {
                throwOnError: false,
                displayMode: block,
                macros: macros
            });
        }
    }, [formula, macros]);


    return (
        <CopyWrapper textToCopy={formula}>
            <span ref={formulaRef} style={{ display: block ? 'block' : 'inline', textAlign: block ? 'center' : 'left' }}>
            </span>
        </CopyWrapper>
    );
};

export default Math;