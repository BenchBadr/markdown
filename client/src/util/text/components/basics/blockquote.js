import React from 'react';
import tokenize from '../../parser';
import TokenToHtml from '../../render';


const Blockquote = ({ content }) => {
    console.log(content)
    return (
        <blockquote>
           <TokenToHtml tokens={tokenize(content)} />
        </blockquote>
    );
};


export default Blockquote;