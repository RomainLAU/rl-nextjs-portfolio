'use client'

import { useEffect, useState } from 'react';

export default function AnimatedSmiley() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    return (
        <>
            <svg width='200' height='200' viewBox='0 0 100 100'>
                <circle cx='50' cy='50' r='45' fill='white' stroke='white' strokeWidth='2' />
                <circle cx='35' cy='40' r='5' fill='white' />
                <circle cx='65' cy='40' r='5' fill='white' />
                <path d='M 50 70 Q 50 70 50 70' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' className='animate-smile' />
            </svg>
            <style jsx>{`
                @keyframes smileAnimation {
                    0%,
                    100% {
                        d: path('M 40 70 Q 50 80 60 70');
                    }
                    50% {
                        d: path('M 30 65 Q 50 85 70 65');
                    }
                }
                .animate-smile {
                    animation: smileAnimation 2s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}
