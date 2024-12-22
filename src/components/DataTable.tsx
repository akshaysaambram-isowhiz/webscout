import { toTitleCase } from "../utils/formatters";
import { TableData } from "./Analytics";

type DataTableProps = {
  data: TableData[];
};

export default function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={item.title}
              className="odd:bg-gray-100 hover:bg-yellow-200 transition-colors duration-500"
            >
              <td className="px-6 py-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-24 object-cover rounded-xl"
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
