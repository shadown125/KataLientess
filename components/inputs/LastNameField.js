import {useField} from "formik";
import {Fragment} from "react";

function LastNameField (props, {placeholder = 'Last name', label = 'Last name:'}) {
    const [field] = useField(props);
    return (
        <Fragment>
            <label htmlFor="lastName">{label}</label>
            <input type="input" placeholder={placeholder} id="lastName" {...field} data-testid="settings-last-name" />
        </Fragment>
    );
}

export default LastNameField;