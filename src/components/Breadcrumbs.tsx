import { Link, useLocation } from "react-router-dom";
import { toTitleCase } from "../utils/formatters";

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    return { name: toTitleCase(path), path: href };
  });

  return (
    <nav aria-label="breadcrumb" className="px-4 md:px-8 pt-32 lg:pt-24">
      <ol className="flex space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {index < breadcrumbs.length - 1 ? (
              <>
                <Link
                  to={breadcrumb.path}
                  className="text-yellow-600 hover:underline"
                >
                  {breadcrumb.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            ) : (
              <span className="text-gray-500">{breadcrumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
