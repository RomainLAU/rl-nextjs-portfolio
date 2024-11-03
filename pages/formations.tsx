import Head from 'next/head';

import endpoints from '@/apiConfig';
import FormationCard from '@/components/formationCard';
import HorizontalScrollingContainer from '@/components/horizontalScrollingContainer';
import MobileContainer from '@/components/mobileContainer';
import MobileOrDesktop from '@/components/mobileOrDesktop';
import { Formation } from '@/types/formation';

export async function getStaticProps({ locale }: { locale: string }) {
    const formations: Formation[] = await fetch(endpoints.formations({ locale })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            formations,
            locale,
        },
    }
}

export default function Formations({ formations, locale }: { formations: Formation[]; locale: string }) {
    return (
        <>
            <Head>
                <title>Romain Laurent - Formations</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta
                    name='description'
                    content='I started learning development in 2019 in highschool, I never stopped learning new things, and my development studies were the best years I had in a school'
                />
            </Head>
            {formations && (
                <MobileOrDesktop
                    mobile={() => (
                        <MobileContainer
                            list={formations.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())}
                            title={locale === 'fr' ? 'Formations' : 'School Formations'}
                            CardComponent={FormationCard}
                        />
                    )}
                    desktop={() => (
                        <HorizontalScrollingContainer
                            list={formations.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())}
                            title={locale === 'fr' ? 'Formations' : 'School Formations'}
                            CardComponent={FormationCard}
                        />
                    )}
                />
            )}
        </>
    )
}
