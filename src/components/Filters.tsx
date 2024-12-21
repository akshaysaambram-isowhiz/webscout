import { formatPrice } from "../utils/formatters";
import { useSearchParams } from "react-router-dom";

type FilterProps = {
  onFilterChange: (filter: {
    type: string;
    values?: number[];
    value?: string;
  }) => void;
};

export function Filters({ onFilterChange }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceRange = searchParams.get("priceRange")?.split(",").map(Number) || [
    0, 1000,
  ];
  const sortBy = searchParams.get("sortBy") || "";

  const handlePriceChange = (values: number[]) => {
    setSearchParams({ priceRange: values.join(","), sortBy });
    onFilterChange({ type: "price", values });
  };

  const handleSortByChange = (value: string) => {
    setSearchParams({ priceRange: priceRange.join(","), sortBy: value });
    onFilterChange({ type: "sort", value });
  };

  return (
    <div className="flex-1 lg:w-64 space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Price Range
          </label>
          <input
            type="range"
            min={0}
            max={1000}
            step={1}
            value={priceRange[0]}
            onChange={(e) =>
              handlePriceChange([Number(e.target.value), priceRange[1]])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortByChange(e.target.value)}
            className="w-full p-2 text-sm rounded-md border-2 border-yellow-400 focus:outline-none cursor-pointer"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchParams({});
            onFilterChange({ type: "clear" });
          }}
          className="mt-6 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md 
                      hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
