import { useParams } from "react-router-dom";
import Collection from "../components/Collection";
import Navbar from "../components/Navbar";
import { tradingCards } from "../data/tradingCards";
import NotFound from "../components/NotFound";
import Breadcrumbs from "../components/Breadcrumbs";

export default function TradingCards() {
  const { sport = "" } = useParams();

  const tradingCard = tradingCards.find(
    (card) => card.title.toLowerCase() === sport
  );
  if (!tradingCard) {
    return <NotFound />;
  }

  return (
    <div className="relative">
      <Navbar search={true} />
      <Breadcrumbs />
      <Collection sport={sport} />
    </div>
  );
}
