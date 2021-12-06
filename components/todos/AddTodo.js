import {useState} from 'react';
import Notification from "../elements/Notification";
import {Formik, Form} from "formik";
import TitleField from "../inputs/TitleField";
import TextareaField from "../inputs/TextareaField";
import {addTodoValidationSchema} from "../validationSchemas/addTodoValidationSchema";

function AddTodo (props) {
    const [notActive, setNotActive] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function onRemovingActive() {
        setNotActive(false);
        setSubmitted(false);

        props.removeActive(notActive);
    }

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
                <Formik initialValues={{ title: '', description: '' }} onSubmit={submitHandler} validationSchema={addTodoValidationSchema}>
                    {({ isSubmitting }) => (
                        <Form>
                            <TitleField name="title" />
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