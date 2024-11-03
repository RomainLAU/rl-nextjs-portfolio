import { m, useInView } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import AnimatedSmiley from './animatedSmiley';

gsap.registerPlugin(ScrollTrigger)

export default function PresentationText({
    text,
    image,
    index,
}: {
    text: string
    image: { url: string; width: number; height: number; name: string }
    index: number
}) {
    const isMobile = useIsMobile()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLDivElement | null>(null)

    const isInView = useInView(containerRef, { once: true, amount: 0.1 })

    useLayoutEffect(() => {
        if (!containerRef.current || !textRef.current || !imageRef.current || isMobile !== false) return

        gsap.set(textRef.current, { yPercent: index === 0 ? 500 : 300 })
        gsap.set(imageRef.current, { yPercent: 100 })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'center center',
                scrub: true,
            },
        })

        timeline.to(textRef.current, { yPercent: 0, duration: 3 }, 0).to(imageRef.current, { yPercent: 0, duration: 3 }, 0)

        const exitTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center center',
                end: 'bottom top',
                scrub: true,
            },
        })

        exitTimeline.to(textRef.current, { yPercent: -300, duration: 3 }, 0).to(imageRef.current, { yPercent: -100, duration: 3 }, 0)

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            timeline.kill()
            exitTimeline.kill()
        }
    }, [index, isMobile])

    const getColoredText = (text: string) => {
        const letters = text.split('')
        return letters.map((letter, index) => (
            <span key={`letter-${index}`} style={{ color: `hsl(${Math.random() * 360}, 100%, 50%)` }}>
                {letter}
            </span>
        ))
    }

    const options = {
        replace: (domNode: any) => {
            if (domNode.name === 'strong' && domNode.attribs.class === 'colors') {
                return <strong className='colors'>{getColoredText(domNode.children[0].data)}</strong>
            }
            if (domNode.name === 'p' && domNode.attribs.class === 'smiley') {
                return <AnimatedSmiley />
            }
            if (domNode.name === 'p') {
                return <>{domNode.children && domToReact(domNode.children, options)}</>
            }
            if (domNode.children) {
                return domToReact(domNode.children, options)
            }
        },
    }

    if (isMobile !== false) {
        return (
            <m.div ref={containerRef} className={`relative flex flex-col items-center mb-8 w-screen ${image ? 'h-[80vh]' : 'h-[50vh]'}`}>
                <m.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: isInView ? 0 : -20,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='text-xl mb-4 text-wrap text-center w-3/4'>
                    {parse(text, options)}
                </m.div>
                {image && (
                    <Image
                        priority={index === 0}
                        quality={isMobile ? 50 : 100}
                        style={{
                            transform: isInView ? 'translateY(0)' : 'translateY(-20px)',
                            opacity: isInView ? 1 : 0,
                            transition: 'all 0.8s ease-out 0.2s',
                        }}
                        src={image.url}
                        alt={image.name}
                        width={image.width}
                        height={image.height}
                        className='w-3/4'
                    />
                )}
            </m.div>
        )
    }

    return (
        <section
            ref={containerRef}
            className='h-screen w-full flex justify-center items-center relative'
            style={{ perspective: '500px', scrollSnapAlign: 'center' }}>
            {image && (
                <div ref={imageRef} className='absolute max-h-[90vh] w-1/4 h-auto' style={{ left: '25%' }}>
                    <Image
                        priority={index === 0}
                        className='h-full w-full'
                        src={image.url ?? ''}
                        width={image.width ?? 100}
                        height={image.height ?? 100}
                        alt={image.name ?? ''}
                        quality={100}
                    />
                </div>
            )}
            <div
                ref={textRef}
                className='absolute text-9xl font-extrabold mix-blend-difference flex justify-center items-center flex-wrap gap-x-10'
                style={{
                    right: image ? '15%' : '',
                    textAlign: image ? 'left' : 'center',
                    maxWidth: image ? '30%' : '80%',
                }}>
                {parse(text, options)}
            </div>
        </section>
    )
}
