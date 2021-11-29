import Layout from '../components/layout/HeadPage';
import {Fragment} from "react";

function MyApp({ Component, pageProps }) {
    return (
        <Fragment>
            <Layout></Layout>
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp
