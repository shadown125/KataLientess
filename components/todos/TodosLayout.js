import Todos from "./Todos";
import ProgressionBar from "./ProgressionBar";

function TodosLayout() {
    return (
        <section className="todos-container">
            <ProgressionBar />
            <Todos />
        </section>
    );
}

export default TodosLayout;