"use client";
import { useState } from "react";
import * as yup from "yup";
import SvgMatrix from "@/components/svg-matrix/SvgMatrix";
import styles from "./page.module.scss";
import { validationSchema } from "@/lib/yup";

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [matrixNumbers, setMatrixNumbers] = useState(null);
  const [healthCart1, setHealthCart1] = useState(null);
  const [healthCart2, setHealthCart2] = useState(null);
  const [healthCart3, setHealthCart3] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ birthDate });
      const [year, month, day] = String(birthDate).split("-");
      const а = checkTwentyTwo(day);
      const б = checkTwentyTwo(month);
      const в = checkTwentyTwo(
        [...year].reduce((acc, value) => acc + +value, 0)
      );
      const г = checkTwentyTwo(а + б + в);
      const д = checkTwentyTwo(а + б + в + г);
      const е = checkTwentyTwo(а + б);
      const ж = checkTwentyTwo(б + в);
      const з = checkTwentyTwo(а + г);
      const и = checkTwentyTwo(в + г);
      const а1 = checkTwentyTwo(а + д);
      const е1 = checkTwentyTwo(е + д);
      const б1 = checkTwentyTwo(б + д);
      const ж1 = checkTwentyTwo(ж + д);
      const в1 = checkTwentyTwo(в + д);
      const и1 = checkTwentyTwo(и + д);
      const г1 = checkTwentyTwo(г + д);
      const з1 = checkTwentyTwo(з + д);
      const а2 = checkTwentyTwo(а + а1);
      const е2 = checkTwentyTwo(е + е1);
      const б2 = checkTwentyTwo(б + б1);
      const ж2 = checkTwentyTwo(ж + ж1);
      const в2 = checkTwentyTwo(в + в1);
      const и2 = checkTwentyTwo(и + и1);
      const г2 = checkTwentyTwo(г + г1);
      const з2 = checkTwentyTwo(з + з1);
      const а3 = checkTwentyTwo(а1 + д);
      const б3 = checkTwentyTwo(б1 + д);
      const и3 = checkTwentyTwo(г1 + в1);
      const и4 = checkTwentyTwo(г1 + и3);
      const и5 = checkTwentyTwo(в1 + и3);

      const svgMatrixChartProps = {
        А: а,
        Б: б,
        В: в,
        Г: г,
        Д: д,
        Е: е,
        Ж: ж,
        З: з,
        И: и,
        А1: а1,
        Б1: б1,
        В1: в1,
        Г1: г1,
        Е1: е1,
        Ж1: ж1,
        З1: з1,
        И1: и1,
        А2: а2,
        Б2: б2,
        В2: в2,
        Г2: г2,
        Е2: е2,
        Ж2: ж2,
        З2: з2,
        И2: и2,
        А3: а3,
        Б3: б3,
        И3: и3,
        И4: и4,
        И5: и5,
      };

      setMatrixNumbers(svgMatrixChartProps);

      const healthCartFirst = {
        sahasrara: svgMatrixChartProps?.А,
        ajna: svgMatrixChartProps?.А2,
        wishudha: svgMatrixChartProps?.А1,
        anahata: svgMatrixChartProps?.А3,
        manipura: svgMatrixChartProps?.Д,
        svadhistana: svgMatrixChartProps?.В1,
        muladhara: svgMatrixChartProps?.В,
      };
      const healthCartSecond = {
        sahasrara: svgMatrixChartProps?.Б,
        ajna: svgMatrixChartProps?.Б2,
        wishudha: svgMatrixChartProps?.Б1,
        anahata: svgMatrixChartProps?.Б3,
        manipura: svgMatrixChartProps?.Д,
        svadhistana: svgMatrixChartProps?.Г1,
        muladhara: svgMatrixChartProps?.Г,
      };
      const healthCartThird = {
        sahasrara: svgMatrixChartProps?.Е,
        ajna: checkTwentyTwo(svgMatrixChartProps?.А2 + svgMatrixChartProps?.Б2),
        wishudha: checkTwentyTwo(
          svgMatrixChartProps?.А1 + svgMatrixChartProps?.Б1
        ),
        anahata: checkTwentyTwo(
          svgMatrixChartProps?.А3 + svgMatrixChartProps?.Б3
        ),
        manipura: checkTwentyTwo(
          svgMatrixChartProps?.Д + svgMatrixChartProps?.Д
        ),
        svadhistana: checkTwentyTwo(
          svgMatrixChartProps?.Г1 + svgMatrixChartProps?.В1
        ),
        muladhara: checkTwentyTwo(
          svgMatrixChartProps?.В + svgMatrixChartProps?.Г
        ),
      };

      setHealthCart1(healthCartFirst);
      setHealthCart2(healthCartSecond);
      setHealthCart3(healthCartThird);

      setError("");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      }
    } finally {
      setBirthDate("");
    }
  };

  function removeLeadingZeros(number) {
    return Number(number);
  }

  function sumAllDigits(number) {
    return String(number)
      .split("")
      .map(Number)
      .reduce((acc, value) => acc + value, 0);
  }

  function checkTwentyTwo(number) {
    number = removeLeadingZeros(number);
    return number > 22 ? sumAllDigits(number) : number;
  }

  function sumObjectValues(obj) {
    return Object.values(obj).reduce((acc, value) => acc + value, 0);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.matrixChartSectionWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputContainer}>
                <h1 className={styles.title}>Введіть дату народження</h1>
                <input
                  type="date"
                  id="BirthDate"
                  name="BirthDate"
                  value={birthDate}
                  onBlur={handleSubmit}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={styles.input}
                />
                {error && <p className={styles.errorText}>{error}</p>}
              </div>
            </div>
          </form>
          <SvgMatrix matrixNumbers={matrixNumbers} />
          <h2>
            сахасрара{matrixNumbers?.А}:{matrixNumbers?.Б}:{matrixNumbers?.Е}
          </h2>
          <h2>
            аджна{matrixNumbers?.А2}:{matrixNumbers?.Б2}:
            {checkTwentyTwo(matrixNumbers?.А2 + matrixNumbers?.Б2)}
          </h2>
          <h2>
            вішудха{matrixNumbers?.А1}:{matrixNumbers?.Б1}:
            {checkTwentyTwo(matrixNumbers?.А1 + matrixNumbers?.Б1)}
          </h2>
          <h2>
            анахата{matrixNumbers?.А3}:{matrixNumbers?.Б3}:{" "}
            {checkTwentyTwo(matrixNumbers?.А3 + matrixNumbers?.Б3)}
          </h2>
          <h2>
            маніпура{matrixNumbers?.Д}:{matrixNumbers?.Д}:{" "}
            {checkTwentyTwo(matrixNumbers?.Д + matrixNumbers?.Д)}
          </h2>
          <h2>
            свадхістана{matrixNumbers?.В1}:{matrixNumbers?.Г1}:{" "}
            {checkTwentyTwo(matrixNumbers?.Г1 + matrixNumbers?.В1)}
          </h2>
          <h2>
            муладхара{matrixNumbers?.В}:{matrixNumbers?.Г}:{" "}
            {checkTwentyTwo(matrixNumbers?.В + matrixNumbers?.Г)}
          </h2>
          <h2>
            суму{healthCart1 && checkTwentyTwo(sumObjectValues(healthCart1))}:
            {healthCart2 && checkTwentyTwo(sumObjectValues(healthCart2))}:
            {healthCart3 && checkTwentyTwo(sumObjectValues(healthCart3))}
          </h2>
          <br />
          <br />
          <br />
          <h3>Особисте призначення</h3>
          {checkTwentyTwo(
            checkTwentyTwo(matrixNumbers?.Б + matrixNumbers?.Г) +
              checkTwentyTwo(matrixNumbers?.В + matrixNumbers?.А)
          )}
          <h3>Соціальне призначенни </h3>
          {checkTwentyTwo(
            checkTwentyTwo(matrixNumbers?.Е + matrixNumbers?.И) +
              checkTwentyTwo(matrixNumbers?.Ж + matrixNumbers?.З)
          )}
          <h3>Духовна грамотність </h3>
          {checkTwentyTwo(
            checkTwentyTwo(
              checkTwentyTwo(matrixNumbers?.Б + matrixNumbers?.Г) +
                checkTwentyTwo(matrixNumbers?.В + matrixNumbers?.А)
            ) +
              checkTwentyTwo(
                checkTwentyTwo(matrixNumbers?.Е + matrixNumbers?.И) +
                  checkTwentyTwo(matrixNumbers?.Ж + matrixNumbers?.З)
              )
          )}
          <h3>Планетарная грамотність </h3>
          {checkTwentyTwo(
            checkTwentyTwo(
              checkTwentyTwo(matrixNumbers?.Е + matrixNumbers?.И) +
                checkTwentyTwo(matrixNumbers?.Ж + matrixNumbers?.З)
            ) +
              checkTwentyTwo(
                checkTwentyTwo(
                  checkTwentyTwo(matrixNumbers?.Б + matrixNumbers?.Г) +
                    checkTwentyTwo(matrixNumbers?.В + matrixNumbers?.А)
                ) +
                  checkTwentyTwo(
                    checkTwentyTwo(matrixNumbers?.Е + matrixNumbers?.И) +
                      checkTwentyTwo(matrixNumbers?.Ж + matrixNumbers?.З)
                  )
              )
          )}
        </div>
      </div>
    </section>
  );
}
