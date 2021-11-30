import PageHeader from "../components/layout/PageHeader";
import PageBody from "../components/layout/PageBody";
import MainNavigation from "../components/layout/MainNavigation";
import TodosLayout from "../components/todos/TodosLayout";
import Backdrop from "../components/layout/Backdrop";
import {Fragment, useState} from "react";

function HomePage () {
    const [state, setState] = useState(false);

    const onSettingMainNavigationState = (state) => {
        setState(() => {
            return state
        });
    }

    return (
        <Fragment>
            <div className="wrapper">
                <div className="app-container">
                    <PageHeader onSettingMainNavigationState={onSettingMainNavigationState} />
                    <PageBody>
                        <MainNavigation currentMainNavigationState={state} />
                        <TodosLayout />
                    </PageBody>
                </div>
            </div>
            <Backdrop currentMainNavigationState={state} />
        </Fragment>
    );
}

export default HomePage;