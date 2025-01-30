import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

const HOVER_ELEMENTS = ['A', 'BUTTON']
const BLACKLIST_CLASSES = ['outside']
const CURSOR_SCALE = {
    DEFAULT: 0.5,
    HOVER: 1.5,
    HIDDEN: 0,
}
const ANIMATION_CONFIG = {
    duration: 0.3,
    ease: 'power2.out',
}

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        const animations = {
            x: gsap.quickTo(cursor, 'x', ANIMATION_CONFIG),
            y: gsap.quickTo(cursor, 'y', ANIMATION_CONFIG),
            scaleX: gsap.quickTo(cursor, 'scaleX', ANIMATION_CONFIG),
            scaleY: gsap.quickTo(cursor, 'scaleY', ANIMATION_CONFIG),
        }

        const getClassName = (target: HTMLElement) => {
            return typeof target.className === 'string' ? target.className : (target.className as unknown as { baseVal: string }).baseVal
        }

        const setCursorScale = (scale: number) => {
            animations.scaleX(scale)
            animations.scaleY(scale)
        }

        const handleMouseMove = (event: MouseEvent) => {
            animations.x(event.clientX)
            animations.y(event.clientY)
        }

        const handleMouseOver = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const className = getClassName(target)

            if (HOVER_ELEMENTS.includes(target.tagName)) {
                setCursorScale(CURSOR_SCALE.HOVER)
            } else if (BLACKLIST_CLASSES.some((blacklisted) => className.includes(blacklisted))) {
                setCursorScale(CURSOR_SCALE.HIDDEN)
            }
        }

        const handleMouseOut = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const className = getClassName(target)

            if (HOVER_ELEMENTS.includes(target.tagName) || BLACKLIST_CLASSES.some((blacklisted) => className.includes(blacklisted))) {
                setCursorScale(CURSOR_SCALE.DEFAULT)
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
            className='hidden sm:block fixed w-10 h-10 rounded-full pointer-events-none mix-blend-difference z-1000'
            style={{
                transform: `translate(-50%, -50%) scale(${CURSOR_SCALE.DEFAULT}, ${CURSOR_SCALE.DEFAULT})`,
                willChange: 'transform',
                backgroundColor: '#ffffff',
            }}
        />
    )
}
