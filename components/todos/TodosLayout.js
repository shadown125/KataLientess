import Todos from "./Todos";
import ProgressionBar from "./ProgressionBar";
import {useState} from "react";

function TodosLayout(props) {
    const [activeAddTodo, setIsActiveAddTodo] = useState(true);

    function onSettingActiveAddTodo() {
        setIsActiveAddTodo(true);

        props.onSettingActiveAddTodo(activeAddTodo);
    }

    return (
        <section className="todos-container">
            <ProgressionBar />
            <Todos todosItems={props.todoData} onSettingActiveAddTodo={onSettingActiveAddTodo} />
        </section>
    );
}

export default TodosLayout;