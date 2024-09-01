import endpoints from '@/apiConfig'
import { Experience } from '@/types/experience'
import React, { useRef } from 'react'
import ExperienceCard from '../components/experienceCard'
import { motion, useScroll, useTransform } from 'framer-motion'
import FormationCard from '@/components/formationCard'
import LinkButton from '@/components/linkButton'

export async function getStaticProps() {
    const experiences: Experience[] = await fetch(endpoints.experiences({ locale: 'fr' })).then((res) => res.json().then((data) => data.data))
    const formations: any[] = await fetch(endpoints.formations({ locale: 'fr' })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            experiences,
            formations,
        },
    }
}

const Experiences = ({ experiences, formations }: { experiences: Experience[]; formations: any[] }) => {
    const proRef = useRef(null)
    const schoolRef = useRef(null)

    const { scrollYProgress: proScrollY } = useScroll({ target: proRef })
    const { scrollYProgress: schoolScrollY } = useScroll({ target: schoolRef })

    const proX = useTransform(proScrollY, [0, 1], ['0%', `-${experiences && experiences.length * 385}%`])
    const schoolX = useTransform(schoolScrollY, [0, 1], ['0%', `-${formations && formations.length * 250}%`])

    return (
        <div>
            <div ref={proRef} className='relative' style={{ height: `${experiences && experiences.length * 600}vh` }}>
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
            <h1 className='font-extrabold text-8xl mb-8'>School Formations</h1>
            <div ref={schoolRef} className='relative' style={{ height: `${formations && formations.length * 1200}vh` }}>
                <motion.div
                    style={{ x: schoolX }}
                    className='h-screen sticky top-0 flex flex-row items-center'
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}>
                    <ul className='flex flex-row gap-x-96'>
                        {formations &&
                            formations
                                .toSorted((formA, formB) => ((formA.finished_at ?? 0) < (formB.finished_at ?? 0) ? 1 : -1))
                                .map((formation: any) => <FormationCard key={`formation-${formation.id}`} formation={formation} />)}
                    </ul>
                </motion.div>
            </div>
            <div className='w-full flex justify-center items-center pb-[30rem]'>
                <LinkButton text='contact me' link='mailto:dev@romain-laurent.fr' />
            </div>
        </div>
    )
}

export default Experiences
