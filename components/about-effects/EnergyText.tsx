

import React, { useRef, ReactNode } from 'react'
import gsap from 'gsap'

const EnergyText = ({ children }: { children: ReactNode }) => {
    const targetRef = useRef<HTMLElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleHover = (isEntering: boolean) => {
        if (!targetRef.current) return
        const target = targetRef.current

        if (isEntering) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            gsap.to(target, {
                x: () => Math.random() * 10,
                y: () => Math.random() * 10,
                scale: 1.05,
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            })
        } else {
            timeoutRef.current = setTimeout(() => {
                gsap.to(target, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: 'power1.out',
                    onComplete: () => {
                        gsap.killTweensOf(target)
                    },
                })
            }, 1000)
        }
    }

    return (
        <div className="relative inline-block" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
            <strong ref={targetRef} className="energy inline-block">
                {children}
            </strong>
        </div>
    )
}

export default EnergyText
