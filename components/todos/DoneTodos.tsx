import DoneTodoItem from "./DoneTodoItem";
import useSWR from "swr";
import LoadingDoneTodos from "../loading-skeletons/LoadingDoneTodos";
import {ObjectId} from "mongodb";
import {fetcher} from "../../lib/fetcher";

function DoneTodos() {
    const {isValidating, data, error} = useSWR('/api/user/getDoneTodos', fetcher);

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
                                {data.doneTodos.map((todo: {id: ObjectId, title: string, description: string}, index: number) => (
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