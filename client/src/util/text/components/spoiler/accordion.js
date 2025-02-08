import { useState } from "react";
import './accordion.css';
import TokenToHtml from "../../render";
import tokenize from "../../parser";

const Accordion = ({ content, id, title, custom=null }) => {
    const [isChecked, setIsChecked] = useState(false);

  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    
    const special = ['tips','info','warn','check'];
    console.log(special.includes(title.toLowerCase()))
    if (special.includes(title.toLowerCase())) {
      return (
        <div className={title.toLowerCase()}>
          {content.length ? <TokenToHtml tokens={tokenize(content)} /> : ''}
        </div>
      )
    }
    return (
      <div className="accordion" style={{border:!custom ? 'current' : 'none'}}>
        <div className="tab">
          <input 
            type="checkbox" 
            name={`accordion-${id}`}
            id={`cb${id}`} 
            checked={isChecked} 
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`cb${id}`} className="tab__label reset" style={{background:custom ? 'none' : 'current', color:custom ? custom : 'current'}}>
            {title}
            <div>
              {isChecked}
              <a className='material-icons'>expand_more</a>
            </div>
          </label>
          <div className="tab__content">
            {content.length ? <TokenToHtml tokens={tokenize(content)} /> : ''}
          </div>
        </div>
      </div>
    );
  };
  

export default Accordion;