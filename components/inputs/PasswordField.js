import {useField} from "formik";
import {Fragment} from "react";

function PasswordField (props, {placeholder = 'Password', label = 'Password:*'}) {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    if (errorText) {
        return (
            <Fragment>
                <label htmlFor="password">{label}</label>
                <input type="password" id="password" className="is-invalid" placeholder={placeholder} {...field} />
                <div className="error-message">{errorText}</div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <label htmlFor="password">{label}</label>
            <input type="password" id="password" placeholder={placeholder} {...field} />
        </Fragment>
    );
}

export default PasswordField;