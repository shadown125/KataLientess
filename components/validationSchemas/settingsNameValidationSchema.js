import * as yup from "yup";

export const settingsNameValidationSchema = yup.object({
    firstName: yup.string().required("First name is a required field").max(30, "First name must be at most 30 characters"),
});