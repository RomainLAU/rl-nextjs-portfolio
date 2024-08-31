import { API_BASE_URL } from '@/apiConfig'
import { Experience } from '@/types/experience'
import Image from 'next/image'

export default function ExperienceCard({ experience }: { experience: Experience }) {
    console.log(experience)
    return (
        <div className='shadow-md rounded-lg p-6 text-white'>
            <Image
                src={process.env.NEXT_PUBLIC_BASE_URL + experience.company_logo.url}
                alt={experience.company_logo.alternativeText}
                width={experience.company_logo.width}
                height={experience.company_logo.height}
            />
            <h2 className='font-bold text-2xl'>{experience.title}</h2>
            <p>{experience.company}</p>
            <p>{experience.contract}</p>
            <p>
                {experience.started_at} - {experience.finished_at ?? 'Present'}
            </p>
            <p>{experience.description}</p>
        </div>
    )
}
