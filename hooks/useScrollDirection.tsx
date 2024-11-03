import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCallback, useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger)

interface ScrollInfo {
    direction: 'up' | 'down' | null | undefined
    isAtPageBottom: boolean
    isInitialLoad: boolean
}

export default function useScrollDirection() {
    const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
        direction: null,
        isAtPageBottom: false,
        isInitialLoad: true,
    })

    const handleScroll = useCallback((direction: undefined | 'up' | 'down') => {
        const scrollY = window.pageYOffset
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const isAtPageBottom = Math.abs(scrollY - maxScroll) < 50 // 50px threshold

        setScrollInfo((prevInfo) => {
            if (prevInfo.direction !== direction || prevInfo.isAtPageBottom !== isAtPageBottom || prevInfo.isInitialLoad) {
                return { direction, isAtPageBottom, isInitialLoad: false }
            }
            return prevInfo
        })
    }, [])

    useEffect(() => {
        const trigger = ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => handleScroll(self.direction === -1 ? 'up' : 'down'),
        })

        // Trigger the handleScroll function once to update the initial state
        handleScroll(undefined)

        return () => {
            trigger.kill()
        }
    }, [handleScroll])

    return scrollInfo
}
