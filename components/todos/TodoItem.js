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
        });

        const data = await response.json();

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
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    return (
        <li>
            <div className="header">
                <h3 className="headline h5">{props.title}</h3>
                <ul className="actions">
                    <li>
                        <button className="button icon-check" type="button" onClick={completeTodo} />
                    </li>
                    <li>
                        <button className="button icon-bubble" type="button" />
                    </li>
                    <li>
                        <button className="button icon-cross" type="button" onClick={deleteTodo} />
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