'use client'

import image1 from '/public/images/image1.jpg';
import image2 from '/public/images/image2.jpg';
import image3 from '/public/images/image3.jpg';
// import plage from '/public/images/plage.jpg';
import { AnimatePresence, m, useInView } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import AnimatedSmiley from './animatedSmiley';

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

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const aloneElements = document.querySelectorAll('.alone')
            aloneElements.forEach((element) => {
                const rect = element.getBoundingClientRect()
                const distanceX = e.clientX - (rect.left + rect.width / 2)
                const distanceY = e.clientY - (rect.top + rect.height / 2)
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

                const maxDistance = 200
                const minDistance = 50

                if (distance < maxDistance) {
                    const factor = Math.min(1, (maxDistance - distance) / (maxDistance - minDistance))
                    let moveX = -distanceX * factor
                    let moveY = -distanceY * factor

                    moveX = Math.max(-rect.left, Math.min(moveX, window.innerWidth - rect.right))
                    moveY = Math.max(-rect.top, Math.min(moveY, window.innerHeight - rect.bottom))
                    ;(element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
                } else {
                    ;(element as HTMLElement).style.transform = 'translate(0, 0)'
                }
            })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const getColoredText = (text: string) => {
        const letters = text.split('')
        return letters.map((letter, index) => (
            <span key={`colored-letter-${index}`} style={{ color: `hsl(${Math.random() * 360}, 100%, 50%)` }}>
                {letter}
            </span>
        ))
    }

    const originalTextRef = useRef<string | null>(null)
    const [coloredText, setColoredText] = useState<string | JSX.Element[] | null>(null)
    const colorIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleHover = (e: React.MouseEvent<HTMLElement>, isEntering: boolean) => {
        const target = e.currentTarget
        const originalText = target.textContent || ''

        if (!originalTextRef.current) {
            originalTextRef.current = originalText
        }

        const colorText = () => {
            setColoredText(
                originalText.split('').map((letter, index) => (
                    <span
                        key={`colored-letter-${index}`}
                        style={{
                            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        }}>
                        {letter}
                    </span>
                ))
            )
        }

        if (isEntering) {
            colorIntervalRef.current = setInterval(colorText, 100)
            colorText()
        }

        !isEntering && clearInterval(colorIntervalRef.current as NodeJS.Timeout)
    }

    const handleRotation = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
        const strong = e.currentTarget.querySelector('strong')
        if (strong) {
            if (isEntering) {
                strong.style.transform = 'rotate3d(0, 1, 1, 6.29rad)'
                strong.style.backgroundColor = strong.classList.contains('whiteBackground') ? '#1f1f1f' : 'white'
                strong.style.color = strong.classList.contains('whiteBackground') ? 'white' : '#1f1f1f'
            } else {
                strong.style.transform = 'none'
                strong.style.backgroundColor = strong.classList.contains('whiteBackground') ? 'white' : '#1f1f1f'
                strong.style.color = strong.classList.contains('whiteBackground') ? '#1f1f1f' : 'white'
            }
        }
    }

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleHoverEnergy = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
        const target = e.currentTarget.querySelector('.energy')

        if (isEntering) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)

            gsap.to(target, {
                x: () => Math.random() * 100,
                y: () => Math.random() * 100,
                scale: 1.05,
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            })
        } else {
            timeoutRef.current = setTimeout(() => {
                gsap.to(target, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: 'power1.out',
                    onComplete: () => {
                        gsap.killTweensOf(target)
                    },
                })
            }, 1000)
        }
    }

    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
    const [imageIndex, setImageIndex] = useState(-1)
    const images = [image1, image2, image3]

    const handleHoverOutside = (e: React.MouseEvent<HTMLElement>, isEntering: boolean) => {
        const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            const target = e.currentTarget
            const rect = target.getBoundingClientRect()
            const x = e.clientX - rect.left
            const width = rect.width

            let newIndex = 0
            if (x < width / 4) {
                newIndex = 0
            } else if (x >= width / 4 && x < width / 2) {
                newIndex = 1
            } else if (x >= width / 2 && x < (width / 4) * 3) {
                newIndex = 2
            } else {
                newIndex = 3
            }

            setImageIndex(newIndex)
            setImagePosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseLeave = () => {
            setImageIndex(-1)
        }

        if (isEntering) {
            e.currentTarget.addEventListener('mousemove', handleMouseMove as unknown as EventListener)
            e.currentTarget.addEventListener('mouseleave', handleMouseLeave)
        } else {
            e.currentTarget.removeEventListener('mousemove', handleMouseMove as unknown as EventListener)
            e.currentTarget.removeEventListener('mouseleave', handleMouseLeave)
        }
    }

    const options = {
        replace: (domNode: any) => {
            if (domNode.name === 'strong' && domNode.attribs.class === 'colors') {
                return (
                    <strong className='colors' onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
                        {coloredText || getColoredText(domNode.children[0].data)}
                    </strong>
                )
            }
            if (domNode.name === 'strong' && (domNode.attribs.class === 'whiteBackground' || domNode.attribs.class === 'blackBackground')) {
                return (
                    <div className='rotationHover' onMouseEnter={(e) => handleRotation(e, true)} onMouseLeave={(e) => handleRotation(e, false)}>
                        <strong
                            className={`${domNode.attribs.class} ${isMobile ? 'text-xl' : 'text-9xl'}`}
                            style={{ display: 'inline-block', transition: 'all 0.5s ease-in-out', pointerEvents: 'none' }}>
                            {domNode.children && domToReact(domNode.children, options)}
                        </strong>
                    </div>
                )
            }
            if (domNode.name === 'p' && domNode.attribs.class === 'smiley') {
                return <AnimatedSmiley />
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'energy') {
                return (
                    <div className='relative inline-block' onMouseEnter={(e) => handleHoverEnergy(e, true)} onMouseLeave={(e) => handleHoverEnergy(e, false)}>
                        <strong className='energy inline-block'>{domNode.children[0].data}</strong>
                    </div>
                )
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'outside') {
                return (
                    <strong className='outside' onMouseEnter={(e) => handleHoverOutside(e, true)} onMouseLeave={(e) => handleHoverOutside(e, false)}>
                        {domNode.children && domToReact(domNode.children, options)}
                    </strong>
                )
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
        <>
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
            <AnimatePresence mode='sync'>
                {imageIndex >= 0 && (
                    <m.div
                        key={`outside-image-${imageIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        style={{
                            position: 'fixed',
                            top: imagePosition.y,
                            left: imagePosition.x,
                            width: '300px',
                            height: '300px',
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%)',
                            transition: 'opacity 0.3s ease-in-out',
                        }}>
                        <Image
                            src={images[imageIndex]}
                            alt='Hover effect image'
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            width={300}
                            height={300}
                            priority={true}
                        />
                    </m.div>
                )}
            </AnimatePresence>
        </>
    )
}
