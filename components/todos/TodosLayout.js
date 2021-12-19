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
        if (props.allDoneTodos) {
            setDoneTodos(props.allDoneTodos);
            setDoneTodosLength(props.allDoneTodos.length);
        } else {
            if (data) {
                setDoneTodos(data.doneTodos);
                setDoneTodosLength(data.doneTodos.length);
            }
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

    const allTodosAfterDeleteAction = (todos) => {
        props.allTodosAfterDeleteAction(todos);
    }

    const allTodosAfterCompleteAction = (todos) => {
        props.allTodosAfterCompleteAction(todos);
    }

    const allDoneTodosAfterDeletingDoneTodo = (doneTodos) => {
        props.allDoneTodosAfterDeletingDoneTodo(doneTodos);
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
                <DoneTodos doneTodos={doneTodos} allDoneTodosAfterDeletingDoneTodo={allDoneTodosAfterDeletingDoneTodo} />
            </section>
        );
    }

    return (
        <section className="todos-container">
            <ProgressionBar doneTodosData={data} todosAmount={todosLength} doneTodosLength={doneTodosLength} todoPage={true}/>
            <Todos onSettingActiveAddTodo={onSettingActiveAddTodo} todosAmount={todosAmount} allTodos={props.allTodos} allTodosAfterDeleteAction={allTodosAfterDeleteAction} allTodosAfterCompleteAction={allTodosAfterCompleteAction} />
        </section>
    );
}

export default TodosLayout;