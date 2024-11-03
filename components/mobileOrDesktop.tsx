'use client'

import useIsMobile from '@/hooks/useIsMobile';

export default function MobileOrDesktop({ mobile: Mobile, desktop: Desktop }: { mobile: React.ComponentType<any>; desktop: React.ComponentType<any> }) {
    const isMobile = useIsMobile()

    if (isMobile === null) return null

    return <>{isMobile === true ? <Mobile /> : <Desktop />}</>
}
