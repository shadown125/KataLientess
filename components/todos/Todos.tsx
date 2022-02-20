import { useState } from 'react';
import TodoItem from "./TodoItem";
import useSWR from "swr";
import LoadingTodos from "../loading-skeletons/LoadingTodos";
import {ObjectId} from "mongodb";
import {fetcher} from "../../lib/fetcher";

function Todos(props: {onSettingActiveAddTodo: Function}) {
    const [activeAddTodo, setIsActiveAddTodo] = useState<boolean>(true);

    const {isValidating, data, error} = useSWR('/api/user/getAllTodos', fetcher);

    function setActiveAddTodo() {
        setIsActiveAddTodo(true);

        props.onSettingActiveAddTodo(activeAddTodo);
    }

    return (
        <>
            {isValidating && !error ?
                (
                    <LoadingTodos addTodo={setActiveAddTodo} />
                ) : (
                    <div className="todos">
                        <div className="head-container">
                            <h2 className="headline h5" data-testid="todos-heading">In Progression</h2>
                            <ul>
                                <li className="add-todo">
                                    <button className="button button-primary" type="button" onClick={setActiveAddTodo} data-testid="add-todo-button">
                                        <span>
                                            Add Todo
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="main-container">
                            <ul className="todo-list">
                                {data.todos.map((todo: {id: ObjectId, title: string, description: string}, index: number) => (
                                    <TodoItem id={todo.id} key={index} title={todo.title} description={todo.description} />
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Todos;