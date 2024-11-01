'use client'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import LinkButton from './linkButton';

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollingContainer({ list, title, CardComponent }: { list: any[]; title: string; CardComponent: React.ComponentType<any> }) {
    const locale = useRouter().locale
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            const elements = containerRef.current.children // Obtenir les enfants du conteneur

            const totalWidth = Array.from(elements).reduce((acc, element) => {
                return acc + element.clientWidth // Calcule la largeur totale des éléments
            }, 0)

            // Crée l'animation de défilement horizontal avec GSAP
            gsap.to(elements, {
                xPercent: -100 * (elements.length - 1), // Scrolling horizontal
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: true,
                    start: 'center center',
                    end: () => `+=${totalWidth}`, // Utiliser totalWidth pour la fin du défilement
                },
            })
        }
    }, [list]) // Dépendre de `list` pour s'assurer que cela se met à jour quand `list` change

    return (
        <div className='h-[300vh]'>
            <h1 className='font-extrabold text-8xl ml-[190px+10dvh] mb-24'>{title}</h1>
            <div ref={containerRef} className='horizontalContainer flex gap-x-24 h-screen pt-48' style={{ width: `${list.length * 4000}px` }}>
                {list &&
                    list
                        .toSorted((elementA, elementB) => ((elementA.finished_at ?? 0) < (elementB.finished_at ?? 0) ? 1 : -1))
                        .map((element: any) => <CardComponent key={`experience-${element.id}`} element={element} />)}
            </div>
            <div id='contact' className='relative h-screen w-screen'>
                <div className='w-1/4 sticky left-1/2 top-1/2 transform -translate-x-1/2'>
                    <LinkButton text={locale === 'fr' ? 'contactez-moi' : 'contact me'} link='mailto:dev@romain-laurent.fr' />
                </div>
            </div>
        </div>
    )
}
