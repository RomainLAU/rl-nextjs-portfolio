import { motion, useScroll, useTransform } from 'framer-motion';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import useIsMobile from '@/hooks/useIsMobile';

export default function PresentationText({ text, image }: { text: string; image: { url: string; width: number; height: number; name: string } }) {
    const textRef = useRef<HTMLDivElement | null>(null)
    const ref = useRef(null)
    const isMobile = useIsMobile()

    const { scrollYProgress } = useScroll({ target: ref, layoutEffect: false })
    const y = useTransform(scrollYProgress, [0, 0.5, 1], ['-100vh', '0vh', '100vh'])
    const [viewRef, inView] = useInView({ threshold: 0.4, triggerOnce: false })

    const getColoredText = (text: string) => {
        const letters = text.split('')
        const coloredText = letters.map((letter, index) => {
            return (
                <span key={`letter-${index}`} style={{ color: `hsl(${Math.random() * 360}, 100%, 50%)` }}>
                    {letter}
                </span>
            )
        })

        return coloredText
    }

    const options = {
        replace: (domNode: any) => {
            if (domNode.name === 'strong' && domNode.attribs.class === 'colors') {
                return <strong className='colors'>{getColoredText(domNode.children[0].data)}</strong>
            }
            if (domNode.name === 'p') {
                return <>{domNode.children && domToReact(domNode.children, options)}</>
            }
            if (domNode.children) {
                return domToReact(domNode.children, options)
            }
        },
    }

    if (isMobile) {
        return (
            <motion.div ref={viewRef} className='flex flex-col items-center mb-8 w-screen h-[80vh]'>
                <motion.div
                    animate={{
                        x: inView ? 0 : -20,
                        opacity: inView ? 1 : 0,
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='text-xl mb-4 text-wrap text-center w-3/4'>
                    {parse(text, options)}
                </motion.div>
                {image && (
                    <Image
                        priority
                        style={{
                            transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                            opacity: inView ? 1 : 0,
                            transition: 'all 0.8s ease-out 0.2s',
                        }}
                        src={image.url}
                        alt={image.name}
                        width={image.width}
                        height={image.height}
                        className='w-3/4'
                    />
                )}
            </motion.div>
        )
    }

    return (
        <section className='h-screen w-full flex justify-center items-center relative' style={{ perspective: '500px', scrollSnapAlign: 'center' }}>
            <motion.div
                ref={ref}
                className='relative max-h-[90vh] m-5 overflow-hidden'
                style={{ x: -150, width: image?.width ?? 400, height: image?.height ?? 300 }}>
                {image && (
                    <Image
                        priority
                        className='absolute inset-0'
                        src={image.url ?? ''}
                        width={image.width ?? 100}
                        height={image.height ?? 100}
                        alt={image.name ?? ''}
                    />
                )}
            </motion.div>
            <motion.div
                ref={textRef}
                className='absolute text-9xl font-extrabold mix-blend-difference flex justify-center items-center flex-wrap gap-x-10'
                style={{
                    y,
                    x: image ? '50%' : 0,
                    textAlign: image ? 'left' : 'center',
                    maxWidth: image ? '30%' : '80%',
                }}>
                {parse(text, options)}
            </motion.div>
        </section>
    )
}
