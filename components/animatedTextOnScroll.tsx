'use client'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { RefObject, useEffect, useRef } from 'react';

import useIsMobile from '@/hooks/useIsMobile';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimatedTextProps {
    text: string
    customScroller?: string
    containerRef?: RefObject<HTMLDivElement>
}

const ANIMATION_DELAY = 100
const INITIAL_OPACITY = 0.2
const WORD_STAGGER = 0.03
const ANIMATION_DURATION = 0.3

const getScrollTriggerConfig = (trigger: HTMLElement | null, scroller: string | Window, isMobile: boolean) => ({
    scroller,
    trigger,
    start: isMobile ? 'top bottom' : 'center bottom',
    end: 'bottom center',
    scrub: 1.5,
    invalidateOnRefresh: true,
})

const createWordAnimation = (timeline: gsap.core.Timeline, word: Element, index: number) => {
    timeline.fromTo(
        word,
        { opacity: INITIAL_OPACITY },
        {
            opacity: 1,
            duration: ANIMATION_DURATION,
            ease: 'power2.in',
        },
        index * WORD_STAGGER
    )
}

export default function AnimatedTextOnScroll({ text, customScroller, containerRef }: ScrollAnimatedTextProps) {
    const isMobile = useIsMobile() ?? true
    const textContainerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        const container = textContainerRef.current
        if (!container) return

        const words = container.querySelectorAll('.word')
        if (!words.length) return

        const setupAnimation = () => {
            timelineRef.current = gsap.timeline({
                scrollTrigger: getScrollTriggerConfig(container, customScroller || window, isMobile),
            })

            words.forEach((word, index) => createWordAnimation(timelineRef.current!, word, index))
        }

        const cleanupAnimation = () => {
            timelineRef.current?.scrollTrigger?.kill()
            timelineRef.current?.kill()
        }

        const timeout = setTimeout(() => {
            setupAnimation()
            ScrollTrigger.refresh()
        }, ANIMATION_DELAY)

        if (containerRef?.current) {
            const resizeObserver = new ResizeObserver(() => {
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh()
                })
            })
            resizeObserver.observe(containerRef.current)

            return () => {
                clearTimeout(timeout)
                cleanupAnimation()
                resizeObserver.disconnect()
            }
        }

        return () => {
            clearTimeout(timeout)
            cleanupAnimation()
        }
    }, [customScroller, isMobile, containerRef])

    return (
        <div ref={textContainerRef} className='text-white text-xl font-light leading-10 tracking-widest'>
            {text.split(' ').map((word, index) => (
                <span key={index} className='word inline-block mr-2'>
                    {word}
                </span>
            ))}
        </div>
    )
}
