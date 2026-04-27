import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTransitionState } from '@/context/TransitionContext'

const colors = [
    '#190101', '#320101', '#630303', '#950404', '#c70505',
    '#f90606', '#fa3838', '#fb6a6a', '#fc9c9c', '#fecdcd',
    '#fee6e6', '#edf7ed', '#dbf0dc', '#b7e1b8', '#93d295',
    '#6fc372', '#4bb44f', '#3c903f', '#2d6c2f', '#1e481f',
    '#0f2410', '#081208', '#130707', '#250e0e', '#4b1b1d',
    '#70292b', '#963639', '#bb4448', '#c9696c', '#d68f91',
    '#e4b4b6', '#f1dada', '#f8eced',
]

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isTextVisible, setIsTextVisible] = useState(true)
    const [colorIndex, setColorIndex] = useState<number | null>(null)
    const { setIsTransitioning } = useTransitionState()

    useEffect(() => {
        setColorIndex(Math.floor(Math.random() * colors.length))
        
        let isWindowLoaded = document.readyState === 'complete'
        
        const handleLoad = () => {
            isWindowLoaded = true
        }
        
        if (!isWindowLoaded) {
            window.addEventListener('load', handleLoad)
        }

        const finishLoadingSequence = () => {
            // Wait 500ms at 100%, then fade out text
            setTimeout(() => {
                setIsTextVisible(false)
                
                // Wait 500ms for text to fade, then slide screen out
                setTimeout(() => {
                    setIsLoading(false)
                    setIsTransitioning(false)
                }, 500)
            }, 600)
        }

        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100

                if (prev >= 95) {
                    if (isWindowLoaded) {
                        clearInterval(interval)
                        finishLoadingSequence()
                        return 100
                    }
                    return 95 // Bloque à 95% tant que la page n'est pas techniquement chargée
                }
                
                // Si la page est déjà chargée en arrière-plan, on accélère la fin de l'animation
                if (isWindowLoaded && prev > 60) {
                    // On cap à 95 pour être sûr que le prochain "tick" déclenchera la séquence de fin 
                    return Math.min(95, prev + Math.floor(Math.random() * 15) + 5)
                }
                
                // Progression un peu "aléatoire" pour un rendu organique
                if (Math.random() > 0.85) return prev // Petites pauses aléatoires
                return Math.min(95, prev + Math.floor(Math.random() * 3) + 1)
            })
        }, 70)

        // Fallback de sécurité 
        const fallback = setTimeout(() => {
            isWindowLoaded = true
        }, 6000)

        return () => {
            clearInterval(interval)
            clearTimeout(fallback)
            window.removeEventListener('load', handleLoad)
        }
    }, [])

    if (colorIndex === null) return null

    return (
        <AnimatePresence>
            {isLoading && (
                <m.div
                    key="loading-screen"
                    initial={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 1, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'black',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <m.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            backgroundColor: colors[colorIndex],
                        }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: 'linear', duration: 0.1 }}
                    />
                    <m.h1
                        className="text-4xl md:text-7xl font-extrabold mix-blend-difference"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isTextVisible ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'relative',
                            zIndex: 10,
                            color: 'white',
                        }}
                    >
                        {progress}%
                    </m.h1>
                </m.div>
            )}
        </AnimatePresence>
    )
}
