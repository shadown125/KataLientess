import {object, string} from "yup";

export const addTodoValidationSchema = () => {
    return object({
        title: string().required("Title is a required field").max(50),
    });
}