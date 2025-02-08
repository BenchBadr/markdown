import React from "react";
import Math from "./components/math";
import './markdown.css';
import CustomImage from "./components/image/CustomImage";
import Accordion from "./components/spoiler/accordion";

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
        // block - block
        case 'blockMath':
          temp = <Math formula={(current.content.length !== 0 ? current.content : '').replaceAll('\n',' ')} block={true} /> ;
          break;

        case 'blockCode':
          temp = <pre><code>{current.content}</code></pre>;
          break;

        case 'details':
          temp = <Accordion content={current.content} id={key} title={current.title} />;
          break;

        case 'list':
          temp = <li>{child}</li>
          break;


        // block - inline
        case 'h1':
          temp = <h1>{child}</h1>;
          
          break;
        case 'h2':
          temp = <h2>{child}</h2>;
          
          break;

        case 'h3':
          temp = <h3>{child}</h3>;
          
          break;
  
        case 'h4':
          temp = <h4>{child}</h4>;
          
          break;
    
        case 'h5':
          temp = <h5>{child}</h5>;
          
          break;

        case 'h6':
          temp = <h6>{child}</h6>;
          
          break;
      
    
        case 'blockquote':
          temp = <blockquote>{child}</blockquote>;
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
        case 'spoilInline':
          temp = <span className='spoiler'>{child}</span>;
          break;
        // inline - no heritance
        case 'code':
          temp = <code>{current.content}</code>;
          break;
        case 'link':
          temp = <a href={current.url} target={`_blank`}>{current.content}</a>;
          break;

        case 'image':
          temp = <CustomImage src={current.url} alt={current.content} title={current.content} />;
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

      elements.push(temp);
  }
  // console.log('elements',elements)
  return <>{elements && elements.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}</>;

}

export default TokenToHtml;