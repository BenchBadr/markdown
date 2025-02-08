import { useState, useEffect, useRef } from "react";
import './CustomImage.css';

const CustomImage = ({ alt, src, title }) => {
    const [isClicked, setClicked] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [scrollZoom, setScrollZoom] = useState(1);
    const modalRef = useRef(null);

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

        const handleWheelZoom = (event) => {
            if (zoom) {
                event.preventDefault();
                const zoomSensitivity = 0.1;
                const delta = event.deltaY > 0 ? -zoomSensitivity : zoomSensitivity;
                setScrollZoom((prevScrollZoom) => {
                    let newScrollZoom = prevScrollZoom + delta;
                    return Math.max(1, Math.min(newScrollZoom, 5));
                });
            }
        };


        if (zoom) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('wheel', handleWheelZoom, { passive: false });
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleWheelZoom);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleWheelZoom);
        };
    }, [zoom]);

    const handleChange = (event) => {
        if (isClicked && !modalRef.current?.contains(event.target) || !isClicked) {
            setClicked(!isClicked);
            setZoom(isClicked && zoom);
            if (!isClicked){
                setOffset({ x: 0, y: 0 });
                setScrollZoom(1);
            }
        }
    };

    return (
        <>
        <div className={`background-confirmation-img ${isClicked ? 'img-zoom' : 'reverse-img'}`} onClick={handleChange}>
            <div ref={modalRef} id='modal-zoom' className="modal-image-container" style={{cursor:zoom ? 'zoom-out' : 'zoom-in', transform:!zoom ? 'none' : `scale(${2 * scrollZoom}) translate(${offset.x}px, ${offset.y}px)`}} onClick={() => setZoom(!zoom)}>
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