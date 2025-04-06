import * as yup from "yup";

export const validationSchema = yup.object({
  birthDate: yup
    .string()
    .required("Дата народження обов'язкова")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Будь-ласка, введіть корректну дату (DD-MM-YYYY)"
    ),
});
