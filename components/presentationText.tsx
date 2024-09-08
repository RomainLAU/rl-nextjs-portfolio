import { motion, useScroll, useTransform } from 'framer-motion'
import parse, { domToReact } from 'html-react-parser'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function PresentationText({ text, image }: { text: string; image: { url: string; width: number; height: number; name: string } }) {
    const textRef = useRef<HTMLDivElement | null>(null)
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({ target: ref })
    const y = useTransform(scrollYProgress, [0, 0.5, 1], ['-100vh', '0vh', '100vh'])

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
                return <p className='text-paragraph'>{domNode.children && domToReact(domNode.children, options)}</p>
            }
            if (domNode.children) {
                return domToReact(domNode.children, options)
            }
        },
    }

    return (
        <section className='h-screen flex justify-center items-center relative' style={{ perspective: '500px', scrollSnapAlign: 'center' }}>
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
                    maxWidth: image ? '60%' : '100%',
                }}>
                {parse(text, options)}
            </motion.div>
        </section>
    )
}
