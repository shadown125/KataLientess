import { useState } from 'react';
import TodoItem from "./TodoItem";

function Todos(props) {
    const [activeAddTodo, setIsActiveAddTodo] = useState(true);

    function setActiveAddTodo() {
        setIsActiveAddTodo(true);

        props.onSettingActiveAddTodo(activeAddTodo);
    }

    return (
        <div className="todos">
            <div className="head-container">
                <h2 className="headline h5">In Progression</h2>
                <ul>
                    <li className="add-todo">
                        <button className="button button-primary" type="button" onClick={setActiveAddTodo}>Add Todo</button>
                    </li>
                </ul>
            </div>
            <div className="main-container">
                <ul className="todo-list">
                    {props.todosItems.map((todo) => (
                        <TodoItem key={todo.id} title={todo.title} description={todo.description} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todos;