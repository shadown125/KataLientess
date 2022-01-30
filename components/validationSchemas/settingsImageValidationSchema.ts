import {object, string} from "yup";

export const settingsImageValidationSchema = () => {
    return object({
        image: string().required(),
    });
}