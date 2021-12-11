import Todos from "./Todos";
import ProgressionBar from "./ProgressionBar";
import DoneTodos from "./DoneTodos";
import {useState} from "react";
import {useRouter} from "next/router";

function TodosLayout(props) {
    const [activeAddTodo, setIsActiveAddTodo] = useState(true);
    const router = useRouter();
    const routerPath = router.pathname;
    const [todosLength, setTodosLength] = useState();

    function onSettingActiveAddTodo() {
        setIsActiveAddTodo(true);

        props.onSettingActiveAddTodo(activeAddTodo);
    }

    const todosAmount = (data) => {
        setTodosLength(() => {
            return data;
        });
    }

    if (routerPath === '/done-todos') {
        return (
            <section className="todos-container">
                <ProgressionBar />
                <DoneTodos />
            </section>
        );
    }

    return (
        <section className="todos-container">
            <ProgressionBar todosAmount={todosLength} />
            <Todos onSettingActiveAddTodo={onSettingActiveAddTodo} todosAmount={todosAmount} />
        </section>
    );
}

export default TodosLayout;