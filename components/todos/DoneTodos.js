import DoneTodoItem from "./DoneTodoItem";
import useSWR from "swr";
import LoadingDoneTodos from "../loading-skeletons/LoadingDoneTodos";

function DoneTodos() {

    const {isValidating, data, error} = useSWR('/api/user/getDoneTodos', (url) => fetch(url).then(res => res.json()));

    return (
        <>
            { isValidating && !error ?
                (
                    <LoadingDoneTodos />
                ) : (
                    <div className="todos">
                        <div className="head-container">
                            <h2 className="headline h5" data-testid="done-todos-heading">Already done</h2>
                        </div>
                        <div className="main-container">
                            <ul className="todo-list is-done">
                                {data.doneTodos.map((todo, index) => (
                                    <DoneTodoItem id={todo.id} key={index} title={todo.title} description={todo.description} />
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default DoneTodos;