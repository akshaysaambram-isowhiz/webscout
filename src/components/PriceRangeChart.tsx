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

type PriceRangeChartData = {
  name: string;
  minprice: number;
  maxprice: number;
};

export default function PriceRangeChart() {
  const [data, setData] = useState<PriceRangeChartData[]>([]);

  function formatData(data: PriceRangeChartData[]) {
    const formattedData = data.map((item) => ({
      name: item.name
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase()),
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
      className="border-2 border-gray-300 p-6 rounded-lg shadow-sm"
      style={{ flex: 2 }}
    >
      <div className="mb-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Price Range Distribution
        </h2>
        <p className="text-sm text-gray-500">
          Price range distribution for each sport.
        </p>
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
