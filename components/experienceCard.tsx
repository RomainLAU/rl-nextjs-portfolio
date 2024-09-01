import { Experience } from '@/types/experience'
import Image from 'next/image'

export default function ExperienceCard({ experience }: { experience: Experience }) {
    return (
        <div style={{ height: 'calc(100vh - 8rem)' }} className='w-full min-w-max shadow-md rounded-lg text-white flex flex-row items-center gap-x-96'>
            {experience.company_logo && (
                <Image
                    src={experience.company_logo.url}
                    alt={experience.company_logo.alternativeText}
                    width={experience.company_logo.width}
                    height={experience.company_logo.height}
                    className='w-auto h-full'
                />
            )}
            <h2 className='font-bold text-[16em] max-w-min' style={{ wordSpacing: '440px', lineHeight: '30vh' }}>
                {experience.title}
            </h2>
            <div className='h-full w-max flex flex-col gap-y-8 justify-center'>
                <p className='text-[22em] font-extrabold font-[ui-monospace]'>{experience.started_at.replaceAll('-', '/')}</p>
                <div className='flex flex-col w-full gap-y-4'>
                    <p className='text-4xl text-left self-start'>
                        {experience.company} - {experience.contract}
                    </p>
                    <div className='text-2xl text-right flex gap-x-4 self-end'>
                        {experience.skills && experience.skills.map((skill) => <p key={`skill-${skill.id}-${experience.title}`}>{skill.title}</p>)}
                    </div>
                </div>
                <p className='text-[22em] font-extrabold font-[ui-monospace]'>
                    {(experience.finished_at && experience.finished_at.replaceAll('-', '/')) ?? 'Present'}
                </p>
            </div>
            <p
                className='w-[32rem] text-[2rem] whitespace-break-spaces'
                style={{ marginTop: experience.id % 2 === 0 ? 'auto' : '0', marginBottom: !(experience.id % 2 === 0) ? 'auto' : '0' }}>
                {experience.description}
            </p>
        </div>
    )
}
