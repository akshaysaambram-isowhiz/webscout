import { formatPrice } from "../utils/formatters";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PRICE_RANGE = [0, 1000];
const DEFAULT_SORT = "";

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceRange = searchParams.get("priceRange")?.split(",").map(Number) || [
    0, 1000,
  ];
  const sortBy = searchParams.get("sortBy") || "";

  const updateSearchParams = (newParams: {
    priceRange?: number[];
    sortBy?: string;
  }) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (newParams.priceRange !== undefined) {
      if (
        newParams.priceRange[0] === DEFAULT_PRICE_RANGE[0] &&
        newParams.priceRange[1] === DEFAULT_PRICE_RANGE[1]
      ) {
        updatedParams.delete("priceRange");
      } else {
        updatedParams.set("priceRange", newParams.priceRange.join(","));
      }
    }

    if (newParams.sortBy !== undefined) {
      if (newParams.sortBy === DEFAULT_SORT) {
        updatedParams.delete("sortBy");
      } else {
        updatedParams.set("sortBy", newParams.sortBy);
      }
    }

    if (Array.from(updatedParams.keys()).length > 0) {
      setSearchParams(updatedParams);
    } else {
      setSearchParams({});
    }
  };

  const handlePriceChange = (values: number[]) => {
    updateSearchParams({ priceRange: values });
  };

  const handleSortByChange = (value: string) => {
    updateSearchParams({ sortBy: value });
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
            <option>Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchParams({});
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
