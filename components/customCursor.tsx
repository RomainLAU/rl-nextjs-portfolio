import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHoveringLink, setIsHoveringLink] = useState(false)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({ x: event.clientX, y: event.clientY })
        }

        const handleMouseOver = (event: MouseEvent) => {
            if ((event.target as HTMLElement).tagName === 'A') {
                setIsHoveringLink(true)
            }
        }

        const handleMouseOut = (event: MouseEvent) => {
            if ((event.target as HTMLElement).tagName === 'A') {
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
        }
    }, [])

    return (
        <motion.div
            className={`fixed w-5 h-5 rounded-full pointer-events-none mix-blend-difference z-50`}
            style={{
                top: 0,
                left: 0,
                x: position.x,
                y: position.y,
                translateX: '-50%',
                translateY: '-50%',
                willChange: 'transform',
            }}
            animate={{
                x: position.x,
                y: position.y,
                scale: isHoveringLink ? 3 : 1,
                backgroundColor: isHoveringLink ? 'rgba(255, 255, 255, 0.9)' : 'rgb(255, 255, 255, 1)',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        />
    )
}
