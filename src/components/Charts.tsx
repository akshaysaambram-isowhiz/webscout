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

type EmailData = {
  name: string;
  value: number;
  color: string;
};

type SalesData = {
  date: string;
  sales: number;
  revenue: number;
};

const EmailAnalytics: React.FC = () => {
  const emailData: EmailData[] = [
    { name: "Sent", value: 30, color: "#fff200bb" },
    { name: "Receive", value: 19.5, color: "#ff000bbb" },
  ];

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
              data={emailData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {emailData.map((entry, index) => (
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
  const salesData: SalesData[] = [
    { date: "01 Jan", sales: 42, revenue: 12 },
    { date: "02 Jan", sales: 52, revenue: 23 },
    { date: "03 Jan", sales: 40, revenue: 19 },
    { date: "04 Jan", sales: 65, revenue: 70 },
    { date: "05 Jan", sales: 22, revenue: 12 },
    { date: "06 Jan", sales: 42, revenue: 25 },
  ];

  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Sales Graph</h2>
        <p className="text-sm text-gray-500">Your total sales data analytics</p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" name="Sales" fill="#fff200bb" />
            <Bar dataKey="revenue" name="Revenue" fill="#ff000bbb" />
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
