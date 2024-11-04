import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

const hoverElements = ['A', 'BUTTON']

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.3, ease: 'power2.out' })
        const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.3, ease: 'power2.out' })
        const scaleXTo = gsap.quickTo(cursorRef.current, 'scaleX', { duration: 0.3, ease: 'power2.out' })
        const scaleYTo = gsap.quickTo(cursorRef.current, 'scaleY', { duration: 0.3, ease: 'power2.out' })

        const handleMouseMove = (event: MouseEvent) => {
            xTo(event.clientX)
            yTo(event.clientY)
        }

        const handleMouseOver = (event: MouseEvent) => {
            if (hoverElements.includes((event.target as HTMLElement).tagName)) {
                scaleXTo(1.5)
                scaleYTo(1.5)
            }
        }

        const handleMouseOut = (event: MouseEvent) => {
            if (hoverElements.includes((event.target as HTMLElement).tagName)) {
                scaleXTo(0.5)
                scaleYTo(0.5)
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
        <div
            ref={cursorRef}
            className={`hidden sm:block fixed w-10 h-10 rounded-full pointer-events-none mix-blend-difference z-50`}
            style={{
                transform: 'translate(-50%, -50%) scale(0.5, 0.5)',
                willChange: 'transform',
                backgroundColor: '#ffffff',
            }}
        />
    )
}
