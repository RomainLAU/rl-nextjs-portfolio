'use client'

import { AnimatePresence, m, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useIsMobile from '@/hooks/useIsMobile';
import { Experience } from '@/types/experience';

export default function ExperienceCard({ element }: { element: Experience }) {
    const experience = element
    const isMobile = useIsMobile()
    const { locale } = useRouter()

    const ref = useRef(null)
    const dateRef = useRef(null)
    const companyRef = useRef(null)
    const tagsRef = useRef(null)
    const [paragraphFragments, setParagraphFragments] = useState<string[]>([])
    const paragraphRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    const isInView = useInView(ref, { once: true, amount: 0 })
    const isDateInView = useInView(dateRef, { once: isMobile === true ? true : false, amount: 0.5 })
    const isCompanyInView = useInView(companyRef, { once: isMobile === true ? true : false, amount: 0.6 })
    const isTagsInView = useInView(tagsRef, { once: isMobile === true ? true : false, amount: 0.4 })
    const isParagraphInView = useInView(paragraphRef, { once: isMobile === true ? true : false, amount: 0.5 })
    const isTitleInView = useInView(titleRef, { once: isMobile === true ? true : false, amount: 0.5 })

    const initialTransition = {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : -30 },
        transition: { duration: 0.6, delay: 1.3 },
    }

    useLayoutEffect(() => {
        if (paragraphRef.current) {
            const text = experience.description
            const fragments = text
                .split(/(?<=\S)(\,|\.\.\.([$$$$]\.?)?|\.)(?=\s|$)/)
                .map((fragment) => fragment?.trim())
                .filter(Boolean)
            setParagraphFragments(fragments)
        }
    }, [experience.description])

    useEffect(() => {
        if (paragraphRef.current && !isParagraphInView) {
            // Reset the opacity of all spans when the paragraph is not in view
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

    const renderTitleWord = (word: string, index: number) => {
        return (
            <m.span
                key={index}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: isTitleInView ? 1 : 0, y: isTitleInView ? 0 : -100 }}
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
                className='flex w-full flex-col rounded-lg text-white shadow-md md:h-[calc(100dvh-12rem)] md:min-w-max md:flex-row md:items-center gap-8 md:gap-96'>
                {experience.company_logo && (
                    <div className={`w-[80vw] md:w-auto h-[40vh] md:h-full ${experience.company === 'COM4DESIGN' ? 'svg-container' : ''}`}>
                        <Image
                            src={experience.company_logo.url}
                            alt={experience.company_logo.alternativeText}
                            width={experience.company_logo.width}
                            height={experience.company_logo.height}
                            className='svg-image w-auto h-full'
                            quality={isMobile ? 50 : 100}
                            priority={isInView}
                        />
                    </div>
                )}
                <m.h2 ref={titleRef} className='font-bold text-[3em] md:text-[16em] max-w-min leading-none' style={{ wordSpacing: isMobile ? '' : '440px' }}>
                    {experience.title.split(' ').map(renderTitleWord)}
                </m.h2>
                <div className='md:h-full w-full md:w-max flex flex-col gap-y-8 justify-center'>
                    <m.p
                        ref={dateRef}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: isDateInView ? 1 : 0, y: isDateInView ? 0 : -30 }}
                        transition={{ duration: 0.6 }}
                        className='text-[3em] md:text-[calc(10dvh+12em)] font-extrabold font-[ui-monospace] leading-[normal]'>
                        {new Date(experience.started_at).toLocaleDateString(locale).replaceAll('-', '/')}
                    </m.p>
                    {isMobile && (
                        <m.p
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: isDateInView ? 1 : 0, y: isDateInView ? 0 : -30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-[3em] md:text-[calc(10dvh+12em)] leading-[normal] font-extrabold font-[ui-monospace]'>
                            {(experience.finished_at && new Date(experience.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                        </m.p>
                    )}
                    <div className='flex flex-col w-full gap-y-4'>
                        <m.p
                            ref={companyRef}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isCompanyInView ? 1 : 0, y: isCompanyInView ? 0 : 10 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='text-xl md:text-4xl text-left self-start'>
                            {experience.company} - {experience.contract}
                        </m.p>
                        <m.div ref={tagsRef} className='text-xl md:text-2xl md:text-right flex-wrap flex w-full md:w-auto md:flex-nowrap gap-x-4 md:self-end'>
                            {experience.skills &&
                                experience.skills.map((skill, index) => (
                                    <m.p
                                        key={`skill-${skill.id}-${experience.title}`}
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
                            {(experience.finished_at && new Date(experience.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                        </m.p>
                    )}
                </div>
                <m.div
                    ref={paragraphRef}
                    className='w-full max-w-screen md:w-[32rem] text-xl leading-10 tracking-widest md:text-[clamp(12px,calc(15%+1.5em),100px)] whitespace-break-spaces'
                    style={{
                        marginTop: '0',
                        opacity: isParagraphInView ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                    }}>
                    {paragraphFragments.map(renderFragment)}
                </m.div>
            </m.div>
        </AnimatePresence>
    )
}
