import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type SearchInputProps = {
  className?: string;
};

export default function SearchInput({ className }: SearchInputProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query) {
      setSearchParams({ search: query });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const clearSearchText = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <>
      <input
        onChange={handleInputChange}
        className={`w-2/3 rounded-lg border-2 border-gray-300 py-2 px-3 outline-none hover:ring-2 hover:ring-yellow-400 hover:border-transparent focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-shadow ${className}`}
        placeholder="Search..."
        type="text"
        value={searchParams.get("search") || ""}
      />
      {searchParams.get("search") && (
        <X
          className="absolute right-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 cursor-pointer"
          onClick={clearSearchText}
        />
      )}
    </>
  );
}
