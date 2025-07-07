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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ birthDate });
      setAge(calculateAge(birthDate));
      const [
        svgMatrixChartProps,
        healthCartFirst,
        healthCartSecond,
        healthCartThird,
      ] = calculateMatrix(birthDate);

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
      {" "}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputContainer}>
            <h1 className={styles.title}>Введіть дату народження</h1>
            <input
              type="date"
              id="BirthDate"
              name="BirthDate"
              value={birthDate}
              onChange={(e) => {
                const value = e.target.value;
                setBirthDate(value);
              }}
              className={styles.input}
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
