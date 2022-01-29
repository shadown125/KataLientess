function LoadingDoneTodos () {
    return (
        <div className="todos is-loading" data-testid='done-todos-is-loading'>
            <div className="head-container">
                <h2 className="headline h5">Already done</h2>
            </div>
            <div className="main-container">
                <ul className="todo-list is-done">
                    <li>
                        <div className="header">
                            <div className="headline-loading">
                                <h3 className="headline h5">Lorem ipsum</h3>
                            </div>
                            <ul className="actions">
                                <li>
                                    <button className="button" type="button" />
                                </li>
                            </ul>
                        </div>
                        <div className="main">
                            <p>
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus alias atque culpa
                                </span>
                            </p>
                            <p>
                                <span>
                                    deleniti dicta ea eius esse ipsa, iusto minus nemo nobis optio quaerat quam, similique sit veniam voluptatibus?
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="header">
                            <div className="headline-loading">
                                <h3 className="headline h5">Lorem ipsum</h3>
                            </div>
                            <ul className="actions">
                                <li>
                                    <button className="button" type="button" />
                                </li>
                            </ul>
                        </div>
                        <div className="main">
                            <p>
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus alias atque culpa
                                </span>
                            </p>
                            <p>
                                <span>
                                    deleniti dicta ea eius esse ipsa, iusto minus nemo nobis optio quaerat quam, similique sit veniam voluptatibus?
                                </span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LoadingDoneTodos;