import { useState } from 'react';
import Notification from "../elements/Notification";

function AddTodo (props) {
    const [notActive, setNotActive] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function onRemovingActive() {
        setNotActive(false);
        setSubmitted(false);

        props.removeActive(notActive);
    }

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        setSubmitted(false);
    }

    const descriptionChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
        setSubmitted(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        setSubmitted(true);
        const todoData = {
            title: enteredTitle,
            description: enteredDescription,
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        }
        props.onSaveTodoData(todoData);
        setEnteredTitle('');
        setEnteredDescription('');
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
                    <input type="text" name="title" className="title" id="title" value={enteredTitle} placeholder="Title for your task" onChange={titleChangeHandler} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" placeholder="Description text for your Task (optional)" value={enteredDescription}  onChange={descriptionChangeHandler} />
                    <button className="button button-primary" type="submit">Add Todo</button>
                </form>
            </div>
        </section>
    );
}

export default AddTodo;