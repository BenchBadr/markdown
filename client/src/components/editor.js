// Editor.jsx
import Split from 'react-split'
import { useState, useEffect } from 'react'
import './Editor.css'

const Editor = () => {
    const [isVertical, setIsVertical] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
            // Force horizontal layout on mobile
            if (window.innerWidth <= 768) {
                setIsVertical(false)
            }
        }

        // Initial check
        checkMobile()

        // Add resize listener
        window.addEventListener('resize', checkMobile)
        
        // Cleanup
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const panels = [
        // Editable panel
        <div key="edit" className="panel">
            <textarea
                className="editor-textarea"
                placeholder="Write your code here..."
            />
        </div>,
        // Preview panel
        <div key="preview" className="panel"></div>
    ]

    return (
        <div className="editor-container">
            {!isMobile && (
                <div className="button-container">
                    <button 
                        className="layout-toggle-button"
                        onClick={() => setIsVertical(!isVertical)}
                    >
                        Toggle {isVertical ? 'Horizontal' : 'Vertical'}
                    </button>
                </div>
            )}
            
            {isMobile ? (
                <div className="mobile-layout">
                    {panels}
                </div>
            ) : (
                <Split
                    className={`split-container ${isVertical ? 'vertical' : 'horizontal'}`}
                    sizes={[50, 50]}
                    minSize={200}
                    expandToMin={false}
                    gutterSize={8}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction={isVertical ? 'horizontal' : 'vertical'}
                >
                    {panels}
                </Split>
            )}
        </div>
    )
}

export default Editor