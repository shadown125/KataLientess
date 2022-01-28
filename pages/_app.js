import HeadPage from '../components/layout/HeadPage';
import {SessionProvider} from "next-auth/react";

if (process.env.NEXT_PUBLIC_API_MOCKING !== 'true') {
    import('../mocks').then(async ({setupMocks}) => {
        await setupMocks();
    })
}

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
    return (
        <SessionProvider session={session}>
            <HeadPage />
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp
