import Analytics from "../components/Analytics";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <Analytics />
    </div>
  );
}
