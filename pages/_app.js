import HeadPage from '../components/layout/HeadPage';
import {SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
    return (
        <SessionProvider session={session}>
            <HeadPage />
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp
