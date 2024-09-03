import '@/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navBar'
import CustomCursor from '@/components/customCursor'
import PageTransition from '@/components/pageTransition'
import { AnimatePresence, motion, useSpring, useTransform, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps, router }: AppProps) {
    const opacityVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    }

    const opacityTransition = {
        duration: 0.9,
        delay: 0.1,
        ease: 'easeOut',
    }

    const scrollRef = useRef(null)
    const { scrollY } = useScroll({ container: scrollRef })
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        mass: 1,
    })

    const y = useTransform(smoothScrollY, (value) => -value)

    useEffect(() => {
        const handleResize = () => {
            document.body.style.height = `${document.documentElement.scrollHeight}px`
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={router.route}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    variants={opacityVariants}
                    transition={opacityTransition}
                    style={{ position: 'absolute', width: '100%', height: '100dvh', y }}
                    className={`${inter.className} mt-20 p-24`}
                    ref={scrollRef}>
                    <CustomCursor />
                    <NavBar />
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
            <PageTransition />
        </>
    )
}
