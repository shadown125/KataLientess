import Head from "next/head";
import {Fragment} from "react";

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
            <meta property="og:locale:alternate" content="en_US" />
            <meta name="twitter:site" content="@DawidOleksiuk"/>
            <meta name="twitter:title" content="KataLientesS"/>
            <meta name="twitter:description" content="Discover the KataLientesS app which will help you get daily tasks done."/>

            <title>KataLientesS</title>

            <link rel="stylesheet" href="main.css"/>
        </Head>
    );
}

export default HeadPage;