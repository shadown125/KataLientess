import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form} from "formik";
import {getSession} from "next-auth/react";
import PasswordField from "../../../components/inputs/PasswordField";
import RepeatedPassword from "../../../components/inputs/RepeatedPassword";
import {settingsPasswordValidationSchema} from "../../../components/validationSchemas/settingsPasswordValidationSchema";
import {GetServerSideProps} from "next";
import {PasswordDataInterface} from "../../../interfaces/PasswordDataInterface";

function SettingsPassword(props: {onSettingModeState: Function, currentModeState: string}) {

    const PasswordFieldCustom = (props: {name: string}) => {
        return PasswordField(props, {placeholder: 'New password'})
    }

    const RepeatedPasswordCustom = (props: {name: string}) => {
        return RepeatedPassword(props, {placeholder: "Repeat new password"})
    }

    const onSettingModeState = (state: string) => {
        props.onSettingModeState(state);
    }

    const changeExistingPassword = async (passwordData: PasswordDataInterface) => {
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

    const submitHandler = async (data: PasswordDataInterface, {setSubmitting, resetForm}: {setSubmitting: Function, resetForm: Function}) => {
        setSubmitting(true);

        const passwordData = {
            ...data
        }

        try {
            await changeExistingPassword(passwordData);
            setSubmitting(false);
            resetForm(true);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <Fragment>
            <HomePage onSettingModeState={onSettingModeState} currentModeState={props.currentModeState} />
            <section className="settings">
                <Link href='/'>
                    <a className="button button--medium icon-cross" />
                </Link>
                <Profile />
                <Formik initialValues={{ password: '', repeatedPassword: '' }} onSubmit={submitHandler} validationSchema={settingsPasswordValidationSchema} >
                    {({ isSubmitting }) => (
                        <Form>
                            <PasswordFieldCustom name="password" />
                            <RepeatedPasswordCustom name="repeatedPassword" />
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

export default SettingsPassword;

export const getServerSideProps: GetServerSideProps = async (context) => {
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