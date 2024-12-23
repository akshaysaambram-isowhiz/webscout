import Collection from "../components/Collection";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

export default function TradingCards() {
  return (
    <div className="relative">
      <Navbar />
      <Collection />
      <Pagination totalPages={3} onPageChange={console.log} />
    </div>
  );
}
