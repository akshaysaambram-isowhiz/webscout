import { ArrowDownUp, SparklesIcon, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "../data/fetchData";
import CardScrolledChart from "./CardScrolledChart";
import DataTable from "./DataTable";
import PriceRangeChart from "./PriceRangeChart";

export type TableData = {
  image: string;
  title: string;
  price: number;
  category: string;
};

export default function Analytics() {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    fetchData("http://localhost:3001/api/analytics/table").then((data) => {
      setData(data as TableData[]);
    });
  }, []);

  return (
    <div
      id="analytics"
      className="pt-32 lg:pt-20 pb-10 px-5 md:px-10 space-y-6 md:space-y-12"
    >
      <div className="space-y-3">
        <h4 className="text-xl md:text-3xl font-bold">Analytics</h4>
        <p className="text-base md:text-lg text-gray-600">
          Dive into your collection with our smart analytics dashboard. Uncover
          top sports, hot cards, and price trends!
        </p>
        <hr className="border-t border-gray-300" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <CardScrolledChart />
        <PriceRangeChart />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="border-2 border-gray-200 p-6 flex flex-1 items-center justify-center gap-4 space-y-2 rounded-xl">
          <div className="bg-gray-100 p-4 rounded-full">
            <SparklesIcon className="text-yellow-600" />
          </div>
          <div>
            <h4 className="text-4xl font-bold text-yellow-600">12,345</h4>
            <p className="text-xl text-gray-600">Cards sold in 24 hours</p>
          </div>
        </div>
        <div className="border-2 border-gray-200 p-6 flex flex-1 items-center justify-center gap-4 space-y-2 rounded-xl">
          <div className="bg-gray-100 p-4 rounded-full">
            <TrendingUp className="text-yellow-600" />
          </div>
          <div>
            <h4 className="text-4xl font-bold text-yellow-600">456</h4>
            <p className="text-xl text-gray-600">Total Cards Scrolled</p>
          </div>
        </div>
        <div className="border-2 border-gray-200 p-6 flex flex-1 items-center justify-center gap-4 space-y-2 rounded-xl">
          <div className="bg-gray-100 p-4 rounded-full">
            <ArrowDownUp className="text-yellow-600" />
          </div>
          <div>
            <h4 className="text-4xl font-bold text-yellow-600">567</h4>
            <p className="text-xl text-gray-600">Sample Data Description</p>
          </div>
        </div>
      </div>

      <DataTable data={data} />
    </div>
  );
}
