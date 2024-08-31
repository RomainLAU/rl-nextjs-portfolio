import NavBar from '@/components/navBar'
import type { AppProps } from 'next/app'
import '@/globals.css'
import { Inter } from 'next/font/google'
import { useRef } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.className} mt-20 p-24`}>
            <NavBar />
            <Component {...pageProps} />
        </div>
    )
}
