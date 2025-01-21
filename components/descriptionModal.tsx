'use client'

import { AnimatePresence, m } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { VscChromeClose } from 'react-icons/vsc';

import AnimatedTextOnScroll from './AnimatedTextOnScroll';
import LinkButton from './linkButton';

gsap.registerPlugin(ScrollTrigger)

export default function DescriptionModal({ element, setSelectedElement }: { element: any; setSelectedElement: React.Dispatch<any> }) {
    const { locale } = useRouter()

    if (!element) return null

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`experience-modal fixed inset-0 w-screen h-screen overflow-y-scroll bg-black/5 z-[1000]`}>
                <div className='w-[80%] h-auto absolute top-[5%] left-[5%] right-[5%] bg-black shadow-2xl shadow-white rounded-3xl p-24 flex flex-col gap-y-96'>
                    <VscChromeClose onClick={() => setSelectedElement(null)} className='text-4xl mix-blend-difference absolute top-8 right-8' />
                    <div className='flex items-start justify-between'>
                        {element.feature_media &&
                            (element.feature_media.mime.includes('video') ? (
                                <video src={element.feature_media.url} controls autoPlay className='w-[40%] md:w-auto h-[40vh] md:h-auto md:max-h-[50dvh]' />
                            ) : (
                                <m.div
                                    className={`w-[40%] md:w-auto h-[40vh] md:h-auto md:max-h-[50dvh] ${
                                        element.company === 'COM4DESIGN' ? 'svg-container' : ''
                                    }`}>
                                    <Image
                                        src={element.feature_media.url}
                                        alt={element.feature_media.alternativeText}
                                        width={400}
                                        height={200}
                                        className='aspect-video w-[40%] md:w-[40vw] h-[40vh] md:h-[25vh] md:max-h-[50dvh]'
                                    />
                                </m.div>
                            ))}
                        {element.feature_description && <m.div className='text-lg leading-10 tracking-widest px-8'>{element.feature_description}</m.div>}
                    </div>

                    <AnimatedTextOnScroll text={element.description} />

                    {element.project_url && (
                        <m.div className='w-1/4 self-center'>
                            <LinkButton link={element.project_url} text={locale === 'fr' ? 'Voir le site' : 'See the website'} />
                        </m.div>
                    )}
                </div>
            </m.div>
        </AnimatePresence>
    )
}
