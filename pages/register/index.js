import Link from "next/link";
import {Formik, Form, useField} from "formik";
import * as yup from 'yup';
import {Fragment} from "react";
import {getSession} from "next-auth/react";

function Register() {

    /**
     * @returns {number}
     */
    function getFullYear() {
        return new Date().getFullYear();
    }

    const NameField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="firstName">Change first name:</label>
                    <input id="firstName" className="is-invalid" placeholder="Name" {...field}/>
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <label htmlFor="firstName">First name:*</label>
                <input id="firstName" placeholder="Name" {...field}/>
            </Fragment>
        );
    }

    const LastNameField = (props) => {
        const [field] = useField(props);
        return (
            <Fragment>
                <label htmlFor="lastName">Last name:</label>
                <input type="input" placeholder="Last name" id="lastName" {...field} />
            </Fragment>
        );
    }

    const EmailField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="email">E-Mail:*</label>
                    <input type="email" id="email" className="is-invalid" placeholder="E-Mail" {...field}/>
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <label htmlFor="email">E-Mail:*</label>
                <input type="email" id="email" placeholder="E-Mail" {...field}/>
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

    const RepeatedPassword = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="repeatedPassword">Repeat password:</label>
                    <input type="password" className="is-invalid" id="repeatedPassword" placeholder="Repeat password" {...field} />
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <label htmlFor="repeatedPassword">Repeat password:</label>
                <input type="password" id="repeatedPassword" placeholder="Repeat password" {...field} />
            </Fragment>
        );
    }

    const validationSchema = yup.object({
        firstName: yup.string().required("First name is a required field").max(30, "First name must be at most 30 characters"),
        email: yup.string().email("Email must be a valid").required("Email is a required field"),
        password: yup.string().required("Password is a required field").max(50, "Password must be at most 50 characters").min(6, "Password must be at least 6 characters"),
        repeatedPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Repeat password is a required field"),
    });

    const createUser = async (email, password, firstName, lastName) => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const submitHandler = async (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        const userData = {
            ...data,
        }

        try {
            await createUser(userData.email, userData.password, userData.firstName, userData.lastName);

            setSubmitting(false);
            resetForm(true);
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <section className="intro-panel register">
            <div className="container">
                <h1 className="headline h2">Register</h1>
                <Formik initialValues={{ firstName: '', lastName: '', email: '', password: '', repeatedPassword: '', }} onSubmit={submitHandler} validationSchema={validationSchema}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="row">
                                <div className="col-half">
                                    <NameField name="firstName" />
                                </div>
                                <div className="col-half">
                                    <LastNameField name="lastName" />
                                </div>
                            </div>
                            <EmailField name="email" />
                            <PasswordField name="password" />
                            <RepeatedPassword name="repeatedPassword" />
                            <div className="buttons-container">
                                <Link href="/login">
                                    <a className="button button-primary">Back to login</a>
                                </Link>
                                <button className="button button-primary" disabled={isSubmitting} type="submit">Submit</button>
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
    );
}

export default Register;

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