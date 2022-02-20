import {useState} from 'react';
import Notification from "../elements/Notification";
import {Formik, Form} from "formik";
import TitleField from "../inputs/TitleField";
import TextareaField from "../inputs/TextareaField";
import {addTodoValidationSchema} from "../validationSchemas/addTodoValidationSchema";
import {useSession} from "next-auth/react";
import {mutate} from "swr";

function AddTodo (props: {removeActive: Function, activeTodo: boolean}) {
    const [notActive, setNotActive] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState(false);
    const { data: session, status } = useSession();

    function onRemovingActive() {
        setNotActive(false);
        setSubmitted(false);

        props.removeActive(notActive);
    }

    const createTodo = async (email: string, title: string, description: string) => {
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

    const submitHandler = async (data: {title: string, description: string}, {setSubmitting, resetForm}: {setSubmitting: Function, resetForm: Function}) => {
        setSubmitting(true);

        const todoData = {
            ...data,
        }

        try {
            await createTodo(session!.user!.email as string, todoData.title, todoData.description);

            setSubmitted(true);
            setSubmitting(false);
            resetForm(true);
            await mutate('/api/user/getDoneTodos');
            await mutate('/api/user/getAllTodosAndDoneTodos');
            await mutate('/api/user/getAllTodos');
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <section className={`new-todo${props.activeTodo ? ' is-active' : ''}`} data-testid="add-todo-popup">
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
                            <button className="button button-primary" disabled={isSubmitting} type="submit" data-testid="add-todo-submit">
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