function LoadingProgressionBar (props) {
    const date = new Date();

    function getCurrentDay() {
        return date.getDate();
    }


    function getCurrentMonth() {
        return date.toLocaleString('default', { month: 'long' }).substring(0, 3);
    }

    return (
        <div className="progression-bar is-loading">
            <div className="date">
                <span className="day">{getCurrentDay()}</span>
                <span className="month">{getCurrentMonth()}</span>
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
                    {props.todoPage && (
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