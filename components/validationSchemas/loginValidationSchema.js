import * as yup from "yup";

export const loginValidationSchema = yup.object({
    email: yup.string().email("Email must be a valid").required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
})