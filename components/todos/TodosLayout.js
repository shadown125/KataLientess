import Todos from "./Todos";
import ProgressionBar from "./ProgressionBar";
import DoneTodos from "./DoneTodos";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import useSWR from "swr";

function TodosLayout(props) {
    const [activeAddTodo, setIsActiveAddTodo] = useState(true);
    const router = useRouter();
    const routerPath = router.pathname;
    const [todosLength, setTodosLength] = useState();
    const [doneTodos, setDoneTodos] = useState([]);
    let doneTodosLength = 0;

    const {data, error} = useSWR('/api/user/getDoneTodos', (url) => fetch(url).then(res => res.json()), { refreshInterval: 10 });

    useEffect(() => {
        if (data) {
            setDoneTodos(data.doneTodos);
            doneTodosLength = data.doneTodos.length
        }
    }, [data, props]);

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
                <ProgressionBar doneTodosLength={doneTodosLength} />
                <DoneTodos />
            </section>
        );
    }

    return (
        <section className="todos-container">
            <ProgressionBar todosAmount={todosLength} doneTodosLength={doneTodosLength} />
            <Todos onSettingActiveAddTodo={onSettingActiveAddTodo} todosAmount={todosAmount} />
        </section>
    );
}

export default TodosLayout;