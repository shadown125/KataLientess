import Link from "next/link";
import {Formik, Form} from "formik";
import {getSession, signIn} from "next-auth/react";
import NameField from "../../components/inputs/NameField";
import LastNameField from "../../components/inputs/LastNameField";
import EmailField from "../../components/inputs/EmailField";
import PasswordField from "../../components/inputs/PasswordField";
import RepeatedPassword from "../../components/inputs/RepeatedPassword";
import ImageFieldRegister from "../../components/inputs/ImageFieldRegister";
import {registerValidationSchema} from "../../components/validationSchemas/registerValidationSchema";
import {useState} from "react";
import {name, url} from "../../lib/cloudinaryApi";
import {useRouter} from "next/router";
import {Year} from "../../components/elements/Year";

function Register() {
    const [currentImage, setCurrentImage] = useState('');
    const router = useRouter();

    const createUser = async (email, password, firstName, lastName) => {
        let image = '';

        if (currentImage !== '') {
            image = new FormData();
            image.append("file", currentImage);
            image.append('upload_preset', name);

            const response = await fetch(url, {
                method: 'POST',
                body: image,
            }).then(async response => response.json()).then(async (data) => {
                const image = data.secure_url;
                return await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password,
                        firstName,
                        lastName,
                        image
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            const result = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            })

            if (!result.error) {
                await router.replace('/');
            }

            return data;
        }

        image = '/dummyProfileImage.jpg';
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                image
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        })

        if (!result.error) {
            await router.replace('/');
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
                <Formik initialValues={{ firstName: '', lastName: '', email: '', image: '', password: '', repeatedPassword: '', }} onSubmit={submitHandler} validationSchema={registerValidationSchema}>
                    {({ isSubmitting , setFieldValue}) => (
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
                                    <ImageFieldRegister name="image" onChange={async (event) => {
                                        setFieldValue("image", event.target.files);
                                        if (event.target.files && event.target.files[0]) {
                                            const file = event.target.files[0];

                                            setCurrentImage(file);
                                        }
                                    }} />
                                </div>
                            </div>
                            <PasswordField name="password" />
                            <RepeatedPassword name="repeatedPassword" />
                            <div className="buttons-container">
                                <Link href="/login">
                                    <a className="button button-primary">Back to login</a>
                                </Link>
                                <button className="button button-primary" disabled={isSubmitting} type="submit">
                                    <span>Submit</span>
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