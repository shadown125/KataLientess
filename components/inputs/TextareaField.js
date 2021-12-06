import {useField} from "formik";
import {Fragment} from "react";

function TextareaField (props) {
    const [field] = useField(props);
    return (
        <Fragment>
            <label htmlFor="description">Description:</label>
            <textarea id="description" placeholder="Description text for your Task (optional)" {...field} />
        </Fragment>
    );
}

export default TextareaField;