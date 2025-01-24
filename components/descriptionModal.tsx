'use client'

import { m } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import AnimatedTextOnScroll from './AnimatedTextOnScroll';
import LinkButton from './linkButton';

gsap.registerPlugin(ScrollTrigger)

export default function DescriptionModal({ element, setSelectedElement }: { element: any; setSelectedElement: React.Dispatch<any> }) {
    const { locale } = useRouter()

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setSelectedElement(null)
        })

        return () => {
            document.removeEventListener('keydown', (e) => {
                if (e.key === 'Escape') setSelectedElement(null)
            })
        }
    }, [setSelectedElement])

    if (!element) return null

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`experience-modal fixed inset-0 w-screen h-screen bg-black/75 z-[1000] flex justify-center items-center`}
            onClick={() => {
                setSelectedElement(null)
            }}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className='w-[80%] h-[-webkit-fill-available] overflow-y-scroll bg-black rounded-3xl p-24 my-12 flex flex-col gap-y-48'>
                <VscChromeClose
                    onClick={() => setSelectedElement(null)}
                    className='text-4xl mix-blend-difference fixed top-20 right-[6.5%] cursor-pointer hover:text-red-200 transition-colors'
                />
                <div className='flex items-start justify-between'>
                    {element.feature_media &&
                        (element.feature_media.mime.includes('video') ? (
                            <video src={element.feature_media.url} controls autoPlay className='w-[40%] md:w-auto h-[40vh] md:h-auto md:max-h-[50dvh]' />
                        ) : (
                            <m.div
                                className={`w-[40%] md:w-auto h-[40vh] md:h-auto md:max-h-[50dvh] ${element.company === 'COM4DESIGN' ? 'svg-container' : ''}`}>
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
    )
}
