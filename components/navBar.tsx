'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar() {
    const pathname = usePathname()

    return (
        <nav className='fixed top-0 left-0 w-full p-8 flex items-center text-white font-semibold bg-black justify-between'>
            <h1>ROMAIN LAURENT</h1>
            <div className='flex gap-x-8'>
                <Link className={`link ${pathname === '/' ? 'text-red-700' : ''}`} href='/'>
                    Home
                </Link>
                <Link className={`link ${pathname === '/projects' ? 'text-red-700' : ''}`} href='/projects'>
                    Projects
                </Link>
                <Link className={`link ${pathname === '/experience' ? 'text-red-700' : ''}`} href='/experience'>
                    Experience
                </Link>
                <Link className={`link ${pathname === '/contact' ? 'text-red-700' : ''}`} href='/contact'>
                    Contact
                </Link>
            </div>
        </nav>
    )
}
