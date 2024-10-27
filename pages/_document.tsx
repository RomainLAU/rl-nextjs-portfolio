import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta charSet='utf-8' />
                <meta name='keywords' content='romain, laurent, web, dev, frontend, fullstack, design, french, react, javascript' />
                <meta name='author' content='Romain Laurent' />

                <meta property='og:title' content="Romain LAURENT's Portfolio" />
                <meta property='og:type' content='portfolio' />
                <meta property='og:url' content='https://romain-laurent.fr' />
                <meta
                    property='og:description'
                    content="I'm a young french developer desiring to discover the world, if you want to help me, contact me with your project and I will be happy to work on it !"
                />
                <meta
                    property='og:image'
                    content='https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/medium_Photo_CV_Romain_Laurent_09cdf60dc6.webp'
                />
                <meta property='og:url' content='https://romain-laurent.fr' />

                <meta
                    name='twitter:card'
                    content='https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/medium_Photo_CV_Romain_Laurent_09cdf60dc6.webp'
                />
                <meta name='twitter:title' content="Romain Laurent's Portfolio" />
                <meta
                    name='twitter:description'
                    content="I'm a young french developer desiring to discover the world, if you want to help me, contact me with your project and I will be happy to work on it !"
                />
                <meta
                    name='twitter:image'
                    content='https://res.cloudinary.com/dtsvpdh37/image/upload/v1725197369/portfolio/medium_Photo_CV_Romain_Laurent_09cdf60dc6.webp'
                />
                <meta name='twitter:site' content='@LeRoiAdibou' />

                <meta
                    property='description'
                    content="I'm a young french developer desiring to discover the world, if you want to help me, contact me with your project and I will be happy to work on it !"
                />

                <link rel='dns-prefetch' href='https://res.cloudinary.com' />
            </Head>
            <body className='font-inter'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
