import Head from 'next/head';
import React from 'react';

import endpoints from '@/apiConfig';
import ExperienceCard from '@/components/experienceCard';
import HorizontalScrollingContainer from '@/components/horizontalScrollingContainer';
import MobileContainer from '@/components/mobileContainer';
import useIsMobile from '@/hooks/useIsMobile';

import type { Experience } from '@/types/experience'
export async function getStaticProps({ locale }: { locale: string }) {
    const experiences: Experience[] = await fetch(endpoints.experiences({ locale })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            experiences,
            locale,
        },
    }
}

export default function Experience({ experiences, locale }: { experiences: Experience[]; locale: string }) {
    const isMobile = useIsMobile()

    return (
        <>
            <Head>
                <title>Romain Laurent - Experience</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta
                    name='description'
                    content='I always worked for tiny companies, at Station F, Versailles and in Tusinisa. I love being close to the team and spending time discovering their passions'
                />
            </Head>
            {isMobile ? (
                <MobileContainer
                    list={experiences}
                    title={locale === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
                    CardComponent={ExperienceCard}
                />
            ) : (
                <HorizontalScrollingContainer
                    list={experiences}
                    title={locale === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
                    CardComponent={ExperienceCard}
                />
            )}
        </>
    )
}
