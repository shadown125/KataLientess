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
import {useContext, useState} from "react";
import {name, url} from "../../lib/cloudinaryApi";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {CreateUserInterface} from "../../interfaces/CreateUserInterface";
import DataPrivacy from "../../components/elements/DataPrivacy";
import {BackgroundFilterContext} from "../../components/context/backgroundFilterContext";
import Footer from "../../components/layout/Footer";
import Notification from "../../components/elements/Notification";

function Register() {
    const {state} = useContext(BackgroundFilterContext);
    const [currentImage, setCurrentImage] = useState<File>();
    const router = useRouter();
    const [notification, setNotification] = useState<string>('');

    const createUser = async (email: string, password: string, firstName: string, lastName: string) => {
        if (currentImage !== undefined) {
            const image = new FormData();
            image.append("file", currentImage);
            image.append('upload_preset', name!);

            const response = await fetch(url!, {
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
            })

            const data = await response.json();

            if (!response.ok) {
                setNotification(data.message);
                throw new Error(data.message || 'Something went wrong!');
            }

            await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            })

            await router.replace('/');

            return data;
        }

        const image = '/dummyProfileImage.jpg';
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
            setNotification(data.message);
            throw new Error(data.message || 'Something went wrong!');
        }

        await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        })

        await router.replace('/');

        return data;
    }

    const submitHandler = async (data: CreateUserInterface, {setSubmitting, resetForm}: {setSubmitting: Function, resetForm: Function}) => {
        setSubmitting(true);

        const userData = {
            ...data,
        }

        try {
            await createUser(userData.email, userData.password, userData.firstName, userData.lastName);

            setSubmitting(false);
            resetForm(true);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <>
            <div className="wrapper">
                <div className="app-container">
                    <main className="intro-panel">
                        <section className="register">
                            <div className="container">
                                <h1 className="headline h2" data-testid="register">Register</h1>
                                {notification && (
                                    <Notification successMessage={notification} />
                                )}
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
                                                    <ImageFieldRegister name="image" onChange={async (event: Event) => {
                                                        const target = event.target as HTMLInputElement;

                                                        setFieldValue("image", target.files);

                                                        if (target.files && target.files[0]) {
                                                            const file = target.files[0];

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
                                <Footer/>
                            </div>
                        </section>
                        <DataPrivacy active={state} />
                        <div className={`backdrop${state ? ' is-active-full' : ''}`} />
                    </main>
                </div>
            </div>
        </>
    );
}

export default Register;

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