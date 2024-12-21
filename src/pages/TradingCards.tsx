import { useParams } from "react-router-dom";

import Collection from "../components/Collection";
import Navbar from "../components/Navbar";

import { tradingCards } from "../data/tradingCards";

export default function TradingCards() {
  const { sport } = useParams();

  const selectedSport = tradingCards.find(
    (card) => card.title.toLowerCase() === sport
  );

  return (
    <div className="relative">
      <Navbar fixed={false} onSearch={console.log} />
      <Collection {...selectedSport} />
    </div>
  );
}
