import React from "react";
import ReactDOMServer from "react-dom/server";

const TokenToHtml = (tokens) => {
  const queue = Array.isArray(tokens) ? tokens : Object.values(tokens);
  let elements = [];
  let temp;
  while (Object.keys(queue).length > 0){
      const current = queue.shift();
      switch(current.type){
        // block - inline
        case 'h1':
          temp = <h1>{current.content ? current.content.map((child) => (<TokenToHtml tokens={child}/>)) : null}</h1>;
          console.log(temp)
          break;

        // inline - inline
        case 'text':
          temp = <a>{current.content}</a>;
          break;
        case 'paragraph':
          temp = <p>{current.content ? current.content.map((child) => (<TokenToHtml tokens={child}/>)) : null}</p>;
          break;
      }
      console.log(temp)
      elements.push(temp);
  }
  // console.log('elements',elements)
  return <div>{elements && elements.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}</div>;

}

export default TokenToHtml;