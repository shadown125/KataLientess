import * as yup from "yup";

export const registerValidationSchema = yup.object({
    firstName: yup.string().required("First name is a required field").max(25, "First name must be at most 25 characters"),
    email: yup.string().email("Email must be a valid").required("Email is a required field"),
    password: yup.string().required("Password is a required field").max(30, "Password must be at most 30 characters").min(6, "Password must be at least 6 characters").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        "Password must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
    ),
    repeatedPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Repeat password is a required field"),
});