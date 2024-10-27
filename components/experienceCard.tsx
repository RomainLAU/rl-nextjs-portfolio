import { AnimatePresence, m, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import useIsMobile from '@/hooks/useIsMobile';
import { Experience } from '@/types/experience';

export default function ExperienceCard({ element }: { element: Experience }) {
    const experience = element
    const isMobile = useIsMobile()
    const { locale } = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.4 })

    const getAnimationProps = (index = 0) => {
        if (isMobile) {
            return {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 },
                transition: { duration: 0.5, delay: isInView ? index * 0.3 : 0 },
            }
        }
    }

    return (
        <AnimatePresence>
            <m.div
                ref={ref}
                {...getAnimationProps()}
                className='flex w-full flex-col rounded-lg text-white shadow-md md:h-[calc(100dvh-12rem)] md:min-w-max md:flex-row md:items-center gap-8 md:gap-96'>
                {experience.company_logo && (
                    <Image
                        src={experience.company_logo.url}
                        alt={experience.company_logo.alternativeText}
                        width={experience.company_logo.width}
                        height={experience.company_logo.height}
                        className='w-[80vw] md:w-auto h-[40vh] md:h-full'
                        quality={isMobile ? 50 : 100}
                        priority={isInView}
                    />
                )}
                <m.h2
                    {...getAnimationProps(1)}
                    className='font-bold text-[3em] md:text-[16em] max-w-min'
                    style={{ wordSpacing: isMobile ? '' : '440px', lineHeight: isMobile ? '' : '30dvh' }}>
                    {experience.title}
                </m.h2>
                <div className='md:h-full w-full md:w-max flex flex-col gap-y-8 justify-center'>
                    <m.p {...getAnimationProps(2)} className='text-[3em] md:text-[calc(10dvh+12em)] font-extrabold font-[ui-monospace] leading-[normal]'>
                        {new Date(experience.started_at).toLocaleDateString(locale).replaceAll('-', '/')}
                    </m.p>
                    {isMobile && (
                        <m.p {...getAnimationProps(2.5)} className='text-[3em] md:text-[calc(10dvh+12em)] leading-[normal] font-extrabold font-[ui-monospace]'>
                            {(experience.finished_at && new Date(experience.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                        </m.p>
                    )}
                    <div className='flex flex-col w-full gap-y-4'>
                        <m.p {...getAnimationProps(3)} className='text-xl md:text-4xl text-left self-start'>
                            {experience.company} - {experience.contract}
                        </m.p>
                        <m.div className='text-xl md:text-2xl md:text-right flex-wrap flex w-full md:w-auto md:flex-nowrap gap-x-4 md:self-end'>
                            {experience.skills &&
                                experience.skills.map((skill, index) => (
                                    <m.p
                                        key={`skill-${skill.id}-${experience.title}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: isInView || !isMobile ? 1 : 0, y: isInView || !isMobile ? 0 : 10 }}
                                        transition={{ duration: 0.3, delay: isInView ? 1.3 + index * 0.1 : 0 }}>
                                        {skill.title}
                                    </m.p>
                                ))}
                        </m.div>
                    </div>
                    {!isMobile && (
                        <m.p {...getAnimationProps(5.5)} className='text-[3em] md:text-[calc(10dvh+12em)] leading-[normal] font-extrabold font-[ui-monospace]'>
                            {(experience.finished_at && new Date(experience.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                        </m.p>
                    )}
                </div>
                <m.p
                    {...getAnimationProps(7)}
                    className='w-full max-w-screen md:w-[32rem] text-xl md:text-[clamp(12px,calc(15%+1.5em),100px)] whitespace-break-spaces'
                    style={{ marginTop: experience.id % 2 === 0 ? 'auto' : '0', marginBottom: !(experience.id % 2 === 0) ? 'auto' : '0' }}>
                    {experience.description}
                </m.p>
            </m.div>
        </AnimatePresence>
    )
}
