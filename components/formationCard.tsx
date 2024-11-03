'use client'

import { AnimatePresence, m, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useIsMobile from '@/hooks/useIsMobile';
import { Formation } from '@/types/formation';

gsap.registerPlugin(ScrollTrigger)

export default function FormationCard({ element }: { element: Formation }) {
    const formation = element
    const { locale } = useRouter()
    const isMobile = useIsMobile()

    const ref = useRef(null)
    const dateRef = useRef(null)
    const schoolRef = useRef<HTMLHeadingElement>(null)
    const titleRef = useRef(null)
    const tagsRef = useRef(null)

    const [paragraphFragments, setParagraphFragments] = useState<string[]>([])
    const paragraphRef = useRef<HTMLDivElement>(null)

    const isInView = useInView(ref, { once: true, amount: 0 })
    const isDateInView = useInView(dateRef, { once: isMobile === true ? true : false, amount: 0.5 })
    const isSchoolInView = useInView(schoolRef, { once: isMobile === true ? true : false, amount: 0.5 })
    const isTitleInView = useInView(titleRef, { once: isMobile === true ? true : false, amount: 0.6 })
    const isTagsInView = useInView(tagsRef, { once: isMobile === true ? true : false, amount: 0.4 })
    const isParagraphInView = useInView(paragraphRef, { once: isMobile === true ? true : false, amount: 0.5 })

    const initialTransition = {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : -30 },
        transition: { duration: 0.6, delay: 1.3 },
    }

    useLayoutEffect(() => {
        if (paragraphRef.current) {
            const text = formation.description
            const fragments = text
                .split(/(?<=\S)(\,|\.\.\.([$$$$]\.?)?|\.)(?=\s|$)/)
                .map((fragment) => fragment?.trim())
                .filter(Boolean)
            setParagraphFragments(fragments)
        }
    }, [formation.description])

    useEffect(() => {
        if (paragraphRef.current && !isParagraphInView) {
            const spans = paragraphRef.current.children
            Array.from(spans).forEach((span) => {
                ;(span as HTMLElement).style.opacity = '0'
            })
        }
    }, [isParagraphInView])

    const renderFragment = (fragment: string, index: number) => {
        const needsSpace = fragment.match(/(\,|\.\.\.([$$$$]\.?)?|\.)$/)
        return (
            <m.span
                key={index}
                style={{ display: 'inline' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isParagraphInView ? 1 : 0, y: isParagraphInView ? 0 : 10 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}>
                {fragment}
                {needsSpace && ' '}
            </m.span>
        )
    }

    const renderSchoolWord = (word: string, index: number) => {
        return (
            <m.span
                key={index}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: isSchoolInView ? 1 : 0, y: isSchoolInView ? 0 : -100 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className='block'>
                {word}
            </m.span>
        )
    }

    return (
        <AnimatePresence>
            <m.div
                ref={ref}
                {...initialTransition}
                className='w-full md:min-w-max md:h-[calc(100dvh-12rem)] shadow-md rounded-lg text-white flex flex-col md:flex-row md:items-center gap-8 md:gap-96'>
                <m.h2 ref={schoolRef} className='font-bold text-[3em] md:text-[16em] max-w-min leading-none' style={{ wordSpacing: isMobile ? '' : '440px' }}>
                    {formation.school.split(' ').map(renderSchoolWord)}
                </m.h2>
                <div className='md:h-full w-full md:w-max flex flex-col gap-y-8 justify-center'>
                    <m.p
                        ref={dateRef}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: isDateInView ? 1 : 0, y: isDateInView ? 0 : -30 }}
                        transition={{ duration: 0.6 }}
                        className='text-[3em] md:text-[calc(10dvh+12em)] font-extrabold font-[ui-monospace] leading-[normal]'>
                        {new Date(formation.started_at).toLocaleDateString(locale).replaceAll('-', '/')}
                    </m.p>
                    {isMobile && (
                        <m.p
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: isDateInView ? 1 : 0, y: isDateInView ? 0 : -30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-[3em] md:text-[calc(10dvh+12em)] leading-[normal] font-extrabold font-[ui-monospace]'>
                            {(formation.finished_at && new Date(formation.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                        </m.p>
                    )}
                    <div className='flex flex-col w-full gap-y-4'>
                        <m.p
                            ref={titleRef}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isTitleInView ? 1 : 0, y: isTitleInView ? 0 : 10 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='text-2xl md:text-4xl text-left self-start'>
                            {formation.title}
                        </m.p>
                        <m.div ref={tagsRef} className='text-xl md:text-2xl md:text-right flex-wrap flex w-full md:w-auto md:flex-nowrap gap-x-4 md:self-end'>
                            {formation.skills &&
                                formation.skills.map((skill, index) => (
                                    <m.p
                                        key={`skill-${skill.id}-${formation.title}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: isTagsInView ? 1 : 0, y: isTagsInView ? 0 : 10 }}
                                        transition={{ duration: 0.3, delay: isTagsInView ? index * 0.1 : 0 }}>
                                        {skill.title}
                                    </m.p>
                                ))}
                        </m.div>
                    </div>
                    {!isMobile && (
                        <m.p
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: isDateInView ? 1 : 0, y: isDateInView ? 0 : -30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-[3em] md:text-[calc(10dvh+12em)] leading-[normal] font-extrabold font-[ui-monospace]'>
                            {(formation.finished_at && new Date(formation.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                        </m.p>
                    )}
                </div>
                <m.div
                    ref={paragraphRef}
                    className='w-full max-w-screen md:w-[32rem] text-xl leading-10 tracking-widest md:text-[clamp(12px,calc(15%+1.5em),100px)] whitespace-break-spaces'
                    style={{
                        marginTop: formation.id % 2 === 0 ? 'auto' : '0',
                        marginBottom: !(formation.id % 2 === 0) ? 'auto' : '0',
                        opacity: isParagraphInView ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                    }}>
                    {paragraphFragments.map(renderFragment)}
                </m.div>
            </m.div>
        </AnimatePresence>
    )
}
