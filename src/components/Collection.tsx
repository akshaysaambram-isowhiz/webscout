import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSearchParams } from "react-router-dom";
import { tradingCards } from "../data/tradingCards";
import useCollectionData from "../hooks/useCollectionData";
import CollectionCard from "./CollectionCard";
import { Filters } from "./Filters";
import Pagination from "./Pagination";

type CollectionProps = {
  sport: string;
};

export default function Collection({ sport }: CollectionProps) {
  const [searchParams] = useSearchParams();
  const { data, filteredData, totalPages } = useCollectionData(
    sport,
    searchParams
  );
  const selectedSport = tradingCards.find(
    (card) => card.title.toLowerCase() === sport
  );

  const image = selectedSport ? selectedSport.image : "";
  const title = selectedSport ? selectedSport.title : "";

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
    <div id="collection" className="mx-auto px-4 md:px-8 pt-32 lg:pt-20 mt-6">
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
          className="p-4 md:p-6 overflow-y-scroll scroll-hidden"
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

      <Pagination totalPages={totalPages} />
    </div>
  );
}
