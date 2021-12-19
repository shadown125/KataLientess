import {Form, Formik} from "formik";

function TodoItem (props) {

    const deleteTodo = async () => {
        const response = await fetch('/api/user/deleteTodo', {
            method: 'POST',
            body: JSON.stringify({
                id: props.id
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async response => response.json()).then(async () => {
            return await fetch('/api/user/getAllTodos');
        });

        const data = await response.json();
        await props.allTodosAfterDeleteAction(data.todos);

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    const completeTodo = async () => {
        const response = await fetch('/api/user/completeTodo', {
            method: 'POST',
            body: JSON.stringify({
                id: props.id
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async response => response.json()).then(async () => {
            return await fetch('/api/user/getAllTodosAndDoneTodos');
        });

        const data = await response.json();
        await props.allTodosAfterCompleteAction(data);

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    const submitDeleteHandler = async (data, {setSubmitting}) => {
        setSubmitting(true);

        try {
            await deleteTodo();
            setSubmitting(false);

        } catch (error) {
            throw new Error(error);
        }
    }

    const submitCompleteHandler = async (data, {setSubmitting}) => {
        setSubmitting(true);

        try {
            await completeTodo();
            setSubmitting(false);

        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <li>
            <div className="header">
                <h3 className="headline h5">{props.title}</h3>
                <ul className="actions">
                    <li>
                        <Formik initialValues={{ }} onSubmit={submitCompleteHandler} >
                            {({ isSubmitting }) => (
                                <Form>
                                    <button className="button icon-check" disabled={isSubmitting} type="submit" />
                                </Form>
                            )}
                        </Formik>
                    </li>
                    <li>
                        <Formik initialValues={{ }} onSubmit={submitDeleteHandler} >
                            {({ isSubmitting }) => (
                                <Form>
                                    <button className="button icon-cross" disabled={isSubmitting} type="submit" />
                                </Form>
                            )}
                        </Formik>
                    </li>
                </ul>
            </div>
            <div className="main">
                <p>
                    {props.description}
                </p>
            </div>
        </li>
    );
}

export default TodoItem;