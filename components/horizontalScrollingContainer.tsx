'use client'

import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import useIsMobile from '@/hooks/useIsMobile';
import { useGSAP } from '@gsap/react';

import DescriptionModal from './descriptionModal';
import LinkButton from './linkButton';

interface HorizontalScrollComponentProps<T> {
    list: any[]
    title: string
    CardComponent: React.ComponentType<any>
}

export default function HorizontalScrollComponent<T>({ list, title, CardComponent }: HorizontalScrollComponentProps<T>) {
    const { locale } = useRouter()
    const isMobile = useIsMobile() ?? true

    const [selectedItem, setSelectedItem] = useState<null | any>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const contactRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (isMobile !== false) return

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
                    trigger: container ?? undefined,
                    start: '100vh top',
                    end: '150vh top',
                    scrub: true,
                },
            })

            gsap.to(horizontal, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: container ?? undefined,
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
                    trigger: container ?? undefined,
                    start: 'end end',
                    end: '200vh end',
                    scrub: true,
                },
            })
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.refresh())
        }
    }, [list, isMobile, containerRef])

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            ScrollTrigger.getAll().forEach((trigger) => trigger.refresh())
        }
    }, [selectedItem])

    if (isMobile !== false) return null

    return (
        <div ref={containerRef} className='min-h-[100vh]'>
            <AnimatePresence>{selectedItem && <DescriptionModal element={selectedItem} setSelectedElement={setSelectedItem} />}</AnimatePresence>
            <h1 ref={titleRef} className='fixed top-[15vh] left-[3%] text-4xl font-bold z-10'>
                {title}
            </h1>

            <div className='min-h-[110vh] flex items-end'>
                <div ref={horizontalRef} className='flex gap-x-96 px-10 pr-[30vw]'>
                    {list.map((item, index) => (
                        <div key={index} className='flex-shrink-0'>
                            <CardComponent key={`${title}-${item.id}`} element={item} index={index} setSelectedItem={setSelectedItem} />
                        </div>
                    ))}
                </div>
            </div>

            <div ref={contactRef} className='h-screen flex items-center justify-center'>
                <div ref={buttonRef} className='w-1/4 max-w-[300px] opacity-0 transform translate-y-12'>
                    <LinkButton text={locale === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
                </div>
            </div>
        </div>
    )
}
