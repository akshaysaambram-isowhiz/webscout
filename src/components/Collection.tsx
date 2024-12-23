import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CollectionCard, { CollectionCardProps } from "./CollectionCard";
import { Filters } from "./Filters";
import { fetchData } from "../data/fetchData";
import { tradingCards } from "../data/tradingCards";

export default function Collection() {
  const { sport } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<CollectionCardProps[]>([]);
  const [filteredData, setFilteredData] = useState<CollectionCardProps[]>([]);

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";
  const selectedSport = tradingCards.find(
    (card) => card.title.toLowerCase() === sport
  );

  const image = selectedSport ? selectedSport.image : "";
  const title = selectedSport ? selectedSport.title : "";

  const getCurrentFilters = () => {
    const priceRange =
      searchParams.get("priceRange")?.split(",").map(Number) || null;
    const sortBy = searchParams.get("sortBy") || null;
    return { priceRange, sortBy };
  };

  useEffect(() => {
    fetchData(
      `http://localhost:3001/api/cards?category=${sport}&page=${currentPage}&search=${searchTerm}`
    ).then((data: any) => {
      setData(data.data as CollectionCardProps[]);

      const currentFilters = getCurrentFilters();
      const filteredResults = applyFilters(
        data.data as CollectionCardProps[],
        currentFilters
      );
      setFilteredData(filteredResults);
    });
  }, [sport, currentPage, searchTerm]);

  useEffect(() => {
    const currentFilters = getCurrentFilters();
    const filteredResults = applyFilters(data, currentFilters);
    setFilteredData(filteredResults);
  }, [searchParams, data]);

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

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.from("#collection h4", {
      y: 50,
      opacity: 0,
      duration: 1,
    }).from(
      "#collection .subtitle",
      {
        y: 30,
        opacity: 0,
        duration: 1,
      },
      "-=0.5"
    );
  }, []);

  return (
    <div id="collection" className="mx-auto px-4 md:px-8 pt-32 lg:pt-24">
      <div
        className="w-full h-48 sm:h-64 md:h-96 px-8 sm:px-16 md:px-32 text-center flex flex-col items-center justify-center bg-cover bg-center rounded-xl bg-black/55 bg-blend-overlay mb-8"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h4 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white">
          {title}
        </h4>
        <p className="mt-2 md:mt-6 text-sm sm:text-lg md:text-xl lg:text-2xl text-white subtitle">
          All online orders are for local pickup and delivery to the NYC area.
          All online orders are non-refundable.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <Filters
          priceRange={[
            Math.min(...data.map((c) => Number(c.price))),
            Math.max(...data.map((c) => Number(c.price))),
          ]}
        />

        <div
          className="h-[calc(100vh-6rem)] p-4 md:p-6 overflow-y-scroll scroll-hidden"
          style={{ flex: 3 }}
        >
          {filteredData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((card) => (
                <CollectionCard key={card.title} {...card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
