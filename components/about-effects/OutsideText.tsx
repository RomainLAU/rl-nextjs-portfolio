

import React, { useState, ReactNode } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import image1 from '@/public/images/image1.jpg'
import image2 from '@/public/images/image2.jpg'
import image3 from '@/public/images/image3.jpg'
import plage from '@/public/images/plage.png'

const OutsideText = ({ children }: { children: ReactNode }) => {
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
    const [imageIndex, setImageIndex] = useState(-1)
    const images = [image1, image2, image3, plage]

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const width = rect.width

        let newIndex = 0
        if (x < width / 4) newIndex = 0
        else if (x < width / 2) newIndex = 1
        else if (x < (width / 4) * 3) newIndex = 2
        else newIndex = 3

        setImageIndex(newIndex)
        setImagePosition({ x: e.clientX, y: e.clientY })
    }

    return (
        <>
            <strong 
                className="outside" 
                onMouseMove={handleMouseMove} 
                onMouseLeave={() => setImageIndex(-1)}
            >
                {children}
            </strong>
            <AnimatePresence mode="sync">
                {imageIndex >= 0 && (
                    <m.div
                        key={`outside-image-${imageIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            top: imagePosition.y,
                            left: imagePosition.x,
                            width: '300px',
                            height: '300px',
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 9999,
                        }}
                    >
                        <Image
                            src={images[imageIndex]}
                            alt="Hover effect"
                            width={300}
                            height={300}
                            style={{ width: 'auto', height: 'auto' }}
                            priority
                        />
                    </m.div>
                )}
            </AnimatePresence>
            {/* Preload images to avoid flickering on first hover */}
            <div style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {images.map((img, idx) => (
                    <Image 
                        key={`preload-${idx}`} 
                        src={img} 
                        alt="" 
                        width={300} 
                        height={300} 
                        priority 
                    />
                ))}
            </div>
        </>
    )
}

export default OutsideText
