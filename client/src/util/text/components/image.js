import { useState, useEffect } from "react";

const CustomImage = ({ alt, src, title }) => {
    const [isClicked, setClicked] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        if (zoom) {
          setOffset((prevOffset) => ({
            x: prevOffset.x + event.movementX,
            y: prevOffset.y + event.movementY,
          }));
        }
      };
  
      if (zoom) {
        window.addEventListener('mousemove', handleMouseMove);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, [zoom]);
  
    const handleChange = (event) => {
      if (isClicked && !event.target.closest('#modal') || !isClicked) {
      setClicked(!isClicked);
      setZoom(isClicked && zoom)
      if (!isClicked){
        setOffset({ x: 0, y: 0 });
      }
    }
    };
  
  
      return (
        <>
        <div className={`background-confirmation-img ${isClicked ? 'img-zoom' : 'reverse-img'}`} onClick={handleChange}>
          <div id='modal' style={{maxWidth:'100%',width:'auto', maxHeight:'80vh', transitionDuration:'0', cursor:zoom ? 'zoom-out' : 'zoom-in',transform:!zoom ? 'none' : `scale(2) translate(${offset.x}px, ${offset.y}px)`}} onClick={() => setZoom(!zoom)}>
          <img src={src} alt={alt} title={title} style={{cursor:'pointer', width:'100%', height:'100%'}}
          onError={(e) => {
            e.target.style.display='none';
          }}
          >
          </img>
          <div style={{color:'white'}} dangerouslySetInnerHTML={{ __html:alt.replaceAll('\n','<br><br>')}} ></div>
          </div>
        </div>
        <div className="center" onClick={handleChange}><img src={src} alt={alt} title={title} id='modal' style={{cursor:'pointer'}}
        onError={(e) => {
          e.target.style.display='none';
        }}
        />
        </div>
        </>
      );
  };

export default CustomImage;