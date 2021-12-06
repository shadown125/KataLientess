import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";
import {Formik, Form} from "formik";
import * as yup from 'yup';
import {getSession} from "next-auth/react";
import NameField from "../../../components/inputs/NameField";
import LastNameField from "../../../components/inputs/LastNameField";

function SettingsName() {

    const NameFieldCustom = (props) => {
        return NameField(props, {placeholder: 'Your new name', label: 'Change name:*'});
    }

    const LastNameFieldCustom = (props) => {
        return LastNameField(props, {placeholder: 'Your new last name', label: 'Change last name:'})
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
                            <NameFieldCustom name="firstName" />
                            <LastNameFieldCustom name="lastName" />
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