import endpoints from '@/apiConfig'
import { Experience } from '@/types/experience'
import React, { useRef } from 'react'
import ExperienceCard from '../components/experienceCard'
import { motion, useScroll, useTransform } from 'framer-motion'

export async function getStaticProps() {
    const experiences: Experience[] = await fetch(endpoints.experiences({ locale: 'fr' })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            experiences,
        },
    }
}

const Experiences = ({ experiences }: { experiences: Experience[] }) => {
    const proRef = useRef(null)
    const schoolRef = useRef(null)

    const { scrollYProgress: proScrollY } = useScroll({ target: proRef })
    const { scrollYProgress: schoolScrollY } = useScroll({ target: schoolRef })

    const proX = useTransform(proScrollY, [0, 1], ['0%', `-${experiences.length * 400}%`])
    const schoolX = useTransform(schoolScrollY, [0, 1], ['0%', `-${experiences.length * 400}%`])

    return (
        <div>
            <div ref={proRef} className='relative' style={{ height: `${experiences.length * 1200}vh` }}>
                <h1 className='font-extrabold text-8xl mb-8'>Professional Experience</h1>
                <motion.div
                    style={{ x: proX }}
                    className='h-screen sticky top-0 flex flex-row items-center'
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}>
                    <ul className='flex flex-row gap-x-96'>
                        {experiences &&
                            experiences
                                .toSorted((expA, expB) => ((expA.finished_at ?? 0) < (expB.finished_at ?? 0) ? 1 : -1))
                                .map((experience: Experience) => <ExperienceCard key={`experience-${experience.id}`} experience={experience} />)}
                    </ul>
                </motion.div>
            </div>
            <div ref={schoolRef} className='relative mt-[30rem]' style={{ height: `${experiences.length * 1200}vh` }}>
                <h1 className='font-extrabold text-8xl mb-8'>School Formations</h1>
                <motion.div
                    style={{ x: schoolX }}
                    className='h-screen sticky top-0 flex flex-row items-center'
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}>
                    <ul className='flex flex-row gap-x-96'>
                        {experiences &&
                            experiences
                                .toSorted((expA, expB) => ((expA.finished_at ?? 0) < (expB.finished_at ?? 0) ? 1 : -1))
                                .map((experience: Experience) => <ExperienceCard key={`experience-${experience.id}`} experience={experience} />)}
                    </ul>
                </motion.div>
            </div>
        </div>
    )
}

export default Experiences
