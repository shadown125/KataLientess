import Todos from "./Todos";
import ProgressionBar from "./ProgressionBar";
import DoneTodos from "./DoneTodos";
import {useState} from "react";
import {useRouter} from "next/router";

function TodosLayout(props: {onSettingActiveAddTodo: Function}) {
    const [activeAddTodo, setIsActiveAddTodo] = useState<boolean>(true);
    const router = useRouter();
    const routerPath = router.pathname;

    function onSettingActiveAddTodo() {
        setIsActiveAddTodo(true);

        props.onSettingActiveAddTodo(activeAddTodo);
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
            <ProgressionBar />
            <Todos onSettingActiveAddTodo={onSettingActiveAddTodo} />
        </section>
    );
}

export default TodosLayout;