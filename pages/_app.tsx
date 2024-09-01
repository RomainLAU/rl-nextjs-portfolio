import '@/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navBar'
import CustomCursor from '@/components/customCursor'
import PageTransition from '@/components/pageTransition'
import { AnimatePresence, motion } from 'framer-motion'

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
                    style={{ position: 'absolute', width: '100%', height: '100dvh' }}
                    className={`${inter.className} mt-20 p-24`}>
                    <CustomCursor />
                    <NavBar />
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
            <PageTransition />
        </>
    )
}
