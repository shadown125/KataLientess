import * as yup from "yup";

export const settingsPasswordValidationSchema = yup.object({
    password: yup.string().required("Password is a required field").max(30, "Password must be at most 30 characters").min(6, "Password must be at least 6 characters").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        "Password must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
    ),
    repeatedPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Repeat password is a required field"),
})