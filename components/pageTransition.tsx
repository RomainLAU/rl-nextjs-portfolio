import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const colors = [
    '#190101',
    '#320101',
    '#630303',
    '#950404',
    '#c70505',
    '#f90606',
    '#fa3838',
    '#fb6a6a',
    '#fc9c9c',
    '#fecdcd',
    '#fee6e6',
    '#edf7ed',
    '#dbf0dc',
    '#b7e1b8',
    '#93d295',
    '#6fc372',
    '#4bb44f',
    '#3c903f',
    '#2d6c2f',
    '#1e481f',
    '#0f2410',
    '#081208',
    '#130707',
    '#250e0e',
    '#4b1b1d',
    '#70292b',
    '#963639',
    '#bb4448',
    '#c9696c',
    '#d68f91',
    '#e4b4b6',
    '#f1dada',
    '#f8eced',
]

export default function PageTransition() {
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(false)
    const [colorIndex, setColorIndex] = useState(Math.floor(Math.random() * colors.length))

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setColorIndex(Math.floor(Math.random() * colors.length))
            setIsAnimating(true)
        }

        const handleRouteChangeComplete = () => {
            setTimeout(() => {
                setIsAnimating(false)
                const newColorIndex = Math.random() < 0.5 ? (colorIndex - 1 + colors.length) % colors.length : (colorIndex + 1) % colors.length
                setColorIndex(newColorIndex)
            }, 1000)
        }

        router.events.on('routeChangeStart', handleRouteChangeStart)
        router.events.on('routeChangeComplete', handleRouteChangeComplete)

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
        }
    }, [router, colorIndex])

    const transition = {
        type: 'tween',
        duration: 1,
    }

    const opacityVariants = {
        initial: { x: '-100%' },
        animate: { x: '0%' },
        exit: { x: '100%' },
    }

    return (
        <AnimatePresence mode='popLayout'>
            {isAnimating && (
                <>
                    <motion.div
                        key={`transition-out-${router.route}`}
                        variants={opacityVariants}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        transition={transition}
                        style={{
                            position: 'fixed',
                            background: colors[colorIndex],
                            width: '100vw',
                            height: '100vh',
                            top: 0,
                            zIndex: 1000,
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    )
}
