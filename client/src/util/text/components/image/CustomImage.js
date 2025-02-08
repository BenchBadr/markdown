import { useState, useEffect } from "react";
import './CustomImage.css' // Import CSS file

const CustomImage = ({ alt, src, title }) => {
    const [isClicked, setClicked] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (zoom) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const deltaX = event.clientX - centerX;
                const deltaY = event.clientY - centerY;
                const scaleFactor = 0.5;
                setOffset({
                    x: -deltaX * scaleFactor,
                    y: -deltaY * scaleFactor,
                });
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
        if (isClicked && !event.target.closest('#modal-zoom') || !isClicked) { // Changed id selector
            setClicked(!isClicked);
            setZoom(isClicked && zoom);
            if (!isClicked){
                setOffset({ x: 0, y: 0 });
            }
        }
    };


    return (
        <>
        <div className={`background-confirmation-img ${isClicked ? 'img-zoom' : 'reverse-img'}`} onClick={handleChange}>
            <div id='modal-zoom' className="modal-image-container" style={{cursor:zoom ? 'zoom-out' : 'zoom-in',transform:!zoom ? 'none' : `scale(2) translate(${offset.x}px, ${offset.y}px)`}} onClick={() => setZoom(!zoom)}>
            <img src={src} alt={alt} title={title} className="modal-image"
            onError={(e) => {
                e.target.style.display='none';
            }}
            >
            </img>
            <div className="modal-text" dangerouslySetInnerHTML={{ __html:alt.replaceAll('\n','<br><br>')}} ></div>
            </div>
        </div>
        <div className="center" onClick={handleChange}><img src={src} alt={alt} title={title} className='center-image'
        onError={(e) => {
            e.target.style.display='none';
        }}
        />
        </div>
        </>
    );
};

export default CustomImage;