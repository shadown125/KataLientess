import { useEffect, useState } from 'react';
import TodoItem from "./TodoItem";
import useSWR from "swr";
import LoadingTodos from "../loading-skeletons/LoadingTodos";

function Todos(props) {
    const [activeAddTodo, setIsActiveAddTodo] = useState(true);
    const [newTodos, setNewTodos] = useState([]);

    const {data, error} = useSWR('/api/user/getAllTodos', (url) => fetch(url).then(res => res.json()), { refreshInterval: 10 });

    useEffect(() => {
        if (data) {
            setNewTodos(data.todos);
            props.todosAmount(data.todos.length);
        }
    }, [data, props])

    function setActiveAddTodo() {
        setIsActiveAddTodo(true);

        props.onSettingActiveAddTodo(activeAddTodo);
    }
    if (!data) {
        return (
            <LoadingTodos addTodo={setActiveAddTodo} />
        )
    }

    return (
        <div className="todos">
            <div className="head-container">
                <h2 className="headline h5">In Progression</h2>
                <ul>
                    <li className="add-todo">
                        <button className="button button-primary" type="button" onClick={setActiveAddTodo}>
                            <span>
                                Add Todo
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="main-container">
                <ul className="todo-list">
                    {newTodos.map((todo, index) => (
                        <TodoItem id={todo.id} key={index} title={todo.title} description={todo.description} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todos;