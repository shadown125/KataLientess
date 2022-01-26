import {object, string} from "yup";

export const loginValidationSchema = () => {
    return object({
        email: string().email("Email must be a valid").required("Email is a required field"),
        password: string().required("Password is a required field"),
    })
}