import {useState} from 'react';
import Notification from "../elements/Notification";
import {Formik, Form} from "formik";
import TitleField from "../inputs/TitleField";
import TextareaField from "../inputs/TextareaField";
import {addTodoValidationSchema} from "../validationSchemas/addTodoValidationSchema";
import {useSession} from "next-auth/react";

function AddTodo (props) {
    const [notActive, setNotActive] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { data: session, status } = useSession();

    function onRemovingActive() {
        setNotActive(false);
        setSubmitted(false);

        props.removeActive(notActive);
    }

    const createTodo = async (email, title, description) => {
        const response = await fetch('/api/user/addTodo', {
            method: 'POST',
            body: JSON.stringify({
                email,
                title,
                description,
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

    const submitHandler = async (data, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        const todoData = {
            ...data,
        }

        try {
            await createTodo(session.user.email, todoData.title, todoData.description);

            setSubmitted(true);
            setSubmitting(false);
            resetForm(true);
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <section className={`new-todo${props.activeTodo ? ' is-active' : ''}`}>
            <Notification successMessage={submitted} />
            <div className="container">
                <button className="button button--medium icon-cross" onClick={onRemovingActive}>
                    <span>Close button</span>
                </button>
                <Formik initialValues={{ title: '', description: '' }} onSubmit={submitHandler} validationSchema={addTodoValidationSchema}>
                    {({ isSubmitting }) => (
                        <Form>
                            <TitleField name="title" />
                            <TextareaField name="description" />
                            <button className="button button-primary" disabled={isSubmitting} type="submit">
                                <span>Add Todo</span>
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}

export default AddTodo;