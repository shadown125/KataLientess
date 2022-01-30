import {useRouter} from "next/router";
import {CurrentDay} from "../elements/CurrentDay";
import {CurrentMonth} from "../elements/CurrentMonth";

function LoadingProgressionBar () {
    const router = useRouter();

    return (
        <div className="progression-bar is-loading" data-testid="progression-bar-is-loading">
            <div className="date">
                <span className="day">{CurrentDay()}</span>
                <span className="month">{CurrentMonth()}</span>
            </div>
            <div className="content">
                <h2 className="headline h4">Today Tasks</h2>
                <div className="bar">
                    <div className="progressed-bar" style={{width: '100%'}}/>
                </div>
                <div className="descriptions">
                    <span className="done-todos">
                        <span>Done Todos: 0</span>
                    </span>
                    {router.pathname === '/' && (
                        <span className="in-progress-todos">
                            <span>In progress Todos: 0</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoadingProgressionBar;