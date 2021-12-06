import * as yup from "yup";

export const addTodoValidationSchema = yup.object({
    title: yup.string().required().max(50),
});