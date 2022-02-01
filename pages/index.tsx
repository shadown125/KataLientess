import PageHeader from "../components/layout/PageHeader";
import PageBody from "../components/layout/PageBody";
import MainNavigation from "../components/layout/MainNavigation";
import TodosLayout from "../components/todos/TodosLayout";
import Backdrop from "../components/layout/Backdrop";
import AddTodo from "../components/todos/AddTodo";
import {Fragment, useState} from "react";
import {getSession} from "next-auth/react";
import type {GetServerSideProps} from "next";

function HomePage (props: {onSettingModeState: Function, currentModeState: string}) {
    const [state, setState] = useState<boolean>(false);
    const [addTodoState, setAddTodoState] = useState<boolean>(false);

    const onSettingMainNavigationState = (state: boolean) => {
        setState(() => {
            return state
        });
    }

    function onSettingActiveAddTodoState (state: boolean) {
        setAddTodoState(() => {
            return state;
        })
    }

    function onRemoveActive(state: boolean) {
        setAddTodoState(()=> {
            return state;
        })
    }

    const onSettingModeState = (state: string) => {
        props.onSettingModeState(state);
    }

    return (
        <Fragment>
            <div className="wrapper">
                <div className="app-container">
                    <PageHeader onSettingMainNavigationState={onSettingMainNavigationState} onSettingModeState={onSettingModeState} currentModeState={props.currentModeState} />
                    <PageBody>
                        <MainNavigation currentMainNavigationState={state}/>
                        <TodosLayout onSettingActiveAddTodo={onSettingActiveAddTodoState} />
                    </PageBody>
                </div>
            </div>
            <AddTodo removeActive={onRemoveActive} activeTodo={addTodoState} />
            <Backdrop activeTodo={addTodoState} currentMainNavigationState={state} />
        </Fragment>
    );
}

export default HomePage;

export const getServerSideProps: GetServerSideProps  = async (context) => {
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