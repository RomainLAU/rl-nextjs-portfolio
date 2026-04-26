

import React, { useRef, ReactNode } from 'react'

const RotatingText = ({ children, variant = 'whiteBackground' }: { children: ReactNode, variant?: 'whiteBackground' | 'blackBackground' }) => {
    const strongRef = useRef<HTMLElement>(null)

    const handleHover = (isEntering: boolean) => {
        if (!strongRef.current) return
        const strong = strongRef.current
        if (isEntering) {
            strong.style.transform = 'rotate3d(0, 1, 1, 0.2rad)'
            strong.style.backgroundColor = variant === 'whiteBackground' ? '#1f1f1f' : 'white'
            strong.style.color = variant === 'whiteBackground' ? 'white' : '#1f1f1f'
        } else {
            strong.style.transform = 'none'
            strong.style.backgroundColor = variant === 'whiteBackground' ? 'white' : '#1f1f1f'
            strong.style.color = variant === 'whiteBackground' ? '#1f1f1f' : 'white'
        }
    }

    return (
        <div 
            className="rotationHover inline-block" 
            onMouseEnter={() => handleHover(true)} 
            onMouseLeave={() => handleHover(false)}
        >
            <strong
                ref={strongRef}
                className={`${variant} text-xl md:text-9xl`}
                style={{ display: 'inline-block', transition: 'all 0.5s ease-in-out', pointerEvents: 'none' }}
            >
                {children}
            </strong>
        </div>
    )
}

export default RotatingText
