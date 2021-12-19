import { useEffect, useState } from 'react';
import TodoItem from "./TodoItem";
import useSWR from "swr";
import LoadingTodos from "../loading-skeletons/LoadingTodos";

function Todos(props) {
    const [activeAddTodo, setIsActiveAddTodo] = useState(true);
    const [newTodos, setNewTodos] = useState([]);
    const [updatedTodosLength, setUpdatedTodosLength] = useState();

    const {data, error} = useSWR('/api/user/getAllTodos', (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if (props.allTodos) {
            setNewTodos(props.allTodos);
            props.todosAmount(props.allTodos.length);
        } else {
            if (data) {
                setNewTodos(data.todos);
                props.todosAmount(data.todos.length)
            }
        }
    }, [data, props]);

    const allTodosAfterDeleteAction = (todos) => {
        props.allTodosAfterDeleteAction(todos);
    }

    const allTodosAfterCompleteAction = (todos) => {
        props.allTodosAfterCompleteAction(todos);
    }

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
                        <TodoItem id={todo.id} key={index} title={todo.title} description={todo.description} allTodosAfterDeleteAction={allTodosAfterDeleteAction} allTodosAfterCompleteAction={allTodosAfterCompleteAction} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todos;