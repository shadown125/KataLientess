import HomePage from "../index";
import SettingPanel from "../../components/Settings/SettingPanel";
import FullActiveBackdrop from "../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";
import {getSession} from "next-auth/react";
import {GetServerSideProps} from "next";

function Settings() {
    return (
        <Fragment>
            <HomePage />
            <SettingPanel />
            <FullActiveBackdrop />
        </Fragment>
    );
}

export default Settings;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({
        req: context.req,
    })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: { session },
    }
}