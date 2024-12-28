import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-yellow-500">404</h1>
      <p className="text-2xl text-gray-700 mt-4">Page Not Found</p>
      <p className="text-lg text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
