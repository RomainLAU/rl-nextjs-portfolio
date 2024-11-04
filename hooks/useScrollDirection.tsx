'use client'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger)

interface ScrollInfo {
    direction: 'up' | 'down' | null
    isAtPageBottom: boolean
    isAtPageTop: boolean
}

export default function useScrollDirection() {
    const pathname = usePathname()
    const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
        direction: null,
        isAtPageBottom: false,
        isAtPageTop: true,
    })
    const lastScrollY = useRef(0)
    const ticking = useRef(false)

    const handleScroll = useCallback(() => {
        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY
                const direction = scrollY > lastScrollY.current ? 'down' : 'up'
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight
                const isAtPageBottom = Math.abs(scrollY - maxScroll) < 50 // 50px threshold
                const isAtPageTop = scrollY < 50 // 50px threshold

                setScrollInfo({
                    direction,
                    isAtPageBottom,
                    isAtPageTop,
                })

                lastScrollY.current = scrollY
                ticking.current = false
            })

            ticking.current = true
        }
    }, [])

    useGSAP(() => {
        ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: handleScroll,
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [handleScroll])

    useEffect(() => {
        handleScroll() // Initial call to set correct state on page load
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    useEffect(() => {
        handleScroll() // Reset scroll info on page change
    }, [pathname, handleScroll])

    return scrollInfo
}
