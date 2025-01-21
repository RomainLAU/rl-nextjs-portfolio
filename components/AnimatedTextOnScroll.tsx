'use client'

import type React from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimatedTextProps {
    text: string
}

const AnimatedTextOnScroll: React.FC<ScrollAnimatedTextProps> = ({ text }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const words = containerRef.current.querySelectorAll('.word')
        const tl = gsap.timeline({
            scrollTrigger: {
                scroller: '.experience-modal',
                trigger: containerRef.current,
                start: 'center bottom',
                end: 'bottom center',
                scrub: 0.3,
            },
        })

        words.forEach((word, index) => {
            tl.fromTo(
                word,
                { opacity: 0.3 },
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power1.inOut',
                },
                index * 0.05
            )
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [text])

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
