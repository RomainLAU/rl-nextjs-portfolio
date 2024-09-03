import endpoints from '@/apiConfig'
import ExperienceCard from '@/components/experienceCard'
import HorizontalScrollingContainer from '@/components/horizontalScrollingContainer'
import LinkButton from '@/components/linkButton'
import type { Experience } from '@/types/experience'

export async function getStaticProps() {
    const experiences: Experience[] = await fetch(endpoints.experiences({ locale: 'fr' })).then((res) => res.json().then((data) => data.data))

    return {
        props: {
            experiences,
        },
    }
}

export default function Experience({ experiences }: { experiences: Experience[] }) {
    return (
        <>
            <HorizontalScrollingContainer list={experiences} title={'Professional Experience'} CardComponent={ExperienceCard} />
        </>
    )
}
