/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'api.romain-laurent.fr',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'fr',
    },
    async headers() {
        const policies = {
            'default-src': ["'self'"],
            'script-src': ["'self'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:', 'https://res.cloudinary.com'],
            'media-src': ["'self'", 'data:', 'https://res.cloudinary.com'],
            'font-src': ["'self'"],
            'form-action': ["'self'"],
            'connect-src': ["'self'", process.env.NODE_ENV !== 'production' && 'ws://127.0.0.1:52947'],
        }

        if (process.env.NODE_ENV !== 'production') {
            policies['script-src'].push("'unsafe-eval'")
        }

        const csp = Object.entries(policies)
            .map(([key, val]) => `${key} ${val.join(' ')}`)
            .join('; ')

        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: csp,
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'geolocation=(self), microphone=()',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'Content-Language',
                        value: 'fr',
                    },
                    {
                        key: 'X-Robots-Tag',
                        value: 'index, follow',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
