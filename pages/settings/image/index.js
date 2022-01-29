import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment, useState} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form} from "formik";
import {getSession} from "next-auth/react";
import ImageField from "../../../components/inputs/ImageField";
import {settingsImageValidationSchema} from "../../../components/validationSchemas/settingsImageValidationSchema";
import {url, name} from "../../../lib/cloudinaryApi";
import {mutate} from "swr";

function SettingsImage() {
    const [currentImage, setCurrentImage] = useState('');

    const addProfileImage = async () => {
        const image = new FormData();
        image.append("file", currentImage);
        image.append('upload_preset', name);

        const response = await fetch(url, {
            method: 'POST',
            body: image,
        }).then(async response => response.json()).then(async (data) => {
            const image = data.secure_url;
            return await fetch('/api/user/uploadImage', {
                method: 'POST',
                body: JSON.stringify({image}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    const submitHandler = async (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        try {
            await addProfileImage();
            setSubmitting(false);
            resetForm(true);
            await mutate('/api/user/getProfile');
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <Fragment>
            <HomePage />
            <section className="settings">
                <Link href='/'>
                    <a className="button button--medium icon-cross" />
                </Link>
                <Profile />
                <Formik initialValues={{ image: ''}} enableReinitialize={true} onSubmit={submitHandler} validationSchema={settingsImageValidationSchema}>
                    {({ isSubmitting , setFieldValue}) => (
                        <Form>
                            <ImageField name="image" onChange={async (event) => {
                                setFieldValue("image", event.target.files);
                                if (event.target.files && event.target.files[0]) {
                                    const file = event.target.files[0];

                                    setCurrentImage(file);
                                }
                            }} />
                            <div className="buttons-container">
                                <Link href="/settings">
                                    <a className="button button-primary" data-testid="back-to-settings">Back</a>
                                </Link>
                                <button className="button button-primary" disabled={isSubmitting} type="submit" data-testid="save">
                                    <span>Save</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
            <FullActiveBackdrop />
        </Fragment>
    );
}

export default SettingsImage;

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