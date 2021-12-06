import * as yup from "yup";

export const settingsImageValidationSchema = yup.object({
    image: yup.string().required(),
});