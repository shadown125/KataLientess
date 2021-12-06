import {useField} from "formik";
import {Fragment} from "react";

function TitleField (props) {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    if (errorText) {
        return (
            <Fragment>
                <label htmlFor="title">Title:*</label>
                <input type="input" placeholder="Title for your task" className="title is-invalid" id="title" {...field} />
                <div className="error-message">{errorText}</div>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <label htmlFor="title">Title:*</label>
            <input type="input" placeholder="Title for your task" id="title" {...field} />
        </Fragment>
    );
}

export default TitleField;