import LoadingProgressionBar from "../loading-skeletons/LoadingProgressionBar";

function ProgressionBar(props) {
    const date = new Date();
    const doneTodosCounter = props.doneTodosLength;
    const todosCounter = props.todosAmount;
    const total = doneTodosCounter + todosCounter;
    let percent = doneTodosCounter * 100 / total;
    if (!props.todoPage) {
        percent = 100;
    }

    /**
     * @returns {number}
     */
    function getCurrentDay() {
        return date.getDate();
    }

    /**
     * @returns {string}
     */
    function getCurrentMonth() {
        return date.toLocaleString('default', { month: 'long' }).substring(0, 3);
    }

    if (!props.doneTodosData) {
        return (
            <LoadingProgressionBar todoPage={props.todoPage} />
        )
    }

    return (
        <div className="progression-bar">
            <div className="date">
                <span className="day">{getCurrentDay()}</span>
                <span className="month">{getCurrentMonth()}</span>
            </div>
            <div className="content">
                <h2 className="headline h4">Today Tasks</h2>
                <div className="bar">
                    <div className="progressed-bar" style={{width: `${percent}%`}}/>
                </div>
                <div className="descriptions">
                    <span className="done-todos">Done Todos: {props.doneTodosLength}</span>
                    {props.todoPage && (
                        <span className="in-progress-todos">In progress Todos: {props.todosAmount}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProgressionBar;