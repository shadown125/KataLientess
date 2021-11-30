function ProgressionBar() {
    const date = new Date();

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

    return (
        <div className="progression-bar">
            <div className="date">
                <span className="day">{getCurrentDay()}</span>
                <span className="month">{getCurrentMonth()}</span>
            </div>
            <div className="content">
                <h2 className="headline h4">Today Tasks</h2>
                <div className="bar">
                    <div className="progressed-bar" />
                </div>
                <div className="descriptions">
                    <span className="done-todos">Done Todos: 4</span>
                    <span className="in-progress-todos">In progress Todos: 2</span>
                </div>
            </div>
        </div>
    );
}

export default ProgressionBar;