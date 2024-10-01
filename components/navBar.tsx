'use client'

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { VscChromeClose, VscMenu } from 'react-icons/vsc';

import useIsMobile from '@/hooks/useIsMobile';

import useScrollDirection from '../hooks/useScrollDirection';
import LanguageSwitcher from './languageSwitcher';

export default function NavBar() {
    const pathname = usePathname()
    const { scrollDirection } = useScrollDirection()
    const isMobile = useIsMobile()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const language = router.locale

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

    return (
        <>
            <motion.nav
                className='fixed top-0 left-0 w-[calc(100vw-4rem)] p-8 flex items-center text-white font-semibold bg-black justify-between mix-blend-difference z-10'
                initial={{ y: '-100%' }}
                animate={{ y: !scrollDirection ? '0%' : scrollDirection === 'down' ? '-100%' : '0%' }}
                transition={{
                    type: !scrollDirection ? 'tween' : 'spring',
                    stiffness: !scrollDirection ? 100 : 300,
                    damping: !scrollDirection ? 10 : 30,
                    duration: !scrollDirection ? 1 : 0.2,
                    delay: !scrollDirection ? 0.3 : 0,
                }}>
                <Link href='/'>
                    <h1>ROMAIN LAURENT</h1>
                </Link>
                {isMobile ? (
                    <VscMenu onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-4xl cursor-pointer mix-blend-difference' />
                ) : (
                    <div className='flex gap-x-8'>
                        <Link className={`link ${pathname === '/projects' ? 'active' : ''}`} href='/projects'>
                            {language === 'fr' ? 'Projets' : 'Projects'}
                        </Link>
                        <Link className={`link ${pathname === '/experience' ? 'active' : ''}`} href='/experience'>
                            {language === 'fr' ? 'Expérience' : 'Experience'}
                        </Link>
                        <Link className={`link ${pathname === '/formations' ? 'active' : ''}`} href='/formations'>
                            {language === 'fr' ? 'Formations' : 'Formations'}
                        </Link>
                        <Link className={`link`} href='#contact'>
                            {language === 'fr' ? 'Contact' : 'Contact'}
                        </Link>
                        <LanguageSwitcher />
                    </div>
                )}
            </motion.nav>
            <AnimatePresence mode='wait'>
                {isMenuOpen && (
                    <motion.div
                        key={'headerMenu'}
                        variants={containerVariants}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        transition={{ duration: 0.5 }}
                        className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity flex flex-col items-center justify-center gap-y-8 z-10'>
                        <VscChromeClose
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='text-4xl cursor-pointer mix-blend-difference absolute top-8 right-8'
                        />
                        <motion.div key={'link-projects'} variants={itemVariants}>
                            <Link
                                className={`link mobile-link ${pathname === '/projects' ? 'active' : ''}`}
                                href='/projects'
                                onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Projets' : 'Projects'}
                            </Link>
                        </motion.div>
                        <motion.div key={'link-experience'} variants={itemVariants}>
                            <Link
                                className={`link mobile-link ${pathname === '/experience' ? 'active' : ''}`}
                                href='/experience'
                                onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Expérience' : 'Experience'}
                            </Link>
                        </motion.div>
                        <motion.div key={'link-formations'} variants={itemVariants}>
                            <Link
                                className={`link mobile-link ${pathname === '/formations' ? 'active' : ''}`}
                                href='/formations'
                                onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Formations' : 'Formations'}
                            </Link>
                        </motion.div>
                        <motion.div key={'link-contact'} variants={itemVariants}>
                            <Link className={`link mobile-link`} href='#contact' onClick={() => setIsMenuOpen(false)}>
                                {language === 'fr' ? 'Contact' : 'Contact'}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
