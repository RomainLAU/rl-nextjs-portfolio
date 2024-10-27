import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import LinkButton from './linkButton';

export default function HorizontalScrollingContainer({ list, title, CardComponent }: { list: any[]; title: string; CardComponent: React.ComponentType<any> }) {
    const locale = useRouter().locale
    const scrollRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const ghostRef = useRef<HTMLDivElement>(null)
    const [scrollRange, setScrollRange] = useState(0)
    const [viewportW, setViewportW] = useState(0)

    useEffect(() => {
        if (scrollRef.current) {
            setScrollRange(scrollRef.current.scrollWidth)
        }
    }, [scrollRef, containerRef])

    const onResize = useCallback(() => {
        setViewportW(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        onResize()
        return () => window.removeEventListener('resize', onResize)
    }, [onResize])

    const { scrollYProgress } = useScroll()
    const containerPosition = containerRef?.current?.getBoundingClientRect().y ?? 0
    const containerHeight = containerRef?.current?.getBoundingClientRect().height ?? 0
    const yTransform = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, -containerPosition, -containerPosition, -containerHeight])
    const xTransform = useTransform(scrollYProgress, [0.07, 1], [0, (-scrollRange + viewportW) * 1.2])
    const ySpring = useSpring(yTransform, { damping: 15, mass: 0.27, stiffness: 35 })
    const xSpring = useSpring(xTransform, { damping: 15, mass: 0.27, stiffness: 35 })

    return (
        <>
            <h1 className='font-extrabold text-8xl ml-[190px+10dvh] mb-8'>{title}</h1>
            <motion.div ref={containerRef} className='fixed left-0 right-0 will-change-transform' style={{ y: ySpring }}>
                <motion.section ref={scrollRef} className='relative h-screen max-h-screen w-max flex items-center px-[100px]' style={{ x: xSpring }}>
                    <div className='relative flex gap-x-96'>
                        {list &&
                            list
                                .toSorted((elementA, elementB) => ((elementA.finished_at ?? 0) < (elementB.finished_at ?? 0) ? 1 : -1))
                                .map((element: any) => <CardComponent key={`experience-${element.id}`} element={element} />)}
                    </div>
                </motion.section>
            </motion.div>
            <div ref={ghostRef} style={{ height: scrollRange }} className='ghost' />
            <motion.div id='contact' layout layoutRoot className='relative h-screen w-screen'>
                <motion.div className='w-1/4 sticky left-1/2 top-1/2 transform -translate-x-1/2'>
                    <LinkButton text={locale === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
                </motion.div>
            </motion.div>
        </>
    )
}
