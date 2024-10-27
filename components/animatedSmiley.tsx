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
            <svg width='100' height='100' viewBox='0 0 100 100' className='max-w-full'>
                <circle cx='50' cy='50' r='45' fill='none' stroke='white' strokeWidth='2' />
                <circle cx='35' cy='40' r='5' fill='white' />
                <circle cx='65' cy='40' r='5' fill='white' />
                <path d='M 40 70 Q 50 80 60 70' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' className='animate-smile' />
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
                @media (max-width: 640px) {
                    svg {
                        width: 50px;
                        height: 50px;
                    }
                }
            `}</style>
        </>
    )
}
