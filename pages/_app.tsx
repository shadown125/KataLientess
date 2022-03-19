import "../public/main.css";
import HeadPage from '../components/layout/HeadPage';
import {SessionProvider} from "next-auth/react";
import {AppProps} from "next/app";
import {ThemeContextProvider} from "../components/context/themeContext";
import ThemeWrapper from "../components/elements/ThemeWrapper";

if (process.env.NEXT_PUBLIC_API_MOCKING !== 'disabled') {
    import('../mocks').then(async ({setupMocks}) => {
        await setupMocks();
    });
}

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {

    return (
        <SessionProvider session={session}>
            <HeadPage />
            <ThemeContextProvider>
                <ThemeWrapper>
                    <Component {...pageProps} />
                </ThemeWrapper>
            </ThemeContextProvider>
        </SessionProvider>
    );
}

export default MyApp
