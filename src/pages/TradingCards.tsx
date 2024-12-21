import Collection from "../components/Collection";
import Navbar from "../components/Navbar";

export default function TradingCards() {
  return (
    <div className="relative">
      <Navbar fixed={false} onSearch={console.log} />
      <Collection />
    </div>
  );
}
