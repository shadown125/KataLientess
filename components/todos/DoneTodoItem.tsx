import {Form, Formik} from "formik";
import {mutate} from "swr";
import {ObjectId} from "mongodb";

function DoneTodoItem(props: {id: ObjectId, title: string, description: string}) {

    const deleteDoneTodo = async () => {
        const response = await fetch('/api/user/deleteDoneTodo', {
            method: 'POST',
            body: JSON.stringify({
                id: props.id
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    const submitDeleteHandler = async (data: {}, {setSubmitting}: {setSubmitting: Function}) => {
        setSubmitting(true);

        try {
            await deleteDoneTodo();
            setSubmitting(false);
            await mutate('/api/user/getDoneTodos');
            await mutate('/api/user/getAllTodosAndDoneTodos');
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <li>
            <div className="header">
                <h3 className="headline h5">{props.title}</h3>
                <ul className="actions">
                    <li>
                        <Formik initialValues={{ }} onSubmit={submitDeleteHandler} >
                            {({ isSubmitting }) => (
                                <Form>
                                    <button className="button icon-cross" disabled={isSubmitting} type="submit">
                                        <span>Delete</span>
                                    </button>
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

export default DoneTodoItem;