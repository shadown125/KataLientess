import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form, useField} from "formik";
import * as yup from 'yup';
import {getSession} from "next-auth/react";

function SettingsPassword() {

    const PasswordField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="is-invalid" placeholder="New password" {...field} />
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="New password" {...field} />
            </Fragment>
        );
    }

    const RepeatedPassword = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="repeatedPassword">Repeat new password:</label>
                    <input type="password" className="is-invalid" id="repeatedPassword" placeholder="Repeat new password" {...field} />
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <label htmlFor="repeatedPassword">Repeat new password:</label>
                <input type="password" id="repeatedPassword" placeholder="Repeat new password" {...field} />
            </Fragment>
        );
    }

    const changeExistingPassword = async (passwordData) => {
        const response = await fetch('/api/user/changePassword', {
            method: 'PATCH',
            body: JSON.stringify(passwordData),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const validationSchema = yup.object({
        password: yup.string().required("Password is a required field").max(50, "Password must be at most 50 characters").min(6, "Password must be at least 6 characters"),
        repeatedPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Repeat password is a required field"),
    })

    const submitHandler = async (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        const passwordData = {
            ...data
        }

        try {
            await changeExistingPassword(passwordData);
            setSubmitting(false);
            resetForm(true);
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
                <Formik initialValues={{ password: '', repeatedPassword: '' }} onSubmit={submitHandler} validationSchema={validationSchema} >
                    {({ isSubmitting }) => (
                        <Form>
                            <PasswordField name="password" />
                            <RepeatedPassword name="repeatedPassword" />
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

export default SettingsPassword;

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