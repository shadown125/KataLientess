import * as yup from "yup";

export const addTodoValidationSchema = yup.object({
    title: yup.string().required("Title is a required field").max(50),
});