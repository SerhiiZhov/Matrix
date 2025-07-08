import React from "react";
import checkTwentyTwo from "@/utils/checkTwentyTwo";
type ChakraTableProps = {
  matrixNumbers: {
    [key: string]: number | undefined;
  };

  healthCart1?: { [key: string]: number };
  healthCart2?: { [key: string]: number };
  healthCart3?: { [key: string]: number };
  sumObjectValues?: (obj: { [key: string]: number }) => number;
};

const ChakraTable: React.FC<ChakraTableProps> = ({
  matrixNumbers,
  healthCart1,
  healthCart2,
  healthCart3,
  sumObjectValues,
}) => {
  const chakras = [
    {
      id: 1,
      name: "Сахасрара-чакра",
      description: "Місяц",
      color: "#8B5CF6",
      physics: matrixNumbers?.А || 0,
      energy: matrixNumbers?.Б || 0,
      emotions: matrixNumbers?.Е || 0,
    },
    {
      id: 2,
      name: "Аджна-чакра",
      description: "Дом, бргерия",
      color: "#3B82F6",
      physics: matrixNumbers?.А2 || 0,
      energy: matrixNumbers?.Б2 || 0,
      emotions: checkTwentyTwo
        ? checkTwentyTwo((matrixNumbers?.А2 || 0) + (matrixNumbers?.Б2 || 0))
        : 0,
    },
    {
      id: 3,
      name: "Вішудха-чакра",
      description: "Дар, скромества, самовираження",
      color: "#06B6D4",
      physics: matrixNumbers?.А1 || 0,
      energy: matrixNumbers?.Б1 || 0,
      emotions: checkTwentyTwo
        ? checkTwentyTwo((matrixNumbers?.А1 || 0) + (matrixNumbers?.Б1 || 0))
        : 0,
    },
    {
      id: 4,
      name: "Анахата-чакра",
      description: "Відносини, картина світу",
      color: "#10B981",
      physics: matrixNumbers?.А3 || 0,
      energy: matrixNumbers?.Б3 || 0,
      emotions: checkTwentyTwo
        ? checkTwentyTwo((matrixNumbers?.А3 || 0) + (matrixNumbers?.Б3 || 0))
        : 0,
    },
    {
      id: 5,
      name: "Маніпура-чакра",
      description: "Статус, партнерство, місце в соціумі, гроші",
      color: "#daad39",
      physics: matrixNumbers?.Д || 0,
      energy: matrixNumbers?.Д || 0,
      emotions: checkTwentyTwo
        ? checkTwentyTwo((matrixNumbers?.Д || 0) + (matrixNumbers?.Д || 0))
        : 0,
    },
    {
      id: 6,
      name: "Свадхістана-чакра",
      description: "Радість, задоволення",
      color: "#da8d4a",
      physics: matrixNumbers?.В1 || 0,
      energy: matrixNumbers?.Г1 || 0,
      emotions: checkTwentyTwo
        ? checkTwentyTwo((matrixNumbers?.Г1 || 0) + (matrixNumbers?.В1 || 0))
        : 0,
    },
    {
      id: 7,
      name: "Муладхара-чакра",
      description: "Тіло, матерія",
      color: "#DC2626",
      physics: matrixNumbers?.В || 0,
      energy: matrixNumbers?.Г || 0,
      emotions: checkTwentyTwo
        ? checkTwentyTwo((matrixNumbers?.В || 0) + (matrixNumbers?.Г || 0))
        : 0,
    },
  ];

  const getTotalPhysics = () => {
    if (healthCart1 && sumObjectValues) {
      return checkTwentyTwo
        ? checkTwentyTwo(sumObjectValues(healthCart1))
        : sumObjectValues(healthCart1);
    }
    return 0;
  };

  const getTotalEnergy = () => {
    if (healthCart2 && sumObjectValues) {
      return checkTwentyTwo
        ? checkTwentyTwo(sumObjectValues(healthCart2))
        : sumObjectValues(healthCart2);
    }
    return 0;
  };

  const getTotalEmotions = () => {
    if (healthCart3 && sumObjectValues) {
      return checkTwentyTwo
        ? checkTwentyTwo(sumObjectValues(healthCart3))
        : sumObjectValues(healthCart3);
    }
    return 0;
  };

  const styles = {
    container: {
      width: "100%",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",

      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      background: "#f3f4f6",
      padding: "12px 16px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: "16px",
      fontWeight: "600",
      color: "#374151",
      fontSize: "14px",
      borderBottom: "1px solid #e5e7eb",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: "16px",
      padding: "12px 16px",
      borderBottom: "1px solid #e5e7eb",
      transition: "background-color 0.2s",
    },
    chakraInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    chakraNumber: {
      minWidth: "32px",
      height: "32px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
    chakraName: {
      fontWeight: "500",
      color: "#111827",
      fontSize: "14px",
      marginBottom: "2px",
    },
    chakraDescription: {
      fontSize: "12px",
      color: "#6b7280",
      lineHeight: "1.3",
    },
    statCell: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6b7280",
      fontWeight: "500",
      fontSize: "16px",
    },
    totalRow: {
      background: "#f9fafb",
      padding: "12px 16px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: "16px",
      fontWeight: "600",
      color: "#374151",
    },
    totalNumber: {
      width: "32px",
      height: "32px",
      background: "#9ca3af",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>Назва чакри</div>
        <div style={{ textAlign: "center" }}>Фізика</div>
        <div style={{ textAlign: "center" }}>Енергія</div>
        <div style={{ textAlign: "center" }}>Емоції</div>
      </div>

      {/* Chakra rows */}
      {chakras.map((chakra) => (
        <div
          key={chakra.id}
          style={styles.row}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          <div style={styles.chakraInfo}>
            <div
              style={{
                ...styles.chakraNumber,
                backgroundColor: chakra.color,
              }}
            >
              {chakra.id}
            </div>
            <div>
              <div style={styles.chakraName}>{chakra.name}</div>
              <div style={styles.chakraDescription}>{chakra.description}</div>
            </div>
          </div>
          <div style={styles.statCell}>{chakra.physics}</div>
          <div style={styles.statCell}>{chakra.energy}</div>
          <div style={styles.statCell}>{chakra.emotions}</div>
        </div>
      ))}

      {/* Total row */}
      <div style={styles.totalRow}>
        <div style={styles.chakraInfo}>
          <div style={styles.totalNumber}>Σ</div>
          <div>
            <div style={styles.chakraName}>Сума</div>
            <div style={styles.chakraDescription}>Загальне енерголіне</div>
          </div>
        </div>
        <div style={styles.statCell}>{getTotalPhysics()}</div>
        <div style={styles.statCell}>{getTotalEnergy()}</div>
        <div style={styles.statCell}>{getTotalEmotions()}</div>
      </div>
    </div>
  );
};

export default ChakraTable;
