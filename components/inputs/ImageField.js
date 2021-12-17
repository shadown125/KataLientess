import {useField} from "formik";
import {Fragment} from "react";
import {useRouter} from "next/router";

function ImageField (props, {label = 'Change profile image*:'}) {
    const [field, meta] = useField(props);
    const {asPath} = useRouter();
    const errorText = meta.error && meta.touched ? meta.error : '';
    if (errorText && asPath !== '/register') {
        return (
            <Fragment>
                <label htmlFor="image">{label}</label>
                <input type="file" id="image" className="is-invalid" name={field.name} onBlur={field.onBlur} onChange={props.onChange} />
                <div className="error-message">{errorText}</div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <label htmlFor="image">{label}</label>
            <input type="file" id="image" name={field.name} onBlur={field.onBlur} onChange={props.onChange} />
        </Fragment>
    );
}

export default ImageField;