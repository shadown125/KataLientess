import {object, string} from "yup";

export const settingsNameValidationSchema = () => {
    return object({
        firstName: string().required("First name is a required field").max(30, "First name must be at most 30 characters"),
    });
}