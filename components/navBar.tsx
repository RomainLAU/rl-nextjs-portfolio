'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import useScrollDirection from '../hooks/useScrollDirection'
import { useEffect } from 'react'

export default function NavBar() {
    const pathname = usePathname()
    const { scrollDirection } = useScrollDirection()

    useEffect(() => {
        console.log(scrollDirection)
    }, [scrollDirection])

    return (
        <motion.nav
            className='fixed top-0 left-0 w-full p-8 flex items-center text-white font-semibold bg-black justify-between mix-blend-difference z-10'
            initial={{ y: 0 }}
            animate={{ y: scrollDirection === 'down' ? '-100%' : '0%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <Link href='/'>
                <h1>ROMAIN LAURENT</h1>
            </Link>
            <div className='flex gap-x-8'>
                <Link className={`link ${pathname === '/projects' ? 'text-red-700' : ''}`} href='/projects'>
                    Projects
                </Link>
                <Link className={`link ${pathname === '/background' ? 'text-red-700' : ''}`} href='/background'>
                    Background
                </Link>
                <Link className={`link ${pathname === '/contact' ? 'text-red-700' : ''}`} href='/contact'>
                    Contact
                </Link>
            </div>
        </motion.nav>
    )
}
