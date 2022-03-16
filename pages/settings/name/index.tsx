import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form} from "formik";
import {getSession} from "next-auth/react";
import NameField from "../../../components/inputs/NameField";
import LastNameField from "../../../components/inputs/LastNameField";
import {settingsNameValidationSchema} from "../../../components/validationSchemas/settingsNameValidationSchema";
import {mutate} from "swr";
import {NameDataInterface} from "../../../interfaces/NameDataInterface";
import {GetServerSideProps} from "next";

function SettingsName() {

    const changeUsername = async (firstName: string, lastName: string) => {
        const response = await fetch('/api/user/changeUsername', {
            method: 'PATCH',
            body: JSON.stringify({
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

    const NameFieldCustom = (props: {name: string}) => {
        return NameField(props, {placeholder: 'Your new name', label: 'Change name:*'});
    }

    const LastNameFieldCustom = (props: {name: string}) => {
        return LastNameField(props, {placeholder: 'Your new last name', label: 'Change last name:'})
    }

    const submitHandler = async (data: NameDataInterface, {setSubmitting, resetForm}: {setSubmitting: Function, resetForm: Function}) => {
        setSubmitting(true);

        const nameData = {
            ...data
        }

        try {
            await changeUsername(nameData.firstName, nameData.lastName);

            setSubmitting(false);
            resetForm(true);

            await mutate('/api/user/getProfile');
        } catch (error) {
            throw new Error(error as string);
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
                <Formik initialValues={{ firstName: '', lastName: '' }} onSubmit={submitHandler} validationSchema={settingsNameValidationSchema} >
                    {({ isSubmitting }) => (
                        <Form>
                            <NameFieldCustom name="firstName" />
                            <LastNameFieldCustom name="lastName" />
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

export default SettingsName;

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