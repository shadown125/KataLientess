import HomePage from "../index";
import {getSession} from "next-auth/react";

function DoneTodo () {
    return (
        <HomePage />
    )
}

export default DoneTodo;

export async function getServerSideProps(context) {
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