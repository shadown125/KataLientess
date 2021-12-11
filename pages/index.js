import PageHeader from "../components/layout/PageHeader";
import PageBody from "../components/layout/PageBody";
import MainNavigation from "../components/layout/MainNavigation";
import TodosLayout from "../components/todos/TodosLayout";
import Backdrop from "../components/layout/Backdrop";
import AddTodo from "../components/todos/AddTodo";
import {Fragment, useState, useRef} from "react";
import {getSession} from "next-auth/react";

function HomePage (props) {
    const [state, setState] = useState(false);
    const [addTodoState, setAddTodoState] = useState(false);
    const [todos, setTodos] = useState([]);
    const createTodo= useRef(true);

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

    function onCreatedTodo(state) {
        createTodo.current = state;
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
                        <TodosLayout onSettingActiveAddTodo={onSettingActiveAddTodoState} isCreated={createTodo} />
                    </PageBody>
                </div>
            </div>
            <AddTodo onSaveTodoData={saveTodoDataHandler} removeActive={onRemoveActive} onCreatedTodo={onCreatedTodo} activeTodo={addTodoState} />
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