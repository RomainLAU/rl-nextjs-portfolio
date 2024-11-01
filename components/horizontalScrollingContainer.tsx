'use client'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

import LinkButton from './linkButton';

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollComponentProps<T> {
    list: any[]
    title: string
    CardComponent: React.ComponentType<any>
}

export default function HorizontalScrollComponent<T>({ list, title, CardComponent }: HorizontalScrollComponentProps<T>) {
    const { locale } = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current && horizontalRef.current && titleRef.current && buttonRef.current) {
            const container = containerRef.current
            const horizontal = horizontalRef.current
            const titleElement = titleRef.current
            const button = buttonRef.current

            const totalScroll = horizontal.scrollWidth - window.innerWidth

            gsap.to(titleElement, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: container,
                    start: '100vh top',
                    end: '150vh top',
                    scrub: true,
                },
            })

            gsap.to(horizontal, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: '200vh top',
                    end: () => `+=${totalScroll + window.innerHeight}`,
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })

            gsap.to(button, {
                opacity: 1,
                scrollTrigger: {
                    trigger: container,
                    start: 'end end',
                    end: '200vh end',
                    scrub: true,
                },
            })
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [list])

    return (
        <div ref={containerRef} className='min-h-[100vh]'>
            <h1 ref={titleRef} className='fixed top-[15vh] left-[3%] text-4xl font-bold z-10'>
                {title}
            </h1>

            <div className='min-h-[110vh] flex items-end overflow-hidden'>
                <div ref={horizontalRef} className='flex gap-x-96 px-10 pr-[30vw]'>
                    {list.map((item, index) => (
                        <div key={index} className='flex-shrink-0'>
                            <CardComponent key={`experience-${item.id}`} element={item} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='h-screen flex items-center justify-center'>
                <div ref={buttonRef} className='w-1/4 max-w-[300px] opacity-0 transform translate-y-12'>
                    <LinkButton text={locale === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
                </div>
            </div>
        </div>
    )
}
