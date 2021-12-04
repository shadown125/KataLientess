import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment, useRef} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form, useField} from "formik";
import * as yup from 'yup';

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

    const validationSchema = yup.object({
        password: yup.string().required("Password is a required field").max(50, "Password must be at most 50 characters").min(6, "Password must be at least 6 characters"),
        repeatedPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    })

    const submitHandler = (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        const passwordData = {
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