import DoneTodoItem from "./DoneTodoItem";

function DoneTodos(props) {
    return (
        <div className="todos">
            <div className="head-container">
                <h2 className="headline h5">Already done</h2>
            </div>
            <div className="main-container">
                <ul className="todo-list is-done">
                    {props.doneTodos.map((todo, index) => (
                        <DoneTodoItem id={todo.id} key={index} title={todo.title} description={todo.description} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DoneTodos;