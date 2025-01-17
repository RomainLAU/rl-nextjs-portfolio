'use client'

import { AnimatePresence, m, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useIsMobile from '@/hooks/useIsMobile';
import { Experience } from '@/types/experience';

export default function ExperienceCard({ element, index }: { element: Experience; index: number }) {
    const experience = element
    const isMobile = useIsMobile() ?? true
    const { locale } = useRouter()

    const ref = useRef(null)
    const dateRef = useRef(null)
    const companyRef = useRef(null)
    const tagsRef = useRef(null)
    const [paragraphFragments, setParagraphFragments] = useState<string[]>([])
    const paragraphRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    const isInView = useInView(ref, { once: isMobile, amount: 0.2 })
    const isDateInView = useInView(dateRef, { once: isMobile, amount: 0.4 })
    const isCompanyInView = useInView(companyRef, { once: isMobile, amount: 0.2 })
    const isTagsInView = useInView(tagsRef, { once: isMobile, amount: 0.2 })
    const isParagraphInView = useInView(paragraphRef, { once: isMobile, amount: 0.2 })
    const isTitleInView = useInView(titleRef, { once: isMobile, amount: 0.2 })

    const initialTransition = {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 },
        transition: { duration: 0.6, delay: index === 0 ? 0.7 : 0 },
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

    const renderTitleWord = (word: string, wordIndex: number) => {
        return (
            <m.span
                key={wordIndex}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: isTitleInView ? 1 : 0, y: isTitleInView ? 0 : -30 }}
                transition={{ duration: 0.5, delay: index === 0 ? 1.2 + wordIndex * 0.3 : wordIndex * 0.3 }}
                className='block'>
                {word}
            </m.span>
        )
    }

    return (
        <AnimatePresence>
            <m.div
                ref={ref}
                className='flex w-full flex-col rounded-lg text-white shadow-md md:h-[calc(100dvh-12rem)] md:w-[70vw] md:grid md:grid-cols-2 md:grid-rows-[3fr_1fr] md:items-start gap-8 md:gap-0 md:gap-y-4'>
                {experience.company_logo && (
                    <m.div
                        {...initialTransition}
                        className={`w-[80vw] md:w-full h-[40vh] md:h-full md:max-h-[60dvh] ${experience.company === 'COM4DESIGN' ? 'svg-container' : ''}`}>
                        <Image
                            src={experience.company_logo.url}
                            alt={experience.company_logo.alternativeText}
                            width={experience.company_logo.width}
                            height={experience.company_logo.height}
                            className='svg-image w-auto h-full'
                            quality={isMobile ? 50 : 100}
                            priority={isInView}
                        />
                    </m.div>
                )}
                <m.h2 ref={titleRef} className='font-bold text-[3em] md:text-[6em] max-w-min leading-none' style={{ wordSpacing: isMobile ? '' : '440px' }}>
                    {experience.title.split(' ').map(renderTitleWord)}
                </m.h2>
                <div className='w-full md:w-max flex flex-col gap-y-8 justify-center'>
                    <m.p
                        ref={dateRef}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: isDateInView ? 1 : 0, y: isDateInView ? 0 : -30 }}
                        transition={{ duration: 0.6, delay: index === 0 ? 2.3 : 1.3 }}
                        className='text-[3em] md:text-[calc(5dvh+4em)] font-extrabold font-[ui-monospace] leading-[normal]'>
                        {new Date(experience.started_at).toLocaleDateString(locale).replaceAll('-', '/')}
                    </m.p>
                    <m.p
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: isDateInView ? 1 : 0, y: isDateInView ? 0 : -30 }}
                        transition={{ duration: 0.6, delay: index === 0 ? 2.5 : 1.5 }}
                        className='text-[3em] md:text-[calc(5dvh+4em)] leading-[normal] font-extrabold font-[ui-monospace]'>
                        {(experience.finished_at && new Date(experience.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                    </m.p>
                </div>
                <div className='flex flex-col w-full gap-y-4'>
                    {/* <m.p
                        ref={companyRef}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isCompanyInView ? 1 : 0, y: isCompanyInView ? 0 : 10 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='text-xl md:text-4xl text-left self-start'>
                        {experience.company} - {experience.contract}
                    </m.p> */}
                    <m.div ref={tagsRef} className='text-xl md:text-2xl md:text-left flex-wrap flex w-full md:w-auto gap-x-4 md:self-start'>
                        {experience.skills &&
                            experience.skills.map((skill, skillIndex) => (
                                <m.p
                                    key={`skill-${skill.id}-${experience.title}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: isTagsInView ? 1 : 0, y: isTagsInView ? 0 : 10 }}
                                    transition={{ duration: 0.3, delay: isTagsInView ? (index === 0 ? 2.9 + skillIndex * 0.1 : 1.6 + skillIndex * 0.1) : 0 }}>
                                    {skill.title}
                                </m.p>
                            ))}
                    </m.div>
                </div>
                {/* <m.div
                    ref={paragraphRef}
                    className='w-full max-w-screen md:w-[32rem] text-xl leading-10 tracking-widest md:text-[clamp(12px,calc(0.5vh+1em),42px)] whitespace-break-spaces'
                    style={{
                        marginTop: '0',
                        opacity: isParagraphInView ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                    }}>
                    {paragraphFragments.map(renderFragment)}
                </m.div> */}
            </m.div>
        </AnimatePresence>
    )
}
