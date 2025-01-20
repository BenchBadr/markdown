import React from "react";
import Math from "./components/math";

const TokenToHtml = (tokens) => {
  const queue = Object.keys(tokens);
  let elements = [];
  let temp;
  let i = 0;
  for (const [key, value] of Object.entries(tokens.tokens)){
      const current = value
      i++
      queue.shift()
      const child = current.content ? <TokenToHtml tokens={current.content}/> : null
      switch(current.type){
        // block - inline
        case 'h1':
          temp = <h1>{child}</h1>;
          console.log(temp)
          break;

        // inline - wrapper
        case 'paragraph':
          temp = <p>{child}</p>;
          break

        // inline - style
        case 'bold':
          temp = <b>{child}</b>;
          break;
        case 'underline':
          temp = <u>{child}</u>;
          break;
        case 'italic':
          temp = <i>{child}</i>;
          break;
        // inline - no heritance
        case 'code':
          temp = <code>{current.content}</code>;
          break;
        case 'inlineMath':
          temp = <Math formula={current.content} block={false} />;
          break;
        // inline - default
        case 'text':
          temp = <a>{current.content}</a>;
          break;
        // default case
        default:
          temp = <a style={{color:'red'}}>{child}</a>
          break
      }
      console.log('temp2',temp)
      elements.push(temp);
  }
  // console.log('elements',elements)
  return <>{elements && elements.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}</>;

}

export default TokenToHtml;