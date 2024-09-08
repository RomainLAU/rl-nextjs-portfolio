import endpoints from '@/apiConfig'
import { Me } from '@/types/me'
import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import PresentationText from '@/components/presentationText'
import LinkButton from '@/components/linkButton'

export async function getStaticProps() {
    const me: Me = await fetch(endpoints.me({ locale: 'en' })).then((res) => res.json().then((data) => data.data[0]))

    return {
        props: {
            me,
        },
    }
}

export default function Home({ me }: { me: Me }) {
    const [description, setDescription] = useState<string[]>([])

    useEffect(() => {
        if (me) {
            setDescription(me.description.split('\n'))
        }
    }, [me])

    if (!me) {
        return <div>Loading...</div> // Loading screen
    }

    return (
        <div>
            <motion.div>
                <div className='h-screen flex items-center justify-center flex-col gap-y-10' style={{ scrollSnapAlign: 'center' }}>
                    <h1 className='text-9xl font-extrabold text-center'>{me.fullname}</h1>
                    <h2 className='text-center text-xl font-medium'>{me.job}</h2>
                </div>
                <div className='py-[100vh]'>
                    {description.map((paragraph, index) => (
                        <PresentationText
                            key={`paragraph-${index}`}
                            text={paragraph}
                            image={
                                me.images[index]?.formats.large ||
                                me.images[index]?.formats.medium ||
                                me.images[index]?.formats.small ||
                                me.images[index]?.formats.thumbnail
                            }
                        />
                    ))}
                </div>
                <div className='h-screen flex items-center justify-center flex-col gap-y-10' style={{ scrollSnapAlign: 'center' }}>
                    <p className='text-9xl font-extrabold text-center'>
                        And I am <strong className={`${me.status === 'available' ? 'text-green-600' : 'text-red-800'}`}>{me.status}</strong>
                    </p>
                    {me.status === 'working' && <p className='text-xl font-medium text-center'>But you can still contact me for future projects</p>}
                    <p className='text-xl font-medium text-center'>Soooo...</p>
                    <div className='w-1/4'>
                        <LinkButton text='contact me' link='mailto:dev@romain-laurent.fr' />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
