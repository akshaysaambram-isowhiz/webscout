import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("page", page.toString());
    setSearchParams(updatedSearchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600"
        }`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? "bg-yellow-500 text-white"
              : "bg-white text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}
