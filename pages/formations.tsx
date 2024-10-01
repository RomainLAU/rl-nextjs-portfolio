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
    return <HorizontalScrollingContainer list={formations} title={'School Formations'} CardComponent={FormationCard} />
}
