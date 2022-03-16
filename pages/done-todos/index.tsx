import HomePage from "../index";
import {getSession} from "next-auth/react";
import {GetServerSideProps} from "next";

function DoneTodo () {
    return (
        <HomePage />
    )
}

export default DoneTodo;

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