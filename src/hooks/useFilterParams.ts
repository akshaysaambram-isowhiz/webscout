import { useSearchParams } from "react-router-dom";

export default function useFilterParams(defaultPriceRange: [number, number]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const priceRange =
    searchParams.get("priceRange")?.split(",").map(Number) || defaultPriceRange;
  const sortBy = searchParams.get("sortBy") || "";

  const updateParams = (newParams: {
    priceRange?: number[];
    sortBy?: string;
  }) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (newParams.priceRange) {
      if (
        newParams.priceRange[0] === defaultPriceRange[0] &&
        newParams.priceRange[1] === defaultPriceRange[1]
      ) {
        updatedParams.delete("priceRange");
      } else {
        updatedParams.set("priceRange", newParams.priceRange.join(","));
      }
    }

    if (newParams.sortBy !== undefined) {
      if (newParams.sortBy === "") {
        updatedParams.delete("sortBy");
      } else {
        updatedParams.set("sortBy", newParams.sortBy);
      }
    }

    setSearchParams(updatedParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return { priceRange, sortBy, updateParams, resetFilters };
}
