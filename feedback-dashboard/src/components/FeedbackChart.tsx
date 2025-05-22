import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Farben: Grün (positiv), Gelb (neutral), Rot (negativ), Lila (mixed)
const COLORS = ["#00C49F", "#FFBB28", "#FF4D4F", "#8884d8"];

// Feedback-Eintrag aus der API
interface FeedbackItem {
  sentiment: string;
  name: string;
  feedback: string;
  date: string;
}

// Daten für das Diagramm
interface ChartDataItem {
  name: string;
  value: number;
}

const FeedbackChart: React.FC = () => {
  const [data, setData] = useState<ChartDataItem[]>([
    { name: "Positive", value: 0 },
    { name: "Neutral", value: 0 },
    { name: "Negative", value: 0 },
    { name: "Mixed", value: 0 },
  ]);

  useEffect(() => {
    fetch("https://faefgvgcf1.execute-api.eu-west-1.amazonaws.com/default/tobias_project_lambda_5")
      .then((res) => res.json())
      .then((items: FeedbackItem[]) => {
        const counts = { POSITIVE: 0, NEUTRAL: 0, NEGATIVE: 0, MIXED: 0 };

        items.forEach((item) => {
          const s = item.sentiment?.toUpperCase();
          if (counts[s as keyof typeof counts] !== undefined) {
            counts[s as keyof typeof counts]++;
          }
        });

        setData([
          { name: "Positive", value: counts.POSITIVE },
          { name: "Neutral", value: counts.NEUTRAL },
          { name: "Negative", value: counts.NEGATIVE },
          { name: "Mixed", value: counts.MIXED },
        ]);
      })
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeedbackChart;
