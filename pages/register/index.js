import Link from "next/link";
import {Formik, Form} from "formik";
import * as yup from 'yup';
import {getSession} from "next-auth/react";
import NameField from "../../components/inputs/NameField";
import LastNameField from "../../components/inputs/LastNameField";
import EmailField from "../../components/inputs/EmailField";
import PasswordField from "../../components/inputs/PasswordField";
import RepeatedPassword from "../../components/inputs/RepeatedPassword";
import ImageField from "../../components/inputs/ImageField";

function Register() {

    /**
     * @returns {number}
     */
    function getFullYear() {
        return new Date().getFullYear();
    }

    const ImageFieldCustom = (props) => {
        return ImageField(props, {label: 'Profile image'});
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
                <Formik initialValues={{ firstName: '', lastName: '', email: '', image: '', password: '', repeatedPassword: '', }} onSubmit={submitHandler} validationSchema={validationSchema}>
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
                            <div className="row">
                                <div className="col-half">
                                    <EmailField name="email" />
                                </div>
                                <div className="col-half">
                                    <ImageFieldCustom name="image" />
                                </div>
                            </div>
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