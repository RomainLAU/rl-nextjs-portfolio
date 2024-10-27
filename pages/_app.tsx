import '@/globals.css';

import { AnimatePresence, m, useScroll, useSpring, useTransform } from 'framer-motion';
import { Inter } from 'next/font/google';
import { useRef } from 'react';

import CustomCursor from '@/components/customCursor';
import NavBar from '@/components/navBar';
import PageTransition from '@/components/pageTransition';

import type { AppProps } from 'next/app'
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps, router }: AppProps) {
    const scrollRef = useRef(null)
    const { scrollY } = useScroll({ container: scrollRef })
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        mass: 1,
    })

    const y = useTransform(smoothScrollY, (value) => -value)

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

    const currentPath = router.pathname

    return (
        <>
            <AnimatePresence mode='wait'>
                <m.div
                    key={router.route}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    variants={opacityVariants}
                    transition={opacityTransition}
                    style={{ height: currentPath !== '/' ? '100dvh' : 'auto', y }}
                    className={`${inter.className} ${currentPath !== '/' && 'md:mt-20 md:p-24'} relative w-max sm:w-full`}
                    ref={scrollRef}>
                    <CustomCursor />
                    <NavBar />
                    <Component {...pageProps} />
                </m.div>
            </AnimatePresence>
            <PageTransition />
        </>
    )
}
