import LoadingProgressionBar from "../loading-skeletons/LoadingProgressionBar";
import useSWR from "swr";
import {useRouter} from "next/router";
import {CurrentDay} from "../elements/CurrentDay";
import {CurrentMonth} from "../elements/CurrentMonth";

function ProgressionBar() {
    const router = useRouter();

    const {isValidating, data, error} = useSWR('/api/user/getAllTodosAndDoneTodos', (url) => fetch(url).then(res => res.json()));

    return (
        <>
            {isValidating && !error ?
                (
                    <LoadingProgressionBar />
                ) : (
                    <div className="progression-bar">
                        <div className="date">
                            <span className="day" data-testid='current-day'>{CurrentDay()}</span>
                            <span className="month" data-testid="current-month">{CurrentMonth()}</span>
                        </div>
                        <div className="content">
                            <h2 className="headline h4">Today Tasks</h2>
                            <div className="bar">
                                <div className="progressed-bar" style={{width: `${data.doneTodos.length * 100 / (data.todos.length + data.doneTodos.length)}%`}}/>
                            </div>
                            <div className="descriptions">
                                <span className="done-todos" data-testid="done-todos">Done Todos: {data.doneTodos.length}</span>
                                {router.pathname === '/' && (
                                    <span className="in-progress-todos" data-testid="in-progress-todos">In progress Todos: {data.todos.length}</span>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ProgressionBar;