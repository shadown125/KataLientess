import HeadPage from '../components/layout/HeadPage';
import {Fragment} from "react";

function MyApp({ Component, pageProps }) {
    return (
        <Fragment>
            <HeadPage />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp
