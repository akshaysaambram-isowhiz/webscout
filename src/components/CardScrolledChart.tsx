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
import { toTitleCase } from "../utils/formatters";
import { Download } from "lucide-react";
import { downloadChart } from "../utils/downloadChart";

type CardScolledData = {
  name: string;
  value: number;
  color: string;
};

export default function CardScrolledChart() {
  const [data, setData] = useState<CardScolledData[]>([]);

  function getRandomColor(index: number) {
    const colors = ["#F7DC6F", "#E74C3C", "#F1C40F", "#EC7063", "#F2C464"];
    return colors[index % colors.length];
  }

  function formatData(data: CardScolledData[]) {
    const formattedData = data.map((item, index) => ({
      name: toTitleCase(item.name),
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
      id="card-scrolled-chart"
      className="bg-white border-2 border-gray-300 p-6 rounded-lg shadow-sm flex-1"
    >
      <div className="mb-4 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Cards Scrolled
          </h2>
          <p className="text-sm text-gray-500">
            Most scrolled cards by website.
          </p>
        </div>
        <button
          id="card-scrolled-chart-download-button"
          onClick={() =>
            downloadChart({
              chartId: "card-scrolled-chart",
              downloadId: "card-scrolled-chart-download-button",
              fileName: "card-scrolled-chart.png",
            })
          }
        >
          <Download className="size-6 text-gray-400" />
        </button>
      </div>

      <div className="relative h-64 min-h-[250px]">
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
              <tspan x="50%" dy="-1.5em" className="text-lg font-semibold">
                Total
              </tspan>
              <tspan x="50%" dy="1em" className="text-xl font-bold">
                {data.reduce((total, item) => total + item.value, 0)}
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
