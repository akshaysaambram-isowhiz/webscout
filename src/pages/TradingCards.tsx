import Collection from "../components/Collection";
import Navbar from "../components/Navbar";

export default function TradingCards() {
  return (
    <div className="relative">
      <Navbar onSearch={console.log} />
      <Collection />
    </div>
  );
}
