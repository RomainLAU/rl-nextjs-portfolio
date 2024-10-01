import Head from 'next/head';
import React from 'react';

import endpoints from '@/apiConfig';
import ExperienceCard from '@/components/experienceCard';
import HorizontalScrollingContainer from '@/components/horizontalScrollingContainer';

import type { Experience } from '@/types/experience'
export async function getStaticProps({ locale }: { locale: string }) {
    const experiences: Experience[] = await fetch(endpoints.experiences({ locale })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            experiences,
        },
    }
}

export default function Experience({ experiences }: { experiences: Experience[] }) {
    return (
        <>
            <Head>
                <title>Romain Laurent - Experience</title>
                <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
            </Head>
            <HorizontalScrollingContainer list={experiences} title={'Professional Experience'} CardComponent={ExperienceCard} />
        </>
    )
}
