import {useField} from "formik";
import {Fragment} from "react";

function RepeatedPassword (props, {placeholder = 'Repeat password', label = 'Repeat password'}) {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    if (errorText) {
        return (
            <Fragment>
                <label htmlFor="repeatedPassword">{label}</label>
                <input type="password" className="is-invalid" id="repeatedPassword" placeholder={placeholder} {...field} />
                <div className="error-message">{errorText}</div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <label htmlFor="repeatedPassword">{label}</label>
            <input type="password" id="repeatedPassword" placeholder={placeholder} {...field} />
        </Fragment>
    );
}

export default RepeatedPassword;