import Head from "next/head";

function HeadPage () {
    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>

            <meta name="author" content="Dawid Oleksiuk"/>
            <meta name="description" content="Discover the KataLientesS app which will help you get daily tasks done."/>
            <meta property="og:title" content="KataLientesS" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="Discover the KataLientesS app which will help you get daily tasks done." />
            <meta property="og:locale" content="pl_PL" />
            <meta property="og:url" content=""/>
            <meta property="og:image" content="/seoKatalientess.png" />
            <meta property="og:locale:alternate" content="en_US" />
            <meta name="twitter:site" content="@DawidOleksiuk"/>
            <meta name="twitter:title" content="KataLientesS"/>
            <meta name="twitter:description" content="Discover the KataLientesS app which will help you get daily tasks done."/>
            <meta name="twitter:image" content="/seoKatalientess.png" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon.png" />

            <title>KataLientesS</title>
        </Head>
    );
}

export default HeadPage;