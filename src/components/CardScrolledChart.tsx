import { useEffect, useState } from "react";
import { fetchData } from "../data/fetchData";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type CardScolledData = {
  name: string;
  value: number;
  color: string;
};

export default function CardScrolledChart() {
  const [data, setData] = useState<CardScolledData[]>([]);

  function getRandomColor(index: number) {
    const colors = [
      "#F7DC6F",
      "#E74C3C",
      "#F1C40F",
      "#EC7063",
      "#F2C464",
      "#F39C12",
      "#E8B422",
      "#F8E231",
      "#D2B438",
      "#FFC107",
    ];
    return colors[index % colors.length];
  }

  function formatData(data: CardScolledData[]) {
    const formattedData = data.map((item, index) => ({
      name: item.name
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      value: Number(item.value),
      color: getRandomColor(index),
      index: index,
    }));
    setData(formattedData);
  }

  useEffect(() => {
    fetchData("http://localhost:3001/api/analytics/cards").then((data) => {
      formatData(data as CardScolledData[]);
    });
  }, []);

  return (
    <div
      className="border-2 border-gray-300 p-6 rounded-lg shadow-sm"
      style={{ flex: 1 }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Cards Scrolled</h2>
        <p className="text-sm text-gray-500">Most scrolled cards by sport.</p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-gray-700"
            >
              <tspan x="50%" dy="-2.25em" className="text-lg font-semibold">
                Total
              </tspan>
              <tspan x="50%" dy="1em" className="text-xl font-bold">
                49.5%
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
