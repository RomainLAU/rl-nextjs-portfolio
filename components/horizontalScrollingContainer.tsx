'use client'

import { m, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef } from 'react';

import Lenis from '@studio-freight/lenis';

import LinkButton from './linkButton';

interface HorizontalScrollComponentProps<T> {
    list: any[]
    title: string
    CardComponent: React.ComponentType<any>
}

export default function HorizontalScrollComponent<T>({ list, title, CardComponent }: HorizontalScrollComponentProps<T>) {
    const { locale } = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const smoothX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const x = useTransform(smoothX, [0, 0.05, 0.95, 1], ['0%', '-5%', '-95%', '-100%'])
    const buttonOpacity = useTransform(smoothX, [0, 0.95, 1], [0, 0, 1])
    const titleOpacity = useTransform(smoothX, [0, 0.001, 0.01], [1, 0.5, 0])

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => t, // Easing linéaire
            smoothWheel: true,
            wheelMultiplier: 0.3, // Réduit la vitesse du défilement à la molette
            touchMultiplier: 0.5,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    const memoizedCards = useMemo(
        () =>
            list.map((item, index) => (
                <div key={index} className='flex-shrink-0'>
                    <CardComponent key={`experience-${item.id}`} element={item} />
                </div>
            )),
        [list, CardComponent]
    )

    return (
        <div ref={containerRef} className='h-[300vh]'>
            <motion.h1 style={{ opacity: titleOpacity }} className='fixed top-1/5 left-[3%] text-4xl font-bold'>
                {title}
            </motion.h1>

            <div className='sticky top-0 h-screen flex items-center overflow-hidden'>
                <motion.div ref={horizontalRef} style={{ x }} className='flex gap-x-96 px-10'>
                    {memoizedCards}
                </motion.div>
            </div>

            <m.div style={{ opacity: buttonOpacity }} className='w-1/4 max-w-[300px] fixed left-1/2 top-1/2 transform -translate-x-1/2'>
                <LinkButton text={locale === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
            </m.div>
        </div>
    )
}
