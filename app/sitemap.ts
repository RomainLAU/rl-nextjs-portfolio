import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://romain-laurent.fr',
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: 'https://romain-laurent.fr/en',
                },
            },
        },
        {
            url: 'https://romain-laurent.fr/experience',
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: 'https://romain-laurent.fr/en/experience',
                },
            },
        },
        {
            url: 'https://romain-laurent.fr/formations',
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: 'https://romain-laurent.fr/en/formations',
                },
            },
        },
    ]
}
