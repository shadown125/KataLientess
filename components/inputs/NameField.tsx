import {useField} from "formik";
import {Fragment} from "react";

function NameField (props: {name: string}, {placeholder = 'Name', label = 'First name:*'}) {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    if (errorText) {
        return (
            <Fragment>
                <label htmlFor="firstName">{label}</label>
                <input id="firstName" className="is-invalid" placeholder={placeholder} {...field} />
                <div className="error-message">{errorText}</div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <label htmlFor="firstName">{label}</label>
            <input id="firstName" placeholder={placeholder} {...field} />
        </Fragment>
    );
}

export default NameField;