import Head from 'next/head';

import { experiences as experiencesEn } from '@/data/en/experiences';
import { experiences as experiencesFr } from '@/data/fr/experiences';
import ExperienceCard from '@/components/experienceCard';
import HorizontalScrollingContainer from '@/components/horizontalScrollingContainer';
import MobileContainer from '@/components/mobileContainer';
import MobileOrDesktop from '@/components/mobileOrDesktop';

import type { Experience } from '@/types/experience'

export async function getStaticProps({ locale }: { locale: string }) {
    const experiences = locale === 'en' ? experiencesEn : experiencesFr;

    return {
        props: {
            experiences,
            locale,
        },
    }
}

export default function Experience({ experiences, locale }: { experiences: Experience[]; locale: string }) {
    return (
        <>
            <Head>
                <title>Romain Laurent - Experience</title>
                <meta
                    name='description'
                    content='I always worked for tiny companies, at Station F, Versailles and in Tusinisa. I love being close to the team and spending time discovering their passions'
                />
            </Head>
            {experiences && (
                <MobileOrDesktop
                    mobile={() => (
                        <MobileContainer
                            list={experiences.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())}
                            title={locale === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
                            CardComponent={ExperienceCard}
                        />
                    )}
                    desktop={() => (
                        <HorizontalScrollingContainer
                            list={experiences.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())}
                            title={locale === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
                            CardComponent={ExperienceCard}
                        />
                    )}
                />
            )}
        </>
    )
}
