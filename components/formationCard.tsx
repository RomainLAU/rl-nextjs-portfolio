import { Formation } from '@/types/formation'
import Image from 'next/image'

export default function FormationCard({ formation }: { formation: Formation }) {
    return (
        <div style={{ height: 'calc(100vh - 8rem)' }} className='w-full min-w-max shadow-md rounded-lg text-white flex flex-row items-center gap-x-96'>
            <h2 className='font-bold text-[16em] max-w-min' style={{ wordSpacing: '440px', lineHeight: '30vh' }}>
                {formation.school}
            </h2>
            <div className='h-full w-max flex flex-col gap-y-8 justify-center'>
                <p className='text-[22em] font-extrabold font-[ui-monospace]'>{formation.started_at.replaceAll('-', '/')}</p>
                <div className='flex flex-col w-full gap-y-4'>
                    <p className='text-4xl text-left self-start'>{formation.title}</p>
                    <div className='text-2xl text-right flex gap-x-4 self-end'>
                        {formation.skills.map((skill) => (
                            <p key={`skill-${skill.id}-${formation.title}`}>{skill.title}</p>
                        ))}
                    </div>
                </div>
                <p className='text-[22em] font-extrabold font-[ui-monospace]'>
                    {(formation.finished_at && formation.finished_at.replaceAll('-', '/')) ?? 'Present'}
                </p>
            </div>
            <p
                className='w-[32rem] text-[2rem] whitespace-break-spaces'
                style={{ marginTop: formation.id % 2 === 0 ? 'auto' : '0', marginBottom: !(formation.id % 2 === 0) ? 'auto' : '0' }}>
                {formation.description}
            </p>
        </div>
    )
}
