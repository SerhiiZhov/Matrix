import React from "react";
import styles from "./destinyCards.module.scss";

interface MatrixNumbers {
  [key: string]: number | undefined;
  А?: number;
  Б?: number;
  В?: number;
  Г?: number;
  Е?: number;
  Ж?: number;
  З?: number;
  И?: number;
}

interface DestinyCardsProps {
  matrixNumbers: MatrixNumbers;
  checkTwentyTwo: (value: number) => number;
}

const DestinyCards: React.FC<DestinyCardsProps> = ({
  matrixNumbers,
  checkTwentyTwo,
}) => {
  const personalDestiny = checkTwentyTwo(
    checkTwentyTwo((matrixNumbers?.Б || 0) + (matrixNumbers?.Г || 0)) +
      checkTwentyTwo((matrixNumbers?.В || 0) + (matrixNumbers?.А || 0))
  );

  const socialDestiny = checkTwentyTwo(
    checkTwentyTwo((matrixNumbers?.Е || 0) + (matrixNumbers?.И || 0)) +
      checkTwentyTwo((matrixNumbers?.Ж || 0) + (matrixNumbers?.З || 0))
  );

  const spiritualLiteracy = checkTwentyTwo(
    checkTwentyTwo(
      checkTwentyTwo((matrixNumbers?.Б || 0) + (matrixNumbers?.Г || 0)) +
        checkTwentyTwo((matrixNumbers?.В || 0) + (matrixNumbers?.А || 0))
    ) +
      checkTwentyTwo(
        checkTwentyTwo((matrixNumbers?.Е || 0) + (matrixNumbers?.И || 0)) +
          checkTwentyTwo((matrixNumbers?.Ж || 0) + (matrixNumbers?.З || 0))
      )
  );

  const planetaryLiteracy = checkTwentyTwo(
    checkTwentyTwo(
      checkTwentyTwo((matrixNumbers?.Е || 0) + (matrixNumbers?.И || 0)) +
        checkTwentyTwo((matrixNumbers?.Ж || 0) + (matrixNumbers?.З || 0))
    ) +
      checkTwentyTwo(
        checkTwentyTwo(
          checkTwentyTwo((matrixNumbers?.Б || 0) + (matrixNumbers?.Г || 0)) +
            checkTwentyTwo((matrixNumbers?.В || 0) + (matrixNumbers?.А || 0))
        ) +
          checkTwentyTwo(
            checkTwentyTwo((matrixNumbers?.Е || 0) + (matrixNumbers?.И || 0)) +
              checkTwentyTwo((matrixNumbers?.Ж || 0) + (matrixNumbers?.З || 0))
          )
      )
  );

  const cards = [
    {
      title: "ОСОБИСТЕ ПРИЗНАЧЕННЯ",
      description:
        "З'єднання чоловічого і жіночого. Вибудовування взаємин. Здібності, навички, вміння.",
      value: personalDestiny || 0,
      bgColor: "#f3f4f6",
    },
    {
      title: "СОЦІАЛЬНЕ ПРИЗНАЧЕННЯ",
      description:
        "Соціально та родова системи. Результати та призначення в соціумі.",
      value: socialDestiny || 0,
      bgColor: "#e5e7eb",
    },
    {
      title: "ДУХОВНА ГРАМОТНІСТЬ",
      description: "Духовний залік. Хто я для бога? Де божественне в мені?",
      value: spiritualLiteracy || 0,
      bgColor: "#d1d5db",
    },
    {
      title: "ПЛАНЕТАРНА ГРАМОТНІСТЬ",
      description:
        "Планетарний рівень розвитку. Внесок у розвиток планети та людства.",
      value: planetaryLiteracy || 0,
      bgColor: "#9ca3af",
    },
  ];

  return (
    <div className={styles.container}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={styles.card}
          style={{ backgroundColor: card.bgColor }}
        >
          <div>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.description}>{card.description}</p>
          </div>
          <div className={styles.value}>{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DestinyCards;
