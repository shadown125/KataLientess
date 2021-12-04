import {useState, Fragment} from 'react';
import Notification from "../elements/Notification";
import {Formik, Form, useField} from "formik";
import * as yup from 'yup';

function AddTodo (props) {
    const [notActive, setNotActive] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function onRemovingActive() {
        setNotActive(false);
        setSubmitted(false);

        props.removeActive(notActive);
    }

    const TitleField = (props) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : '';
        if (errorText) {
            return (
                <Fragment>
                    <label htmlFor="title">Title:*</label>
                    <input placeholder="Title for your task" className="title is-invalid" id="title" {...field} />
                    <div className="error-message">{errorText}</div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <label htmlFor="title">Title:*</label>
                <input placeholder="Title for your task" id="title" {...field} />
            </Fragment>
        );
    }

    const TextareaField = (props) => {
        const [field] = useField(props);
        return (
            <Fragment>
                <label htmlFor="description">Description:</label>
                <textarea id="description" placeholder="Description text for your Task (optional)" {...field} />
            </Fragment>
        );
    }

    const validationSchema = yup.object({
        title: yup.string().required().max(50),
    })

    const submitHandler = (data, {setSubmitting, resetForm}) => {
        setSubmitted(true);
        setSubmitting(true);

        const todoData = {
            ...data,
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        }

        props.onSaveTodoData(todoData);

        setSubmitting(false);
        resetForm(true);
    }

    return (
        <section className={`new-todo${props.activeTodo ? ' is-active' : ''}`}>
            <Notification successMessage={submitted} />
            <div className="container">
                <button className="button button--medium icon-cross" onClick={onRemovingActive}>
                    <span>Close button</span>
                </button>
                <Formik initialValues={{ title: '', description: '' }} onSubmit={submitHandler} validationSchema={validationSchema}>
                    {({ isSubmitting }) => (
                        <Form>
                            <TitleField type="input" name="title" />
                            <TextareaField name="description" />
                            <button className="button button-primary" disabled={isSubmitting} type="submit">Add Todo</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}

export default AddTodo;