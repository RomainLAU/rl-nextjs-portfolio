import { motion } from 'framer-motion';
import throttle from 'lodash.throttle';
import { useEffect, useRef, useState } from 'react';

const hoverElements = ['A', 'BUTTON']

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHoveringLink, setIsHoveringLink] = useState(false)
    const [isHoveringButton, setIsHoveringButton] = useState(false)
    const animationFrameId = useRef<number | null>(null)

    useEffect(() => {
        // Utilisation de requestAnimationFrame pour améliorer les performances
        const handleMouseMove = throttle((event: MouseEvent) => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }

            animationFrameId.current = requestAnimationFrame(() => {
                setPosition({ x: event.clientX, y: event.clientY })
                document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
                document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
            })
        }, 16) // Throttling à 60 FPS (~16 ms)

        const handleMouseOver = (event: MouseEvent) => {
            if ((event.target as HTMLElement).tagName === 'BUTTON') {
                setIsHoveringButton(true)
            } else if (hoverElements.includes((event.target as HTMLElement).tagName)) {
                setIsHoveringLink(true)
            }
        }

        const handleMouseOut = (event: MouseEvent) => {
            if ((event.target as HTMLElement).tagName === 'BUTTON') {
                setIsHoveringButton(false)
            } else if (hoverElements.includes((event.target as HTMLElement).tagName)) {
                setIsHoveringLink(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)
        window.addEventListener('mouseout', handleMouseOut)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            window.removeEventListener('mouseout', handleMouseOut)
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [])

    return (
        <motion.div
            className={`hidden sm:block fixed w-5 h-5 rounded-full pointer-events-none mix-blend-difference z-50`}
            style={{
                top: 0,
                left: 0,
                translateX: '-50%',
                translateY: '-50%',
                willChange: 'transform',
                backgroundColor: isHoveringLink ? '#ffffffe5' : '#ffffff',
            }}
            animate={{
                x: position.x,
                y: position.y,
                scale: isHoveringLink ? 3 : 1,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
    )
}
