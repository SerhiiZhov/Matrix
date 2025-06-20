import * as yup from "yup";

export const validationSchema = yup.object({
  birthDate: yup
    .string()
    .required("Дата народження обов'язкова")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Будь-ласка, введіть корректну дату у форматі YYYY-MM-DD"
    )
    .test("not-in-future", "Дата не може бути у майбутньому", (value) => {
      if (!value) return false;
      const inputDate = new Date(value);
      const today = new Date();
      return inputDate <= today;
    }),
  /* .test("minimum-age", "Вам повинно бути не менше 13 років", (value) => {
      if (!value) return false;
      const birth = new Date(value);
      const today = new Date();
      const minAgeDate = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
      );
      return birth <= minAgeDate;
    }), */
});
