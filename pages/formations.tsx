import Head from 'next/head';
import React from 'react';

import endpoints from '@/apiConfig';
import FormationCard from '@/components/formationCard';
import HorizontalScrollingContainer from '@/components/horizontalScrollingContainer';
import { Formation } from '@/types/formation';

export async function getStaticProps({ locale }: { locale: string }) {
    const formations: Formation[] = await fetch(endpoints.formations({ locale })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            formations,
        },
    }
}

export default function Formations({ formations }: { formations: Formation[] }) {
    return (
        <>
            <Head>
                <title>Romain Laurent - Formations</title>
                <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
            </Head>
            <HorizontalScrollingContainer list={formations} title={'School Formations'} CardComponent={FormationCard} />
        </>
    )
}
