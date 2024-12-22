import CardScrolledChart from "./CardScrolledChart";
import PriceRangeChart from "./PriceRangeChart";

export default function Analytics() {
  return (
    <div className="pt-32 md:pt-20 pb-10 px-5 md:px-10 space-y-6">
      <div className="space-y-2">
        <h4 className="text-3xl font-bold">Analytics</h4>
        <p className="text-lg text-gray-600">
          Dive into your collection with our smart analytics dashboard. Uncover
          top sports, hot cards, and price trends!
        </p>
      </div>
      <hr className="border-t border-gray-300" />
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-6">
        <CardScrolledChart />
        <PriceRangeChart />
      </div>
    </div>
  );
}
