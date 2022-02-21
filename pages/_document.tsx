import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="/main.css"/>
            </Head>
        <body>
        <Main />
        <NextScript />
        </body>
        </Html>
    )
}

export default Document;