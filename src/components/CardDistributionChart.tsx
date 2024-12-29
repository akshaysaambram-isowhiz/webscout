import { useEffect, useState } from "react";
import { fetchData } from "../data/fetchData";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";
import { downloadChart } from "../utils/downloadChart";

type CardDistributionChartData = {
  category: string;
  BT: number;
  GSC: number;
  GS: number;
};

export default function CardDistributionChart() {
  const [data, setData] = useState<CardDistributionChartData[]>([]);

  function formatData(data: CardDistributionChartData[]) {
    const formattedData = data.map((item) => ({
      category: item.category,
      BT: item.BT,
      GSC: item.GSC,
      GS: item.GS,
    }));
    setData(formattedData);
  }

  useEffect(() => {
    fetchData("http://localhost:3001/api/analytics/cards/distributions").then(
      (data) => {
        formatData(data as CardDistributionChartData[]);
      }
    );
  }, []);

  return (
    <div
      id="card-distribution-chart"
      className="bg-white border-2 border-gray-300 p-6 rounded-lg shadow-sm"
      style={{ flex: 2 }}
    >
      <div className="mb-4 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Card Distribution
          </h2>
          <p className="text-sm text-gray-500">
            Card distribution for each sport group by website.
          </p>
        </div>
        <button
          id="card-distribution-chart-download-button"
          onClick={() =>
            downloadChart({
              chartId: "card-distribution-chart",
              downloadId: "card-distribution-chart-download-button",
              fileName: "card-distribution-chart.png",
            })
          }
        >
          <Download className="size-6 text-gray-400" />
        </button>
      </div>

      <div className="relative h-64 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="BT" name="BT" fill="#fff200bb" />
            <Bar dataKey="GSC" name="GSC" fill="#ff000bbb" />
            <Bar dataKey="GS" name="GS" fill="#F2C464bb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
