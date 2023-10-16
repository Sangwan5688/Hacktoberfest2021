import React, { useState, useEffect } from 'react';

export default function ShakingText(props) {

    const [hovered, setHovered] = useState(false)
    const letters = props.text.split("")
    

    const handleMouseEnter = () => {
        console.log("mouse hover")
        setHovered(true)
    }

    const handleMouseLeave = () => {
        console.log("mouse leave")
        setHovered(false)
    }

    return (
        <div 
            className='shaking-text-container'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            { hovered ? (
                // Text is currently hovered
                letters.map((letter, index) => (
                    <span 
                        key={index} 
                        className={`shaking-letter shaking-text shake-${Math.floor(Math.random() * 5) + 1}`}
                        >
                        {letter}
                    </span>
                ))
            ) : (
                // text isn't hovered
                <div className="shaking-text">{ props.text }</div>
            )}
            
        </div>
        
    )
}