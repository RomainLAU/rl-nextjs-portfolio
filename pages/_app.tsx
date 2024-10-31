import '@/globals.css';

import {
    AnimatePresence, domAnimation, LazyMotion, m, useScroll, useSpring, useTransform
} from 'framer-motion';
import { Inter } from 'next/font/google';
import { useRef } from 'react';

import CustomCursor from '@/components/customCursor';
import NavBar from '@/components/navBar';
import PageTransition from '@/components/pageTransition';

import type { AppProps } from 'next/app'
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

    const currentPath = router.pathname

    return (
        <>
            <LazyMotion features={domAnimation}>
                <AnimatePresence mode='wait'>
                    <m.div
                        key={router.route}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={opacityVariants}
                        transition={opacityTransition}
                        style={{ height: currentPath !== '/' ? '100dvh' : 'auto' }}
                        className={`${inter.className} ${currentPath !== '/' && 'md:mt-20'} relative w-max sm:w-full`}>
                        <CustomCursor />
                        <NavBar />
                        <Component {...pageProps} />
                    </m.div>
                </AnimatePresence>
                <PageTransition />
            </LazyMotion>
        </>
    )
}
