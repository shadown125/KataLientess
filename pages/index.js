import PageHeader from "../components/layout/PageHeader";
import PageBody from "../components/layout/PageBody";
import MainNavigation from "../components/layout/MainNavigation";
import TodosLayout from "../components/todos/TodosLayout";
import Backdrop from "../components/layout/Backdrop";
import AddTodo from "../components/todos/AddTodo";
import {Fragment, useState} from "react";
import {getSession} from "next-auth/react";

function HomePage () {
    const [state, setState] = useState(false);
    const [addTodoState, setAddTodoState] = useState(false);
    const [todos, setTodos] = useState([]);
    const [allTodos, setAllTodos] = useState();
    const [doneTodos, setDoneTodos] = useState();

    const onSettingMainNavigationState = (state) => {
        setState(() => {
            return state
        });
    }

    function onSettingActiveAddTodoState (state) {
        setAddTodoState(() => {
            return state;
        })
    }

    function onRemoveActive(state) {
        setAddTodoState(()=> {
            return state;
        })
    }

    const getAllTodosAfterAddingTodo = (todo) => {
        setAllTodos(() => {
            return todo
        })
    }

    const allTodosAfterDeleteAction = (todo) => {
        setAllTodos(() => {
            return todo;
        })
    }

    const allTodosAfterCompleteAction = (todos) => {
        setAllTodos(() => {
            return todos.todos
        })
        setDoneTodos(() => {
            return todos.doneTodos
        })
    }

    const allDoneTodosAfterDeletingDoneTodo = (doneTodos) => {
        setDoneTodos(() => {
            return doneTodos
        })
    }

    const saveTodoDataHandler = (enteredTodoData) => {
        setTodos([enteredTodoData, ...todos])
    }

    return (
        <Fragment>
            <div className="wrapper">
                <div className="app-container">
                    <PageHeader onSettingMainNavigationState={onSettingMainNavigationState} />
                    <PageBody>
                        <MainNavigation currentMainNavigationState={state}/>
                        <TodosLayout onSettingActiveAddTodo={onSettingActiveAddTodoState} allTodos={allTodos} allTodosAfterDeleteAction={allTodosAfterDeleteAction} allTodosAfterCompleteAction={allTodosAfterCompleteAction} allDoneTodos={doneTodos} allDoneTodosAfterDeletingDoneTodo={allDoneTodosAfterDeletingDoneTodo}/>
                    </PageBody>
                </div>
            </div>
            <AddTodo onSaveTodoData={saveTodoDataHandler} removeActive={onRemoveActive} activeTodo={addTodoState} allTodosAfterAddingTodo={getAllTodosAfterAddingTodo} />
            <Backdrop activeTodo={addTodoState} currentMainNavigationState={state} />
        </Fragment>
    );
}

export default HomePage;

export async function getServerSideProps(context) {
    const session = await getSession({
        req: context.req,
    })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: { session },
    }
}