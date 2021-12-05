import Link from "next/link";
import {Formik, Form, useField} from "formik";
import * as yup from 'yup';
import {Fragment} from "react";
import {getSession, signIn} from "next-auth/react";
import {useRouter} from "next/router";

function LoginPage () {
    const router = useRouter();
    /**
     * @returns {number}
     */
    function getFullYear() {
        return new Date().getFullYear();
    }

    const EmailField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="login">Login:</label>
                    <input type="email" className="login-input is-invalid" id="login" placeholder="E-Mail" {...field}/>
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <label htmlFor="login">Login:</label>
                <input type="email" className="login-input" id="login" placeholder="E-Mail" {...field}/>
            </Fragment>
        );
    }

    const PasswordField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="is-invalid" placeholder="Password" {...field} />
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" {...field} />
            </Fragment>
        );
    }

    const validationSchema = yup.object({
        email: yup.string().email("Email must be a valid").required("Email is a required field"),
        password: yup.string().required("Password is a required field"),
    })

    const submitHandler = async (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        const loginData = {
            ...data,
        }

        const result = await signIn('credentials', {
            redirect: false,
            email: loginData.email,
            password: loginData.password,
        })

        if (!result.error) {
            await router.replace('/');
        }

        setSubmitting(false);
        resetForm(true);
    }

    return (
        <main>
            <section className="intro-panel">
                <div className="container">
                    <h1 className="headline h2">Login</h1>
                    <Formik initialValues={{ email: '', password: '' }} onSubmit={submitHandler} validationSchema={validationSchema}>
                        {({ isSubmitting }) => (
                            <Form>
                                <EmailField name="email" />
                                <PasswordField name="password" />
                                <div className="buttons-container">
                                    <Link href="/register">
                                        <a className="button button-primary">Register</a>
                                    </Link>
                                    <button className="button button-primary" disabled={isSubmitting} type="submit">Login</button>
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
                        <div className="credits">&copy; {getFullYear()} All rights reserved by Dawid Oleksiuk</div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default LoginPage;

export async function getServerSideProps(context) {
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