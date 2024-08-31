/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    i18n: {
        locales: ['en-US', 'fr'],
        defaultLocale: 'en-US',
    },
}

export default nextConfig
