import endpoints from '@/apiConfig'
import React from 'react'

export async function getStaticProps() {
    const experiences = await fetch(endpoints.experiences({ locale: 'fr' })).then((res) => res.json().then((data) => data.data))

    console.log(experiences)

    return {
        props: {
            experiences,
        },
    }
}

const Experiences = ({ experiences }: { experiences: any }) => {
    return (
        <div>
            <h1>Experiences</h1>
            <ul>{experiences && experiences.map((exp: any) => <li key={exp.id}>{exp.title}</li>)}</ul>
        </div>
    )
}

export default Experiences
