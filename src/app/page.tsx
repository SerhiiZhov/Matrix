"use client";

import SingleMatrix from "@/components/singleMatrix/SingleMatrix";
import styles from "./page.module.scss";
import { useState } from "react";
import Lovematrix from "@/components/lovematrix/Lovematrix";

export default function Home() {
  const [variant, setVariant] = useState<string | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {variant && (
          <button
            onClick={() => setVariant(null)}
            className={styles.backButton}
          >
            ⬅ Назад
          </button>
        )}
        {variant === "1" ? (
          <SingleMatrix />
        ) : variant === "2" ? (
          <Lovematrix />
        ) : null}

        {!variant && (
          <div className={styles.btnWrapper}>
            <button
              onClick={() => setVariant("1")}
              className={styles.mainButton}
            >
              Персональна матриця
            </button>
            <button
              onClick={() => setVariant("2")}
              className={styles.mainButton}
            >
              Матриця сумісності
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
