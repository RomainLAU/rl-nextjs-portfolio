'use client'

import type React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'

import useIsMobile from '@/hooks/useIsMobile'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimatedTextProps {
    text: string
    customScroller?: string
}

const AnimatedTextOnScroll: React.FC<ScrollAnimatedTextProps> = ({ text, customScroller }) => {
    const isMobile = useIsMobile() ?? true
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const words = containerRef.current.querySelectorAll('.word')
        const tl = gsap.timeline({
            scrollTrigger: {
                scroller: customScroller || window,
                trigger: containerRef.current,
                start: isMobile ? 'top bottom' : 'center bottom',
                end: 'bottom center',
                scrub: 1.5,
            },
        })

        words.forEach((word, index) => {
            tl.fromTo(
                word,
                { opacity: 0.3 },
                {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.in',
                },
                index * 0.03
            )
        })

        return () => {
            tl.kill()
        }
    }, [text, customScroller, isMobile])

    return (
        <div ref={containerRef} className='text-white text-xl leading-10 tracking-widest'>
            {text.split(' ').map((word, index) => (
                <span key={index} className='word inline-block mr-2'>
                    {word}
                </span>
            ))}
        </div>
    )
}

export default AnimatedTextOnScroll
