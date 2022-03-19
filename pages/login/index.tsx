import Link from "next/link";
import {Formik, Form} from "formik";
import {getSession, signIn} from "next-auth/react";
import {useRouter} from "next/router";
import EmailField from "../../components/inputs/EmailField";
import PasswordField from "../../components/inputs/PasswordField";
import {loginValidationSchema} from "../../components/validationSchemas/loginValidationSchema";
import {GetServerSideProps} from "next";
import {LoginDataInterface} from "../../interfaces/LoginDataInterface";
import Footer from "../../components/layout/Footer";
import {BackgroundFilterContext} from "../../components/context/backgroundFilterContext";
import {useContext} from "react";
import FullActiveBackdrop from "../../components/layout/FullActiveBackdrop";
import DataPrivacy from "../../components/elements/DataPrivacy";

function LoginPage () {
    const {state} = useContext(BackgroundFilterContext);
    const router = useRouter();

    const submitHandler = async (data: LoginDataInterface, {setSubmitting, resetForm}: {setSubmitting: Function, resetForm: Function}) => {
        setSubmitting(true);

        const loginData = {
            ...data,
        }

        try {
            await signIn('credentials', {
                redirect: false,
                email: loginData.email,
                password: loginData.password,
            })

            await router.replace('/');

            setSubmitting(false);
            resetForm(true);

        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <main>
            <section className="intro-panel login">
                <div className="container">
                    <h1 className="headline h2">Login</h1>
                    <Formik initialValues={{ email: '', password: '' }} onSubmit={submitHandler} validationSchema={loginValidationSchema}>
                        {({ isSubmitting }) => (
                            <Form>
                                <EmailField name="email" />
                                <PasswordField name="password" />
                                <div className="buttons-container">
                                    <Link href="/register">
                                        <a className="button button-primary">Register</a>
                                    </Link>
                                    <button className="button button-primary" disabled={isSubmitting} type="submit">
                                        <span>Login</span>
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <Footer />
                </div>
            </section>
            <DataPrivacy active={state} />
            {state ? <FullActiveBackdrop /> : ''}
        </main>
    )
}

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({
        req: context.req,
    })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: { session },
    }
}