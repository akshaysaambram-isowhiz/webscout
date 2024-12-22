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
import { toTitleCase } from "../utils/formatters";
import { Download } from "lucide-react";
import { downloadChart } from "../utils/downloadChart";

type PriceRangeChartData = {
  name: string;
  minprice: number;
  maxprice: number;
};

export default function PriceRangeChart() {
  const [data, setData] = useState<PriceRangeChartData[]>([]);

  function formatData(data: PriceRangeChartData[]) {
    const formattedData = data.map((item) => ({
      name: toTitleCase(item.name),
      minprice: item.minprice,
      maxprice: item.maxprice,
    }));
    setData(formattedData);
  }

  useEffect(() => {
    fetchData("http://localhost:3001/api/analytics/cards/prices").then(
      (data) => {
        formatData(data as PriceRangeChartData[]);
      }
    );
  }, []);

  return (
    <div
      id="price-range-chart"
      className="bg-white border-2 border-gray-300 p-6 rounded-lg shadow-sm"
      style={{ flex: 2 }}
    >
      <div className="mb-4 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Price Range Distribution
          </h2>
          <p className="text-sm text-gray-500">
            Price range distribution for each sport.
          </p>
        </div>
        <button
          id="price-range-chart-download-button"
          onClick={() =>
            downloadChart({
              chartId: "price-range-chart",
              downloadId: "price-range-chart-download-button",
              fileName: "price-range-chart.png",
            })
          }
        >
          <Download className="size-6 text-gray-400" />
        </button>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minprice" name="Min" fill="#fff200bb" />
            <Bar dataKey="maxprice" name="Max" fill="#ff000bbb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
