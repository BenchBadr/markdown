import { useState } from "react";
import TokenToHtml from "../../render";

const Title = ({child, level, content}) => {
  const [toggle, setToggle] = useState(true);
  const Tag = `h${level}`;
  return ( 
  <>
    <Tag className={`arrowBefore`}>
      <span onClick={() => setToggle(!toggle)} className="arrow">
        <a className={`material-icons ${toggle ? 'active' : ''}`}>expand_more</a>
      </span>
      <TokenToHtml tokens={content}/>
    </Tag>
    {child && toggle ? <TokenToHtml tokens={child} /> : ''}
  </>
  );
}

export default Title;