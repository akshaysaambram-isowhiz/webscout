import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionCard, { CollectionCardProps } from "./CollectionCard";
import { Filters } from "./Filters";
import { fetchData } from "../data/fetchData";
import { tradingCards } from "../data/tradingCards";

export default function Collection() {
  const { sport } = useParams();
  const [data, setData] = useState<CollectionCardProps[]>([]);
  const [filteredData, setFilteredData] = useState<CollectionCardProps[]>([]);

  const selectedSport = tradingCards.find(
    (card) => card.title.toLowerCase() === sport
  );

  const image = selectedSport ? selectedSport.image : "";
  const title = selectedSport ? selectedSport.title : "";

  useEffect(() => {
    fetchData(`http://localhost:3001/api/cards?category=${sport}`).then(
      (data) => {
        setData(data as CollectionCardProps[]);
        setFilteredData(data as CollectionCardProps[]);
      }
    );
  }, [sport]);

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

  const handleFilterChange = ({
    type,
    value,
    values,
  }: {
    type: string;
    value?: string;
    values?: number[];
  }) => {
    let newData = [...data];

    switch (type) {
      case "price":
        if (values) {
          newData = data.filter(
            (item) =>
              Number(item.price) >= values[0] && Number(item.price) <= values[1]
          );
        }
        break;
      case "sort":
        if (value) {
          newData.sort((a, b) => {
            switch (value) {
              case "price-asc":
                return Number(a.price) - Number(b.price);
              case "price-desc":
                return Number(b.price) - Number(a.price);
              default:
                return 0;
            }
          });
        }
        break;
      case "clear":
        newData = data;
        break;
    }

    setFilteredData(newData);
  };

  if (!filteredData || filteredData.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center lg:h-[calc(100vh-4rem)] px-4 md:px-0 space-y-4">
        <h4 className="text-xl sm:text-2xl md:text-4xl font-extrabold">
          Oops!
        </h4>
        <p className="text-lg sm:text-xl md:text-2xl font-normal text-gray-700">
          There are no matches for "{sport}".
        </p>
        <p className="text-base md:text-lg text-gray-400">
          Please try broadening your search.
        </p>
      </div>
    );

  return (
    <div id="collection" className="mx-auto px-4 md:px-8 py-8">
      <div
        className="w-full h-48 sm:h-64 md:h-96 px-8 sm:px-16 md:px-32 text-center flex flex-col items-center justify-center bg-cover bg-center rounded-xl bg-black/55 bg-blend-overlay mb-8"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h4 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {title}
        </h4>
        <p className="mt-2 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-white subtitle">
          All online orders are for local pickup and delivery to the NYC area.
          All online orders are non-refundable.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <Filters onFilterChange={handleFilterChange} />

        <div style={{ flex: 3 }}>
          {filteredData && filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((card) => (
                <CollectionCard key={card.title} {...card} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full items-center justify-center py-8 space-y-4">
              <p className="text-lg text-gray-600">
                Sorry, we couldn't find any items that match your filters.
              </p>
              <p className="text-base text-gray-400">
                Please try adjusting your filters or searching for something
                else.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
