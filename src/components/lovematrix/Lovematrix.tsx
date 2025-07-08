"use client";

import { FC, useState } from "react";
import * as yup from "yup";
import { validationSchema } from "@/lib/yup";
import SvgMatrix from "@/components/svg-matrix/SvgMatrix";
import ChakraTable from "@/components/chakratable/chakraTable";
import DestinyCards from "@/components/destinycards/destinyCards";
import calculateMatrix from "@/utils/calculateMatrix";
import styles from "./Lovematrix.module.scss";
import checkTwentyTwo from "@/utils/checkTwentyTwo";

const Lovematrix: FC = () => {
  const [birthDate1, setBirthDate1] = useState("");
  const [birthDate2, setBirthDate2] = useState("");
  const [error, setError] = useState("");
  const [combinedMatrixNumbers, setCombinedMatrixNumbers] =
    useState<MatrixNumbers>({});

  const [age1, setAge1] = useState<number | null>(null);
  const [age2, setAge2] = useState<number | null>(null);

  type MatrixNumbers = { [key: string]: number };
  type HealthCart = Record<string, number>;

  const [matrixNumbers1, setMatrixNumbers1] = useState<MatrixNumbers>({});
  const [matrixNumbers2, setMatrixNumbers2] = useState<MatrixNumbers>({});

  const [healthCart1_1, setHealthCart1_1] = useState<HealthCart>({});
  const [healthCart2_1, setHealthCart2_1] = useState<HealthCart>({});
  const [healthCart3_1, setHealthCart3_1] = useState<HealthCart>({});

  const [healthCart1_2, setHealthCart1_2] = useState<HealthCart>({});
  const [healthCart2_2, setHealthCart2_2] = useState<HealthCart>({});
  const [healthCart3_2, setHealthCart3_2] = useState<HealthCart>({});

  const getMaxDayInMonth = (month: number, year: number): number => {
    if (!month || !year) return 31;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Проверка на високосный год для февраля
    if (month === 2) {
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      return isLeapYear ? 29 : 28;
    }

    return daysInMonth[month - 1] || 31;
  };

  const formatDateInput = (value: string): string => {
    // Удаляем все нецифровые символы
    const numbers = value.replace(/\D/g, "");

    // Форматируем в ДД.ММ.ГГГГ с валидацией
    if (numbers.length <= 2) {
      // Валидация дня (максимум 31)
      const day = parseInt(numbers);
      if (day > 31) {
        return numbers.slice(0, 1);
      }
      return numbers;
    } else if (numbers.length <= 4) {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2);

      // Валидация месяца (максимум 12)
      const monthNum = parseInt(month);
      if (monthNum > 12) {
        return `${day}.1`;
      }

      return `${day}.${month}`;
    } else if (numbers.length <= 8) {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2, 4);
      const year = numbers.slice(4);

      // Валидация месяца
      const monthNum = parseInt(month);
      if (monthNum > 12) {
        return `${day}.12.${year}`;
      }

      // Валидация дня в зависимости от месяца
      const dayNum = parseInt(day);
      const yearNum = parseInt(year);
      const maxDay = getMaxDayInMonth(monthNum, yearNum);

      if (dayNum > maxDay) {
        return `${maxDay.toString().padStart(2, "0")}.${month}.${year}`;
      }

      return `${day}.${month}.${year}`;
    } else {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2, 4);
      const year = numbers.slice(4, 8);

      // Валидация месяца
      const monthNum = parseInt(month);
      if (monthNum > 12) {
        return `${day}.12.${year}`;
      }

      // Валидация дня в зависимости от месяца
      const dayNum = parseInt(day);
      const yearNum = parseInt(year);
      const maxDay = getMaxDayInMonth(monthNum, yearNum);

      if (dayNum > maxDay) {
        return `${maxDay.toString().padStart(2, "0")}.${month}.${year}`;
      }

      return `${day}.${month}.${year}`;
    }
  };

  const handleDateChange = (value: string, setter: (value: string) => void) => {
    const formatted = formatDateInput(value);
    setter(formatted);
  };

  const validateDateInput = (formattedDate: string): boolean => {
    const parts = formattedDate.split(".");
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    // Базовая валидация
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    // Проверка корректности дня для конкретного месяца
    const maxDay = getMaxDayInMonth(month, year);
    if (day > maxDay) return false;

    return true;
  };

  const convertToISO = (dateString: string): string => {
    // Преобразуем ДД.ММ.ГГГГ в ГГГГ-ММ-ДД для date input
    const parts = dateString.split(".");
    if (parts.length === 3 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
        2,
        "0"
      )}`;
    }
    return "";
  };

  const convertFromISO = (isoString: string): string => {
    // Преобразуем ГГГГ-ММ-ДД в ДД.ММ.ГГГГ
    if (isoString) {
      const date = new Date(isoString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return "";
  };

  const parseFormattedDate = (formattedDate: string): string => {
    // Конвертируем ДД.ММ.ГГГГ в формат для валидации ГГГГ-ММ-ДД
    const parts = formattedDate.split(".");
    if (parts.length === 3 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
        2,
        "0"
      )}`;
    }
    return formattedDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Дополнительная валидация для мобильных инпутов
      if (!validateDateInput(birthDate1)) {
        setError("Будь ласка, введіть коректну дату народження (ДД.ММ.ГГГГ)");
        return;
      }

      if (!validateDateInput(birthDate2)) {
        setError(
          "Будь ласка, введіть коректну дату народження партнера (ДД.ММ.ГГГГ)"
        );
        return;
      }

      // Конвертируем даты для валидации
      const date1ForValidation = parseFormattedDate(birthDate1);
      const date2ForValidation = parseFormattedDate(birthDate2);

      await validationSchema.validate({ birthDate: date1ForValidation });
      await validationSchema.validate({ birthDate: date2ForValidation });

      const [m1, h11, h12, h13] = calculateMatrix(date1ForValidation);
      setMatrixNumbers1(m1);
      setHealthCart1_1(h11);
      setHealthCart2_1(h12);
      setHealthCart3_1(h13);
      setAge1(calculateAge(date1ForValidation));

      const [m2, h21, h22, h23] = calculateMatrix(date2ForValidation);
      setMatrixNumbers2(m2);
      setHealthCart1_2(h21);
      setHealthCart2_2(h22);
      setHealthCart3_2(h23);
      setAge2(calculateAge(date2ForValidation));
      const combined = combineSvgMatrixProps(m1, m2);
      setCombinedMatrixNumbers(combined);
      setError("");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      }
    }
  };

  const combineSvgMatrixProps = (
    m1: Record<string, number>,
    m2: Record<string, number>
  ): Record<string, number> => {
    const result: Record<string, number> = {};

    const keys = new Set([...Object.keys(m1), ...Object.keys(m2)]);
    keys.forEach((key) => {
      const v1 = m1[key] ?? 0;
      const v2 = m2[key] ?? 0;
      result[key] = checkTwentyTwo(v1 + v2);
    });

    return result;
  };

  const calculateAge = (dateString: string): number => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getAgeWord = (age: number): string => {
    if (age % 10 === 1 && age % 100 !== 11) return "рік";
    if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
      return "роки";
    }
    return "років";
  };

  const sumObjectValues = (obj: Record<string, number>) => {
    return Object.values(obj).reduce((acc, val) => acc + val, 0);
  };

  return (
    <>
      <div className={styles.fromWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
              <h1 className={styles.title}>Введіть Вашу дату народження</h1>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="ДД.ММ.ГГГГ"
                value={birthDate1}
                onChange={(e) =>
                  handleDateChange(e.target.value, setBirthDate1)
                }
                className={`${styles.input} ${styles.mobileInput}`}
                maxLength={10}
              />

              <input
                type="date"
                value={convertToISO(birthDate1)}
                onChange={(e) => setBirthDate1(convertFromISO(e.target.value))}
                className={`${styles.input} ${styles.desktopInput}`}
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
              <h2 className={styles.title}>
                Введіть дату народження вашого партнера
              </h2>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="ДД.ММ.ГГГГ"
                value={birthDate2}
                onChange={(e) =>
                  handleDateChange(e.target.value, setBirthDate2)
                }
                className={`${styles.input} ${styles.mobileInput}`}
                maxLength={10}
              />

              <input
                type="date"
                value={convertToISO(birthDate2)}
                onChange={(e) => setBirthDate2(convertFromISO(e.target.value))}
                className={`${styles.input} ${styles.desktopInput}`}
              />
            </div>
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <button
            disabled={!birthDate1 || !birthDate2}
            type="submit"
            className={styles.submitButton}
            style={{ display: "block", margin: "0 auto" }}
          >
            {birthDate1 && birthDate2 ? "Розрахувати" : "Оберіть дати"}
          </button>
        </form>
      </div>
      <p className={styles.person}>Ваша матриця</p>
      {age1 !== null && (
        <p className={styles.ageText}>
          Ваш вік: {age1} {getAgeWord(age1)}
        </p>
      )}
      <div className={styles.matrixChartSectionWrapper}>
        <div>
          <SvgMatrix matrixNumbers={matrixNumbers1} />
        </div>
        <div style={{ order: -1 }}>
          <ChakraTable
            matrixNumbers={matrixNumbers1}
            healthCart1={healthCart1_1}
            healthCart2={healthCart2_1}
            healthCart3={healthCart3_1}
            sumObjectValues={sumObjectValues}
          />
        </div>
      </div>
      <DestinyCards matrixNumbers={matrixNumbers1} />

      <p className={styles.person}>Матриця партнера</p>
      {age2 !== null && (
        <p className={styles.ageText}>
          Вік партнера: {age2} {getAgeWord(age2)}
        </p>
      )}
      <div
        style={{ marginTop: "5.6rem" }}
        className={styles.matrixChartSectionWrapper}
      >
        <div>
          <SvgMatrix matrixNumbers={matrixNumbers2} />
        </div>
        <div style={{ order: -1 }}>
          <ChakraTable
            matrixNumbers={matrixNumbers2}
            healthCart1={healthCart1_2}
            healthCart2={healthCart2_2}
            healthCart3={healthCart3_2}
            sumObjectValues={sumObjectValues}
          />
        </div>
      </div>
      <DestinyCards matrixNumbers={matrixNumbers2} />
      <p className={styles.person}>Матриця сумісності</p>
      <div style={{ marginTop: "5.6rem" }}>
        <SvgMatrix matrixNumbers={combinedMatrixNumbers} />
      </div>
    </>
  );
};

export default Lovematrix;
