import { useEffect, useState } from "react";
import { CollectionCardProps } from "../components/CollectionCard";
import { fetchData } from "../data/fetchData";

export default function useCollectionData(
  sport: string,
  searchParams: URLSearchParams
) {
  const [data, setData] = useState<CollectionCardProps[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredData, setFilteredData] = useState<CollectionCardProps[]>([]);

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";
  const priceRange =
    searchParams.get("priceRange")?.split(",").map(Number) || null;
  const sortBy = searchParams.get("sortBy") || null;

  const getCurrentFilters = () => ({ priceRange, sortBy });

  const applyFilters = (
    currentData: CollectionCardProps[],
    filters: { priceRange: number[] | null; sortBy: string | null }
  ) => {
    let result = [...currentData];

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(
        (item) => Number(item.price) >= min && Number(item.price) <= max
      );
    }

    if (filters.sortBy) {
      result.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            return Number(a.price) - Number(b.price);
          case "price-desc":
            return Number(b.price) - Number(a.price);
          default:
            return 0;
        }
      });
    }

    return result;
  };

  const buildFetchUrl = () => {
    const baseUrl = `http://localhost:3001/api/cards`;
    const params = new URLSearchParams({
      category: sport,
      page: currentPage.toString(),
    });

    if (searchTerm) {
      params.append("search", searchTerm);
    }
    if (priceRange) {
      params.append("priceRange", priceRange.join(","));
    }
    if (sortBy) {
      params.append("sortBy", sortBy);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    const fetchUrl = buildFetchUrl();

    fetchData(fetchUrl).then((data: any) => {
      setData(data.data as CollectionCardProps[]);
      setTotalPages(data.metadata?.totalPages || 1);
      const currentFilters = getCurrentFilters();
      setFilteredData(
        applyFilters(data.data as CollectionCardProps[], currentFilters)
      );
    });
  }, [sport, currentPage, searchTerm, priceRange, sortBy]);

  return {
    data,
    filteredData,
    totalPages,
  };
}
