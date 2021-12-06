import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form, useField} from "formik";
import * as yup from 'yup';
import {getSession} from "next-auth/react";
import ImageField from "../../../components/inputs/ImageField";

function SettingsImage() {

    const validationSchema = yup.object({
        image: yup.string().required(),
    })

    const submitHandler = (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        const imageData = {
            ...data,
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        }

        setSubmitting(false);
        resetForm(true);
    }

    return (
        <Fragment>
            <HomePage />
            <section className="settings">
                <Link href='/'>
                    <a className="button button--medium icon-cross" />
                </Link>
                <Profile />
                <Formik initialValues={{ image: ''}} onSubmit={submitHandler} validationSchema={validationSchema}>
                    {({ isSubmitting }) => (
                        <Form>
                            <ImageField name="image" />
                            <div className="buttons-container">
                                <Link href="/settings">
                                    <a className="button button-primary">Back</a>
                                </Link>
                                <button className="button button-primary" disabled={isSubmitting} type="submit">Save</button>
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