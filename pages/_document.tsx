import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta property='og:title' content="Romain LAURENT's Portfolio" />
                <meta property='og:type' content='portfolio' />
                <meta property='og:url' content='https://romain-laurent.fr' />
                <meta
                    property='og:description'
                    content="Hey ! I'm Romain LAURENT, a young french developer desiring to discover the world, if you want to help me to do that, contact me with your project and I will be happy to work on it !"
                />
                <meta
                    property='description'
                    content="Hey ! I'm Romain LAURENT, a young french developer desiring to discover the world, if you want to help me to do that, contact me with your project and I will be happy to work on it !"
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
