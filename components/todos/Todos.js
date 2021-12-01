function Todos() {
    return (
        <div className="todos">
            <div className="head-container">
                <h2 className="headline h5">In Progression</h2>
                <ul>
                    <li className="add-todo">
                        <button className="button button-primary" type="button" >Add Todo</button>
                    </li>
                </ul>
            </div>
            <div className="main-container">
                <ul className="todo-list">
                    <li>
                        <div className="header">
                            <h3 className="headline h5">Lorem Ipsum</h3>
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium at atque,
                                consectetur ducimus earum, enim iste itaque iure natus placeat qui, quis quo sapiente sed totam vel voluptatum? Dolorem, voluptatem.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="header">
                            <h3 className="headline h5">Lorem Ipsum</h3>
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium at atque,
                                consectetur ducimus earum, enim iste itaque iure natus placeat qui, quis quo sapiente sed totam vel voluptatum? Dolorem, voluptatem.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Todos;