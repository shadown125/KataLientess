import { useState, useRef } from 'react';
import Notification from "../elements/Notification";

function AddTodo (props) {
    const [notActive, setNotActive] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    function onRemovingActive() {
        setNotActive(false);
        setSubmitted(false);

        props.removeActive(notActive);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setSubmitted(true);

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const todoData = {
            title: enteredTitle,
            description: enteredDescription,
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        }
        props.onSaveTodoData(todoData);
        titleInputRef.current.value = '';
        descriptionInputRef.current.value = '';
    }

    return (
        <section className={`new-todo${props.activeTodo ? ' is-active' : ''}`}>
            <Notification successMessage={submitted} />
            <div className="container">
                <button className="button button--medium icon-cross" onClick={onRemovingActive}>
                    <span>Close button</span>
                </button>
                <form onSubmit={submitHandler}>
                    <label htmlFor="title">Title:*</label>
                    <input type="text" name="title" className="title" id="title" placeholder="Title for your task" ref={titleInputRef} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" placeholder="Description text for your Task (optional)" ref={descriptionInputRef} />
                    <button className="button button-primary" type="submit">Add Todo</button>
                </form>
            </div>
        </section>
    );
}

export default AddTodo;