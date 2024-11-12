'use client'

import { AnimatePresence, m } from 'framer-motion'
import gsap from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { VscChromeClose, VscMenu } from 'react-icons/vsc'

import useIsMobile from '@/hooks/useIsMobile'

import useScrollDirection from '../hooks/useScrollDirection'
import LanguageSwitcher from './languageSwitcher'

export default function NavBar() {
    const pathname = usePathname()
    const { direction, isAtPageBottom, isAtPageTop } = useScrollDirection()
    const isMobile = useIsMobile()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const language = router.locale

    useEffect(() => {
        setIsMenuOpen(false)
    }, [language])

    const containerVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                delay: 0.5,
                staggerChildren: 0.1,
                staggerDirection: -1,
            },
        },
    }

    const itemVariants = {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0, transition: { stiffness: 50 } },
        exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
    }

    const shouldShowNavbar = isAtPageTop || direction === 'up' || isAtPageBottom

    return (
        <>
            <m.nav
                className='fixed top-0 left-0 w-[calc(100vw-4rem)] p-8 flex items-center text-white font-semibold bg-black justify-between mix-blend-difference z-10'
                initial={{ y: '-100%' }}
                animate={{ y: shouldShowNavbar ? '0%' : '-100%' }}
                transition={{
                    type: isAtPageTop || isAtPageBottom ? 'tween' : 'spring',
                    stiffness: isAtPageTop || isAtPageBottom ? 100 : 300,
                    damping: isAtPageTop || isAtPageBottom ? 10 : 30,
                    duration: isAtPageTop || isAtPageBottom ? 1 : 0.2,
                    delay: isAtPageTop || isAtPageBottom ? 0.3 : 0,
                }}>
                <Link href='/'>
                    <p className='text-white'>ROMAIN LAURENT</p>
                </Link>
                {isMobile ? (
                    <VscMenu onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-4xl mix-blend-difference' />
                ) : (
                    <div className='flex gap-x-8'>
                        {/* <Link className={`link ${pathname === '/projects' ? 'active' : ''}`} href='/projects'>
                            {language === 'fr' ? 'Projets' : 'Projects'}
                        </Link> */}
                        <Link className={`link ${pathname === '/experience' ? 'active' : ''}`} href='/experience'>
                            {language === 'fr' ? 'Expérience' : 'Experience'}
                        </Link>
                        <Link className={`link ${pathname === '/formations' ? 'active' : ''}`} href='/formations'>
                            {language === 'fr' ? 'Formations' : 'Formations'}
                        </Link>
                        <Link
                            className={`link`}
                            href='#contact'
                            scroll={pathname === '/'}
                            onClick={(e) => {
                                e.preventDefault()
                                window.scrollTo(0, document.body.scrollHeight)
                            }}>
                            {language === 'fr' ? 'Contact' : 'Contact'}
                        </Link>
                        <LanguageSwitcher />
                    </div>
                )}
            </m.nav>
            <AnimatePresence mode='wait'>
                {isMenuOpen && (
                    <m.div
                        key={'headerMenu'}
                        variants={containerVariants}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        transition={{ duration: 0.5 }}
                        className='fixed top-0 left-0 w-screen h-[110dvh] bg-black bg-opacity flex flex-col items-center justify-center gap-y-8 z-10'>
                        <VscChromeClose onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-4xl mix-blend-difference absolute top-8 right-8' />
                        {/* <m.div key={'link-projects'} variants={itemVariants}>
                            <Link
                                className={`link mobile-link ${pathname === '/projects' ? 'active' : ''}`}
                                href='/projects'
                                onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Projets' : 'Projects'}
                            </Link>
                        </m.div> */}
                        <m.div key={'link-experience'} variants={itemVariants}>
                            <Link
                                className={`link mobile-link ${pathname === '/experience' ? 'active' : ''}`}
                                href='/experience'
                                onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Expérience' : 'Experience'}
                            </Link>
                        </m.div>
                        <m.div key={'link-formations'} variants={itemVariants}>
                            <Link
                                className={`link mobile-link ${pathname === '/formations' ? 'active' : ''}`}
                                href='/formations'
                                onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Formations' : 'Formations'}
                            </Link>
                        </m.div>
                        <m.div key={'link-contact'} variants={itemVariants}>
                            <Link className={`link mobile-link`} href='#contact' onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Contact' : 'Contact'}
                            </Link>
                        </m.div>
                        <m.div key={'link-language'} variants={itemVariants}>
                            <LanguageSwitcher />
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    )
}
