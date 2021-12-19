import Todos from "./Todos";
import ProgressionBar from "./ProgressionBar";
import DoneTodos from "./DoneTodos";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import useSWR from "swr";
import LoadingDoneTodos from "../loading-skeletons/LoadingDoneTodos";

function TodosLayout(props) {
    const [activeAddTodo, setIsActiveAddTodo] = useState(true);
    const router = useRouter();
    const routerPath = router.pathname;
    const [todosLength, setTodosLength] = useState();
    const [doneTodos, setDoneTodos] = useState([]);
    const [doneTodosLength, setDoneTodosLength] = useState();

    const {data, error} = useSWR('/api/user/getDoneTodos', (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if (data) {
            setDoneTodos(data.doneTodos);
            setDoneTodosLength(data.doneTodos.length);
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

    if (!data && routerPath === '/done-todos') {
        return (
            <section className="todos-container">
                <ProgressionBar doneTodosData={data} doneTodosLength={doneTodosLength} todoPage={false}/>
                <LoadingDoneTodos />
            </section>
        )
    }

    if (routerPath === '/done-todos') {
        return (
            <section className="todos-container">
                <ProgressionBar doneTodosData={data} doneTodosLength={doneTodosLength} todoPage={false}/>
                <DoneTodos doneTodos={doneTodos} />
            </section>
        );
    }

    return (
        <section className="todos-container">
            <ProgressionBar doneTodosData={data} todosAmount={todosLength} doneTodosLength={doneTodosLength} todoPage={true}/>
            <Todos onSettingActiveAddTodo={onSettingActiveAddTodo} todosAmount={todosAmount} />
        </section>
    );
}

export default TodosLayout;