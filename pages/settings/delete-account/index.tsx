import {GetServerSideProps} from "next";
import {getSession, signOut} from "next-auth/react";
import HomePage from "../../index";
import Link from "next/link";
import {Form, Formik} from "formik";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {useRouter} from "next/router";

const DeleteAccount = () => {
    const router = useRouter();

    const deleteAccount = async () => {
        const response = await fetch('/api/user/deleteAccount', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        await signOut();
    }

    const submitHandler = async () => {
        try {
            await deleteAccount();
            await router.replace('/');
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <>
            <HomePage />
            <section className="settings delete-account">
                <Link href='/'>
                    <a className="button button--medium icon-cross" />
                </Link>
                <div className="notification">
                    <h2 className="headline h5">Do you really want to delete your account?</h2>
                    <p>
                        Note that your account and progress will be deleted permanently!
                    </p>
                </div>
                <Formik initialValues={{}} onSubmit={submitHandler} >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="buttons-container">
                                <button className="button button-primary" disabled={isSubmitting} type="submit" data-testid="delete">
                                    <span>Yes</span>
                                </button>
                                <Link href="/settings">
                                    <a className="button button-primary" data-testid="back-to-settings">No</a>
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
            <FullActiveBackdrop />
        </>
    );
}

export default DeleteAccount;

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