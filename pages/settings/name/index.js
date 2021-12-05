import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form, useField} from "formik";
import * as yup from 'yup';
import {getSession} from "next-auth/react";

function SettingsName() {

    const NameField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="firstName">Change first name:</label>
                    <input id="firstName" className="is-invalid" placeholder="Your new name" {...field}/>
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <label htmlFor="firstName">Change first name:</label>
                <input id="firstName" placeholder="Your new name" {...field}/>
            </Fragment>
        );
    }

    const LastNameField = (props) => {
        const [field] = useField(props);
        return (
            <Fragment>
                <label htmlFor="lastName">Change last name:</label>
                <input type="input" placeholder="Your new last name" id="lastName" {...field} />
            </Fragment>
        );
    }

    const validationSchema = yup.object({
        firstName: yup.string().required("First name is a required field").max(30, "First name must be at most 30 characters"),
    })
    
    const submitHandler = (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        const nameData = {
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
                <Formik initialValues={{ firstName: '', lastName: '' }} onSubmit={submitHandler} validationSchema={validationSchema} >
                    {({ isSubmitting }) => (
                        <Form>
                            <NameField type="input" name="firstName" />
                            <LastNameField name="lastName" />
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

export default SettingsName;

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