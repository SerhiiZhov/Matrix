"use client";
import { useState } from "react";
import * as yup from "yup";
import SvgMatrix from "@/components/svg-matrix/SvgMatrix";
import styles from "./page.module.scss";
import { validationSchema } from "@/lib/yup";
import ChakraTable from "@/components/chakratable/chakraTable";
import DestinyCards from "@/components/destinycards/destinyCards";

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState<number | null>(null);
  type MatrixNumbers = {
    [key: string]: any;
  };
  const [matrixNumbers, setMatrixNumbers] = useState<MatrixNumbers | null>(
    null
  );
  type HealthCart = {
    sahasrara: any;
    ajna: any;
    wishudha: any;
    anahata: any;
    manipura: any;
    svadhistana: any;
    muladhara: any;
  };

  const [healthCart1, setHealthCart1] = useState<HealthCart | null>(null);
  const [healthCart2, setHealthCart2] = useState<HealthCart | null>(null);
  const [healthCart3, setHealthCart3] = useState<HealthCart | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ birthDate });
      setAge(calculateAge(birthDate));
      const [year, month, day] = String(birthDate).split("-");
      const а = checkTwentyTwo(Number(day));
      const б = checkTwentyTwo(Number(month));
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
      const АЕ5 = checkTwentyTwo(а + е);
      const АЕ2_3 = checkTwentyTwo(а + АЕ5);
      const АЕ1_2 = checkTwentyTwo(а + АЕ2_3);
      const АЕ3_4 = checkTwentyTwo(АЕ5 + АЕ2_3);
      const АЕ7_8 = checkTwentyTwo(АЕ5 + е);
      const АЕ6_7 = checkTwentyTwo(АЕ5 + АЕ7_8);
      const АЕ8_9 = checkTwentyTwo(АЕ7_8 + е);
      const БЕ15 = checkTwentyTwo(б + е);
      const БЕ12_13 = checkTwentyTwo(е + БЕ15);
      const БЕ11_12 = checkTwentyTwo(е + БЕ12_13);
      const БЕ13_14 = checkTwentyTwo(БЕ15 + БЕ12_13);
      const БЕ17_18 = checkTwentyTwo(БЕ15 + б);
      const БЕ16_17 = checkTwentyTwo(БЕ15 + БЕ17_18);
      const БЕ18_19 = checkTwentyTwo(БЕ17_18 + б);
      const БЖ25 = checkTwentyTwo(б + ж);
      const БЖ22_23 = checkTwentyTwo(б + БЖ25);
      const БЖ21_22 = checkTwentyTwo(б + БЖ22_23);
      const БЖ23_24 = checkTwentyTwo(БЖ25 + БЖ22_23);
      const БЖ27_28 = checkTwentyTwo(БЖ25 + ж);
      const БЖ26_27 = checkTwentyTwo(БЖ25 + БЖ27_28);
      const БЖ28_29 = checkTwentyTwo(БЖ27_28 + ж);
      const ВЖ35 = checkTwentyTwo(в + ж);
      const ВЖ32_33 = checkTwentyTwo(ж + ВЖ35);
      const ВЖ31_32 = checkTwentyTwo(ж + ВЖ32_33);
      const ВЖ33_34 = checkTwentyTwo(ВЖ35 + ВЖ32_33);
      const ВЖ37_38 = checkTwentyTwo(ВЖ35 + в);
      const ВЖ36_37 = checkTwentyTwo(ВЖ35 + ВЖ37_38);
      const ВЖ38_39 = checkTwentyTwo(ВЖ37_38 + в);
      const ВИ45 = checkTwentyTwo(в + и);
      const ВИ42_43 = checkTwentyTwo(в + ВИ45);
      const ВИ41_42 = checkTwentyTwo(в + ВИ42_43);
      const ВИ43_44 = checkTwentyTwo(ВИ45 + ВИ42_43);
      const ВИ47_48 = checkTwentyTwo(ВИ45 + и);
      const ВИ46_47 = checkTwentyTwo(ВИ45 + ВИ47_48);
      const ВИ48_49 = checkTwentyTwo(ВИ47_48 + и);
      const ГИ55 = checkTwentyTwo(г + и);
      const ГИ52_53 = checkTwentyTwo(и + ГИ55);
      const ГИ51_52 = checkTwentyTwo(и + ГИ52_53);
      const ГИ53_54 = checkTwentyTwo(ГИ55 + ГИ52_53);
      const ГИ57_58 = checkTwentyTwo(ГИ55 + г);
      const ГИ56_57 = checkTwentyTwo(ГИ55 + ГИ57_58);
      const ГИ58_59 = checkTwentyTwo(ГИ57_58 + г);
      const ГЗ65 = checkTwentyTwo(г + з);
      const ГЗ62_63 = checkTwentyTwo(г + ГЗ65);
      const ГЗ61_62 = checkTwentyTwo(г + ГЗ62_63);
      const ГЗ63_64 = checkTwentyTwo(ГЗ65 + ГЗ62_63);
      const ГЗ67_68 = checkTwentyTwo(ГЗ65 + з);
      const ГЗ66_67 = checkTwentyTwo(ГЗ65 + ГЗ67_68);
      const ГЗ68_69 = checkTwentyTwo(ГЗ67_68 + з);
      const ЗА75 = checkTwentyTwo(з + а);
      const ЗА72_73 = checkTwentyTwo(з + ЗА75);
      const ЗА71_72 = checkTwentyTwo(з + ЗА72_73);
      const ЗА73_74 = checkTwentyTwo(ЗА75 + ЗА72_73);
      const ЗА77_78 = checkTwentyTwo(ЗА75 + а);
      const ЗА76_77 = checkTwentyTwo(ЗА75 + ЗА77_78);
      const ЗА78_79 = checkTwentyTwo(ЗА77_78 + а);

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
        АЕ5,
        АЕ2_3,
        АЕ1_2,
        АЕ3_4,
        АЕ7_8,
        АЕ6_7,
        АЕ8_9,
        БЕ15,
        БЕ12_13,
        БЕ11_12,
        БЕ13_14,
        БЕ17_18,
        БЕ16_17,
        БЕ18_19,
        БЖ25,
        БЖ22_23,
        БЖ21_22,
        БЖ23_24,
        БЖ27_28,
        БЖ26_27,
        БЖ28_29,
        ВЖ35,
        ВЖ32_33,
        ВЖ31_32,
        ВЖ33_34,
        ВЖ37_38,
        ВЖ36_37,
        ВЖ38_39,
        ВИ45,
        ВИ42_43,
        ВИ41_42,
        ВИ43_44,
        ВИ47_48,
        ВИ46_47,
        ВИ48_49,
        ГИ55,
        ГИ52_53,
        ГИ51_52,
        ГИ53_54,
        ГИ57_58,
        ГИ56_57,
        ГИ58_59,
        ГЗ65,
        ГЗ62_63,
        ГЗ61_62,
        ГЗ63_64,
        ГЗ67_68,
        ГЗ66_67,
        ГЗ68_69,
        ЗА75,
        ЗА72_73,
        ЗА71_72,
        ЗА73_74,
        ЗА77_78,
        ЗА76_77,
        ЗА78_79,
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
    }
  };

  function removeLeadingZeros(number: number) {
    return Number(number);
  }

  function sumAllDigits(number: number) {
    return String(number)
      .split("")
      .map(Number)
      .reduce((acc, value) => acc + value, 0);
  }

  function checkTwentyTwo(number: number) {
    number = removeLeadingZeros(number);
    return number > 22 ? sumAllDigits(number) : number;
  }

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
    <section className={styles.section}>
      <div className={styles.container}>
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
            {matrixNumbers && <SvgMatrix matrixNumbers={matrixNumbers} />}
          </div>
          <div style={{ order: -1 }}>
            <ChakraTable
              matrixNumbers={matrixNumbers ?? {}}
              checkTwentyTwo={checkTwentyTwo}
              healthCart1={healthCart1 ?? undefined}
              healthCart2={healthCart2 ?? undefined}
              healthCart3={healthCart3 ?? undefined}
              sumObjectValues={sumObjectValues}
            />
          </div>
        </div>
        <DestinyCards
          matrixNumbers={matrixNumbers ?? {}}
          checkTwentyTwo={checkTwentyTwo}
        />
      </div>
    </section>
  );
}
