import { useState } from "react";
import { toTitleCase } from "../utils/formatters";
import { TableData } from "./Analytics";

const columns = [
  { header: "Image", accessor: "image" },
  { header: "Name", accessor: "title" },
  { header: "Price", accessor: "price" },
  { header: "Category", accessor: "category" },
];

type DataTableProps = {
  data: TableData[];
};

export default function DataTable({ data }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const valueA = a[sortConfig.key as keyof TableData];
    const valueB = b[sortConfig.key as keyof TableData];

    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No data available to display.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                onClick={() =>
                  setSortConfig((prev) => ({
                    key: column.accessor,
                    direction: prev?.direction === "asc" ? "desc" : "asc",
                  }))
                }
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((item) => (
            <tr
              key={item.title}
              className="odd:bg-gray-100 hover:bg-yellow-200 transition-colors duration-500"
            >
              <td className="px-6 py-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-24 object-cover rounded-xl"
                  loading="lazy"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {toTitleCase(item.category)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
