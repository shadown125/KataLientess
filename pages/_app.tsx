import HeadPage from '../components/layout/HeadPage';
import {SessionProvider} from "next-auth/react";
import {AppProps} from "next/app";
import {lightTheme} from "../components/themes/lightTheme";
import {darkTheme} from "../components/themes/darkTheme";
import {GlobalTheme} from "../components/themes/GlobalTheme";
import {ThemeProvider} from "styled-components";
import {useState} from "react";

if (process.env.NEXT_PUBLIC_API_MOCKING !== 'true') {
    import('../mocks').then(async ({setupMocks}) => {
        await setupMocks();
    });
}

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
    const [modeState, setModeState] = useState<string>('dark');

    const onSettingModeState = (state: string) => {
        setModeState(() => {
            return state;
        });
    }

    return (
        <SessionProvider session={session}>
            <HeadPage />
            <ThemeProvider theme={modeState !== 'dark' ? lightTheme : darkTheme}>
                <GlobalTheme />
            </ThemeProvider>
            <Component {...pageProps} onSettingModeState={onSettingModeState} currentModeState={modeState}/>
        </SessionProvider>
    );
}

export default MyApp
