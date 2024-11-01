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

            gsap.to(horizontal, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: horizontal,
                    start: 'center center',
                    end: () => `+=${(totalScroll + window.innerHeight) * 1.5}`,
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    markers: true,
                },
            })

            gsap.to(titleElement, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: '10% top',
                    scrub: true,
                },
            })

            gsap.fromTo(
                button,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: container,
                        start: () => `+=${totalScroll}`,
                        end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
                        scrub: true,
                    },
                }
            )
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [list])

    return (
        <div ref={containerRef} className='h-[300vh]'>
            <h1 ref={titleRef} className='fixed top-[15%] left-[3%] text-4xl font-bold z-10'>
                {title}
            </h1>

            <div className='min-h-screen flex items-center overflow-hidden'>
                <div ref={horizontalRef} className='flex gap-x-96 px-10 mt-[15%]'>
                    {list.map((item, index) => (
                        <div key={index} className='flex-shrink-0'>
                            <CardComponent key={`experience-${item.id}`} element={item} />
                        </div>
                    ))}
                </div>
            </div>

            <div ref={buttonRef} className='w-1/4 max-w-[300px] fixed left-1/2 bottom-1/4 transform -translate-x-1/2 opacity-0 z-10'>
                <LinkButton text={locale === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
            </div>
        </div>
    )
}
