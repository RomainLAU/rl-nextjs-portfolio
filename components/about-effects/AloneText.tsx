'use client'

import React, { useRef, useEffect, ReactNode } from 'react'

const AloneText = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return
            const element = ref.current
            const rect = element.getBoundingClientRect()
            const distanceX = e.clientX - (rect.left + rect.width / 2)
            const distanceY = e.clientY - (rect.top + rect.height / 2)
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

            const maxDistance = 200
            const minDistance = 50

            if (distance < maxDistance) {
                const factor = Math.min(1, (maxDistance - distance) / (maxDistance - minDistance))
                let moveX = -distanceX * factor
                let moveY = -distanceY * factor
                moveX = Math.max(-rect.left, Math.min(moveX, window.innerWidth - rect.right))
                moveY = Math.max(-rect.top, Math.min(moveY, window.innerHeight - rect.bottom))
                element.style.transform = `translate(${moveX}px, ${moveY}px)`
            } else {
                element.style.transform = 'translate(0, 0)'
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <strong ref={ref} className="alone inline-block">
            {children}
        </strong>
    )
}

export default AloneText
