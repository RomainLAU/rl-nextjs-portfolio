'use client'

import { m } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import AnimatedTextOnScroll from './animatedTextOnScroll';
import LinkButton from './linkButton';
import Waves from './react-bits/Waves';

gsap.registerPlugin(ScrollTrigger)

const MODAL_ANIMATION_DURATION = 400

const modalAnimationProps = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { duration: 0.4, ease: 'easeIn' },
}

interface MediaProps {
    media: {
        mime: string
        url: string
        alternativeText?: string
    }
}

interface DescriptionModalProps {
    element: {
        id: string
        company: string
        title: string
        feature_media?: MediaProps['media']
        feature_description?: string
        description?: string
        project_url?: string
    }
    setSelectedElement: React.Dispatch<React.SetStateAction<any>>
}

const MediaContent = ({ media }: MediaProps) => {
    const isVideo = media.mime.includes('video')

    if (isVideo) {
        return <video src={media.url} controls autoPlay className='w-[40%] md:w-auto h-[40vh] md:h-auto md:max-h-[50dvh]' />
    }

    return (
        <m.div className='w-[40%] md:w-auto md:min-w-[35vw] h-[40vh] md:h-auto md:min-h-[30vh] md:max-h-[50dvh]'>
            <Image
                src={media.url}
                alt={media.alternativeText || ''}
                width={400}
                height={200}
                className='aspect-video w-[40%] md:w-[40vw] h-[40vh] md:h-[25vh] md:max-h-[50dvh]'
            />
        </m.div>
    )
}

export default function DescriptionModal({ element, setSelectedElement }: DescriptionModalProps) {
    const { locale } = useRouter()
    const modalRef = useRef<HTMLDivElement>(null)
    const [isModalMounted, setIsModalMounted] = useState(false)

    const handleClose = useCallback(() => setSelectedElement(null), [setSelectedElement])

    const handleEscapeKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        },
        [handleClose]
    )

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [handleEscapeKey])

    useEffect(() => {
        document.body.classList.add('modal-open')
        const modalTimeout = setTimeout(() => setIsModalMounted(true), MODAL_ANIMATION_DURATION)

        return () => {
            clearTimeout(modalTimeout)
            document.body.classList.remove('modal-open')
            setIsModalMounted(false)
        }
    }, [])

    if (!element) return null

    return (
        <m.div
            key={`modal-${element.id}`}
            {...modalAnimationProps}
            className='sticky inset-0 w-screen h-screen bg-black/75 z-1000 flex justify-center items-center'
            onClick={handleClose}>
            {isModalMounted && (
                <Waves
                    lineColor='#fecaca'
                    backgroundColor='rgb(0, 0, 0)'
                    waveSpeedX={0.05}
                    waveSpeedY={0.05}
                    waveAmpX={40}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.005}
                    maxCursorMove={1000}
                    xGap={12}
                    yGap={36}
                    className='w-full h-[-webkit-fill-available] border border-solid border-white rounded-md'>
                    <div
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                        className='experience-modal w-[95%] h-[95%] bg-black overflow-y-scroll absolute left-[2.5%] top-[2.5%] p-12 pb-96 flex flex-col gap-y-48'>
                        <VscChromeClose
                            onClick={handleClose}
                            className='text-4xl mix-blend-difference absolute top-10 right-10 cursor-pointer hover:text-red-200 transition-colors z-10'
                        />

                        <div className='flex w-full justify-center flex-col items-center gap-y-4 relative'>
                            <m.h2 className='text-6xl font-bold text-center'>{element.company}</m.h2>
                            <m.h3 className='text-xl font-extralight text-center'>{element.title}</m.h3>
                        </div>

                        <div className='flex items-start justify-between relative z-10'>
                            {element.feature_media && <MediaContent media={element.feature_media} />}
                            {element.feature_description && <m.div className='text-lg leading-10 tracking-widest px-8'>{element.feature_description}</m.div>}
                        </div>

                        {element.description && isModalMounted && (
                            <div className='relative z-10'>
                                <AnimatedTextOnScroll
                                    key={`animated-text-${element.id}-${isModalMounted}`}
                                    text={element.description}
                                    customScroller='.experience-modal'
                                    containerRef={modalRef}
                                />
                            </div>
                        )}

                        {element.project_url && (
                            <m.div className='w-1/4 self-center relative z-10'>
                                <LinkButton link={element.project_url} text={locale === 'fr' ? 'Voir le site' : 'See the website'} />
                            </m.div>
                        )}
                    </div>
                </Waves>
            )}
        </m.div>
    )
}
