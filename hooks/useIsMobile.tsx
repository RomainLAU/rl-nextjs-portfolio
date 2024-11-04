import { useEffect, useState } from 'react';

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    useEffect(() => {
        const checkMobile = () => {
            if (typeof window === 'undefined') setIsMobile(null)
            setIsMobile(window.outerWidth <= 1024)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}
