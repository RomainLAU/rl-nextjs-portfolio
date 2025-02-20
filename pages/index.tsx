import { m } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import endpoints from '@/apiConfig';
import LinkButton from '@/components/linkButton';
import PresentationText from '@/components/presentationText';
import SplashCursor from '@/components/react-bits/SplashCursor';
import useIsMobile from '@/hooks/useIsMobile';
import { Me } from '@/types/me';

const apparitionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
}

const apparitionTransition = {
    duration: 1,
    delay: 1.1,
}

export async function getStaticProps({ locale }: { locale: string }) {
    const me: Me[] = await fetch(endpoints.me({ locale })).then((res) => res.json().then((data) => data.data))

    if (!me) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            me: me[0],
        },
    }
}

export default function Home({ me }: { me: Me }) {
    const [description, setDescription] = useState<string[]>([])
    const isMobile = useIsMobile()

    useEffect(() => {
        if (me) {
            setDescription(me.description.split('\n'))
        }
    }, [me])

    return (
        <>
            <Head>
                <title>Romain Laurent - Portfolio</title>
                <meta
                    name='description'
                    content="I'm a french young developer. I love frontend development, design, art, and discovering cultures. Let me know if you need my services !"
                />
            </Head>
            {isMobile ? <MobileView me={me} description={description} /> : <DesktopView me={me} description={description} />}
        </>
    )
}

function MobileView({ me, description }: { me: Me; description: string[] }) {
    const router = useRouter()
    const language = router.locale

    return (
        <m.div className='flex flex-col items-center justify-start w-screen max-w-screen relative'>
            <div className='h-screen max-h-screen w-full flex flex-col items-center gap-y-4'>
                <m.h1
                    initial='hidden'
                    animate='visible'
                    variants={apparitionVariants}
                    transition={apparitionTransition}
                    className='text-4xl md:text-9xl font-extrabold text-center mt-[40dvh] text-white'>
                    {me.fullname}
                </m.h1>
                <m.h2
                    initial='hidden'
                    animate='visible'
                    variants={apparitionVariants}
                    transition={{
                        duration: 1,
                        delay: 1.5,
                    }}
                    className='text-center text-xl font-medium text-white'>
                    {me.job}
                </m.h2>
            </div>
            {description.map((paragraph: string, index: number) => (
                <div key={index} className='relative w-full max-w-screen'>
                    <PresentationText
                        text={paragraph}
                        image={
                            me.images[index]?.formats.large ||
                            me.images[index]?.formats.medium ||
                            me.images[index]?.formats.small ||
                            me.images[index]?.formats.thumbnail
                        }
                        index={index}
                    />
                </div>
            ))}
            <div className='h-screen w-full flex flex-col items-center justify-center gap-y-8 md:px-4'>
                <p className='text-4xl md:text-9xl font-extrabold text-center'>
                    {language === 'fr' ? 'Et je suis' : 'And I am'}{' '}
                    <strong className={`${me.status === 'available' ? 'text-green-600' : 'text-red-800'}`}>
                        {language === 'fr' && me.status === 'available'
                            ? 'disponible'
                            : language === 'fr' && me.status !== 'available'
                            ? 'en train de travailler'
                            : me.status}
                    </strong>
                </p>
                {me.status === 'working' && (
                    <p className='text-xl font-medium text-center'>
                        {language === 'fr' ? 'Mais vous pouvez toujours me contacter pour un projet futur' : 'But you can still contact me for future projects'}
                    </p>
                )}
                <p className='text-xl font-medium text-center'>{language === 'fr' ? 'Alooooors' : 'Soooo'}...</p>
                <div className='w-1/2'>
                    <LinkButton text={language === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
                </div>
            </div>
        </m.div>
    )
}

function DesktopView({ me, description }: { me: Me; description: string[] }) {
    const router = useRouter()
    const language = router.locale

    return (
        <m.div className='w-full min-w-screen relative'>
            <m.div className='h-screen w-full flex items-center justify-center flex-col gap-y-10' style={{ scrollSnapAlign: 'center' }}>
                <SplashCursor />
                <m.h1
                    initial='hidden'
                    animate='visible'
                    variants={apparitionVariants}
                    transition={apparitionTransition}
                    className='text-4xl md:text-9xl font-extrabold text-center text-white'>
                    {me.fullname}
                </m.h1>
                <m.h2
                    initial='hidden'
                    animate='visible'
                    variants={apparitionVariants}
                    transition={{
                        duration: 1,
                        delay: 1.5,
                    }}
                    className='text-center text-xl font-medium text-white'>
                    {me.job}
                </m.h2>
            </m.div>
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
                    index={index}
                />
            ))}
            <div id='contact' className='h-screen flex items-center justify-center flex-col gap-y-10 relative' style={{ scrollSnapAlign: 'center' }}>
                <p className='text-9xl font-extrabold text-center'>
                    {language === 'fr' ? 'Et je suis' : 'And I am'}{' '}
                    <strong className={`${me.status === 'available' ? 'text-green-600' : 'text-red-800'}`}>
                        {language === 'fr' && me.status === 'available'
                            ? 'disponible'
                            : language === 'fr' && me.status !== 'available'
                            ? 'en train de travailler'
                            : me.status}
                    </strong>
                </p>
                {me.status === 'working' && (
                    <p className='text-xl font-medium text-center'>
                        {language === 'fr' ? 'Mais vous pouvez toujours me contacter pour un projet futur' : 'But you can still contact me for future projects'}
                    </p>
                )}
                <p className='text-xl font-medium text-center'>{language === 'fr' ? 'Alooooors' : 'Soooo'}...</p>
                <div className='w-1/4 z-[6]'>
                    <LinkButton text={language === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
                </div>
                <SplashCursor />
            </div>
        </m.div>
    )
}
