import { useState } from "react";
import './accordion.css'

const Accordion = ({ content, id, title, custom=null }) => {
    const [isChecked, setIsChecked] = useState(false);

  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  
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
              <a className='material-icons-round'>expand_more</a>
            </div>
          </label>
          <div className="tab__content">
            {content}
          </div>
        </div>
      </div>
    );
  };
  

export default Accordion;