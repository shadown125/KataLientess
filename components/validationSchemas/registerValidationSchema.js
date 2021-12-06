import * as yup from "yup";

export const registerValidationSchema = yup.object({
    firstName: yup.string().required("First name is a required field").max(30, "First name must be at most 30 characters"),
    email: yup.string().email("Email must be a valid").required("Email is a required field"),
    password: yup.string().required("Password is a required field").max(50, "Password must be at most 50 characters").min(6, "Password must be at least 6 characters"),
    repeatedPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Repeat password is a required field"),
});