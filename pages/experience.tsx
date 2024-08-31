import endpoints from '@/apiConfig'
import { Experience } from '@/types/experience'
import React from 'react'
import ExperienceCard from '../components/experienceCard'

export async function getStaticProps() {
    const experiences: Experience[] = await fetch(endpoints.experiences({ locale: 'fr' })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            experiences,
        },
    }
}

const Experiences = ({ experiences }: { experiences: Experience[] }) => {
    return (
        <div>
            <h1 className='font-extrabold text-8xl mb-8'>Experience</h1>
            <ul>
                {experiences && experiences.map((experience: Experience) => <ExperienceCard key={`experience-${experience.id}`} experience={experience} />)}
            </ul>
        </div>
    )
}

export default Experiences
