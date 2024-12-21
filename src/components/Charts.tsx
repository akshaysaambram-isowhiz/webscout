import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchData } from "../data/fetchData";

type EmailData = {
  name: string;
  value: number;
  color: string;
};

type SalesData = {
  name: string;
  minprice: number;
  maxprice: number;
};

function getRandomColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}

const EmailAnalytics: React.FC = () => {
  const [data, setData] = useState<EmailData[]>([]);

  function formatData(data: EmailData[]) {
    const formattedData = data.map((item) => ({
      name: item.name
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      value: Number(item.value),
      color: getRandomColor(),
    }));
    setData(formattedData);
  }

  useEffect(() => {
    fetchData("http://localhost:3001/api/analytics/cards").then((data) => {
      formatData(data as EmailData[]);
    });
  }, []);

  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Email Sent</h2>
        <p className="text-sm text-gray-500">
          Detailed data of your email inbox
        </p>
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
              <tspan x="50%" dy="-1em" className="text-lg font-semibold">
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
};

const SalesAnalytics: React.FC = () => {
  const [data, setData] = useState<SalesData[]>([]);

  function formatData(data: SalesData[]) {
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
        formatData(data as SalesData[]);
      }
    );
  }, []);

  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Sales Graph</h2>
        <p className="text-sm text-gray-500">Your total sales data analytics</p>
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
};

const Analytics = () => {
  return (
    <div className="pt-32 md:pt-20 pb-10 px-5 md:px-10">
      <div className="mb-8">
        <h4 className="text-3xl font-bold">Analytics</h4>
        <p className="text-lg text-gray-600">
          Get detailed data of your email inbox, including number of emails, and
          more.
        </p>
        <hr className="border-t border-gray-300 my-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmailAnalytics />
        <SalesAnalytics />
      </div>
    </div>
  );
};

export default Analytics;
