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

  const getCurrentFilters = () => {
    const priceRange =
      searchParams.get("priceRange")?.split(",").map(Number) || null;
    const sortBy = searchParams.get("sortBy") || null;
    return { priceRange, sortBy };
  };

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

  useEffect(() => {
    fetchData(
      `http://localhost:3001/api/cards?category=${sport}&page=${currentPage}&search=${searchTerm}`
    ).then((data: any) => {
      setData(data.data as CollectionCardProps[]);
      setTotalPages(data.metadata?.totalPages || 1);
      const currentFilters = getCurrentFilters();
      setFilteredData(
        applyFilters(data.data as CollectionCardProps[], currentFilters)
      );
    });
  }, [sport, currentPage, searchTerm]);

  useEffect(() => {
    const currentFilters = getCurrentFilters();
    setFilteredData(applyFilters(data, currentFilters));
  }, [searchParams, data]);

  console.log(totalPages);

  return { data, filteredData, totalPages };
}
