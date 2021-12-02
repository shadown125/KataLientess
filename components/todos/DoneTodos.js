import DoneTodoItem from "./DoneTodoItem";

function DoneTodos() {
    return (
        <div className="todos">
            <div className="head-container">
                <h2 className="headline h5">Already done</h2>
            </div>
            <div className="main-container">
                <ul className="todo-list is-done">
                    <DoneTodoItem key={1} title={'Lorem Ipsum'} description={'Lorem ipsum dolor'} />
                    <DoneTodoItem key={2} title={'Lorem Ipsum'} description={'Lorem ipsum dolor'} />
                </ul>
            </div>
        </div>
    );
}

export default DoneTodos;