import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import useIsMobile from '@/hooks/useIsMobile';
import { Formation } from '@/types/formation';

export default function FormationCard({ element }: { element: Formation }) {
    const formation = element
    const { locale } = useRouter()
    const isMobile = useIsMobile()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const getAnimationProps = (index = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 },
        transition: { duration: 0.5, delay: isInView ? index * 0.3 : 0 },
    })

    return (
        <AnimatePresence>
            <motion.div
                ref={ref}
                {...getAnimationProps()}
                className='w-full md:min-w-max md:h-[calc(100vh - 8rem)] shadow-md rounded-lg text-white flex flex-col md:flex-row md:items-center gap-8 md:gap-96'>
                <motion.h2
                    {...getAnimationProps(1)}
                    className='font-bold text-[3em] md:text-[16em] max-w-min'
                    style={{ wordSpacing: isMobile ? '' : '440px', lineHeight: isMobile ? '' : '30vh' }}>
                    {formation.school}
                </motion.h2>
                <div className='md:h-full w-full md:w-max flex flex-col gap-y-8 justify-center'>
                    <motion.p {...getAnimationProps(2)} className='text-[3em] md:text-[22em] font-extrabold font-[ui-monospace]'>
                        {new Date(formation.started_at).toLocaleDateString(locale).replaceAll('-', '/')}
                    </motion.p>
                    <div className='flex flex-col w-full gap-y-4'>
                        <motion.p {...getAnimationProps(3)} className='text-2xl md:text-4xl text-left self-start'>
                            {formation.title}
                        </motion.p>
                        <motion.div className='w-full text-xl md:text-2xl text-right flex flex-wrap md:flex-nowrap gap-x-4 md:self-end'>
                            {formation.skills &&
                                formation.skills.map((skill, index) => (
                                    <motion.p
                                        key={`skill-${skill.id}-${formation.title}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                                        transition={{ duration: 0.5, delay: isInView ? 1.3 + index * 0.1 : 0 }}>
                                        {skill.title}
                                    </motion.p>
                                ))}
                        </motion.div>
                    </div>
                    <motion.p {...getAnimationProps(5.5)} className='text-[3em] md:text-[22em] font-extrabold font-[ui-monospace]'>
                        {(formation.finished_at && new Date(formation.finished_at).toLocaleDateString(locale).replaceAll('-', '/')) ?? 'Present'}
                    </motion.p>
                </div>
                <motion.p
                    {...getAnimationProps(7)}
                    className='w-full md:w-[32rem] text-xl md:text-[2rem] whitespace-break-spaces'
                    style={{ marginTop: formation.id % 2 === 0 ? 'auto' : '0', marginBottom: !(formation.id % 2 === 0) ? 'auto' : '0' }}>
                    {formation.description}
                </motion.p>
            </motion.div>
        </AnimatePresence>
    )
}
