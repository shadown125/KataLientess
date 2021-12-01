function TodoItem (props) {
    return (
        <li>
            <div className="header">
                <h3 className="headline h5">{props.title}</h3>
                <ul className="actions">
                    <li>
                        <button className="button icon-check" type="button" />
                    </li>
                    <li>
                        <button className="button icon-bubble" type="button" />
                    </li>
                    <li>
                        <button className="button icon-cross" type="button" />
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