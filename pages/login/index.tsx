import Link from "next/link";
import {Formik, Form} from "formik";
import {getSession, signIn} from "next-auth/react";
import {useRouter} from "next/router";
import EmailField from "../../components/inputs/EmailField";
import PasswordField from "../../components/inputs/PasswordField";
import {loginValidationSchema} from "../../components/validationSchemas/loginValidationSchema";
import {Year} from "../../components/elements/Year";
import {GetServerSideProps} from "next";
import {LoginDataInterface} from "../../interfaces/LoginDataInterface";

function LoginPage () {
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
                    <div className="footer">
                        <ul className="social-links">
                            <li>
                                <a href="https://github.com/shadown125" rel="external noopener noreferrer" target="_blank" className="link icon-link icon-github">
                                    <span>Github</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/DawidOleksiuk" rel="external noopener noreferrer" target="_blank" className="link icon-link icon-twitter">
                                    <span>Twitter</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/dawid-ol-2478311a4/" rel="external noopener noreferrer" target="_blank" className="link icon-link icon-linkedin">
                                    <span>Linkedin</span>
                                </a>
                            </li>
                        </ul>
                        <div className="credits">&copy; {Year()} All rights reserved by Dawid Oleksiuk</div>
                    </div>
                </div>
            </section>
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