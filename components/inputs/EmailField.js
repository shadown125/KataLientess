import {useField} from "formik";
import {Fragment} from "react";

function EmailField (props, {placeholder = "E-Mail"}) {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    if (errorText) {
        return (
            <Fragment>
                <label htmlFor="email">E-Mail:*</label>
                <input type="email" id="email" className="is-invalid" placeholder={placeholder} {...field}/>
                <div className="error-message">{errorText}</div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <label htmlFor="email">E-Mail:*</label>
            <input type="email" id="email" placeholder={placeholder} {...field}/>
        </Fragment>
    );
}

export default EmailField;