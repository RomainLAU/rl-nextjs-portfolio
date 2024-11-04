import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';

export default function LinkButton({ text, link }: { text: string; link: string }) {
    const [isHovering, setIsHovering] = useState(false)
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setCursorPos({ x, y })
    }

    return (
        <m.div
            id='contact'
            className='w-full h-14 bg-black text-white border border-solid border-white rounded-full cursor-none overflow-hidden relative z-[1]'
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseMove}>
            <m.a
                target='_blank'
                href={link}
                className='flex items-center justify-center z-[1] pointer-events-visible font-extrabold h-full w-full text-center'
                animate={{
                    color: isHovering ? '#000000' : '#ffffff',
                }}
                transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                }}>
                {text.toUpperCase()}
            </m.a>
            {isHovering && (
                <AnimatePresence>
                    <m.div
                        className='absolute rounded-full pointer-events-none will-change-transform -z-10'
                        style={{
                            backgroundColor: 'white',
                            top: cursorPos.y - 245,
                            left: cursorPos.x - 245,
                            height: '490px',
                            width: '490px',
                        }}
                        initial={{
                            transform: 'scale(0)',
                            opacity: 0,
                        }}
                        animate={{
                            transform: 'scale(2)',
                            opacity: 1,
                        }}
                        exit={{
                            transform: 'scale(0)',
                            opacity: 0,
                        }}
                        transition={{
                            duration: 1.5,
                            ease: 'easeOut',
                        }}>
                        <m.div
                            className='absolute rounded-full pointer-events-none z-20'
                            style={{
                                height: '5px',
                                width: '5px',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '100%',
                                boxShadow: '0 0 0 20px black',
                                filter: 'blur(20px)',
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30,
                            }}
                        />
                    </m.div>
                </AnimatePresence>
            )}
        </m.div>
    )
}
