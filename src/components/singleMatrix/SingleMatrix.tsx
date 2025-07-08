import { FC } from "react";
import { validationSchema } from "@/lib/yup";
import { useState } from "react";
import * as yup from "yup";
import SvgMatrix from "@/components/svg-matrix/SvgMatrix";
import ChakraTable from "@/components/chakratable/chakraTable";
import DestinyCards from "@/components/destinycards/destinyCards";
import calculateMatrix from "@/utils/calculateMatrix";
import styles from "./SingleMatrix.module.scss";

const SingleMatrix: FC = () => {
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState<number | null>(null);
  type MatrixNumbers = {
    [key: string]: number;
  };
  const [matrixNumbers, setMatrixNumbers] = useState<MatrixNumbers | null>(
    null
  );
  type HealthCart = Record<string, number>;

  const [healthCart1, setHealthCart1] = useState<HealthCart | null>(null);
  const [healthCart2, setHealthCart2] = useState<HealthCart | null>(null);
  const [healthCart3, setHealthCart3] = useState<HealthCart | null>(null);

  const getMaxDayInMonth = (month: number, year: number): number => {
    if (!month || !year) return 31;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      return isLeapYear ? 29 : 28;
    }

    return daysInMonth[month - 1] || 31;
  };

  const formatDateInput = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) {
      const day = parseInt(numbers);
      if (day > 31) {
        return numbers.slice(0, 1);
      }
      return numbers;
    } else if (numbers.length <= 4) {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2);

      const monthNum = parseInt(month);
      if (monthNum > 12) {
        return `${day}.1`;
      }

      return `${day}.${month}`;
    } else if (numbers.length <= 8) {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2, 4);
      const year = numbers.slice(4);

      const monthNum = parseInt(month);
      if (monthNum > 12) {
        return `${day}.12.${year}`;
      }

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

      const dayNum = parseInt(day);
      const yearNum = parseInt(year);
      const maxDay = getMaxDayInMonth(monthNum, yearNum);

      if (dayNum > maxDay) {
        return `${maxDay.toString().padStart(2, "0")}.${month}.${year}`;
      }

      return `${day}.${month}.${year}`;
    }
  };

  const handleDateChange = (value: string) => {
    const formatted = formatDateInput(value);
    setBirthDate(formatted);
  };

  const validateDateInput = (formattedDate: string): boolean => {
    const parts = formattedDate.split(".");
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    const maxDay = getMaxDayInMonth(month, year);
    if (day > maxDay) return false;

    return true;
  };

  const convertToISO = (dateString: string): string => {
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
      if (!validateDateInput(birthDate)) {
        setError("Будь ласка, введіть коректну дату народження (ДД.ММ.ГГГГ)");
        return;
      }

      const dateForValidation = parseFormattedDate(birthDate);

      await validationSchema.validate({ birthDate: dateForValidation });
      setAge(calculateAge(dateForValidation));
      const [
        svgMatrixChartProps,
        healthCartFirst,
        healthCartSecond,
        healthCartThird,
      ] = calculateMatrix(dateForValidation);

      setMatrixNumbers(svgMatrixChartProps);
      setHealthCart1(healthCartFirst);
      setHealthCart2(healthCartSecond);
      setHealthCart3(healthCartThird);

      setError("");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      }
    }
  };

  function sumObjectValues(obj: Record<string, number>) {
    return Object.values(obj).reduce((acc, value) => acc + value, 0);
  }
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
    if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100))
      return "роки";
    return "років";
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputContainer}>
            <h1 className={styles.title}>Введіть дату народження</h1>

            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="ДД.ММ.ГГГГ"
              value={birthDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className={`${styles.input} ${styles.mobileInput}`}
              maxLength={10}
            />

            <input
              type="date"
              id="BirthDate"
              name="BirthDate"
              value={convertToISO(birthDate)}
              onChange={(e) => setBirthDate(convertFromISO(e.target.value))}
              className={`${styles.input} ${styles.desktopInput}`}
            />

            {error && <p className={styles.errorText}>{error}</p>}
            <button
              disabled={birthDate ? false : true}
              type="submit"
              className={styles.submitButton}
            >
              {birthDate ? "Розрахувати" : "Оберіть дату"}
            </button>
          </div>
        </div>
      </form>
      {age !== null && (
        <p className={styles.ageText}>
          Ваш вік: {age} {getAgeWord(age)}
        </p>
      )}
      <div className={styles.matrixChartSectionWrapper}>
        <div>
          <SvgMatrix matrixNumbers={matrixNumbers ? matrixNumbers : {}} />
        </div>
        <div style={{ order: -1 }}>
          <ChakraTable
            matrixNumbers={matrixNumbers ?? {}}
            healthCart1={healthCart1 ?? undefined}
            healthCart2={healthCart2 ?? undefined}
            healthCart3={healthCart3 ?? undefined}
            sumObjectValues={sumObjectValues}
          />
        </div>
      </div>
      <DestinyCards matrixNumbers={matrixNumbers ?? {}} />
    </>
  );
};

export default SingleMatrix;
