export type CollectionCardProps = {
  title: string;
  player: string;
  image: string;
  price: number;
  originalPrice: number;
  releaseDate: string;
};

export default function CollectionCard({
  title,
  player,
  image,
  price,
  originalPrice,
  releaseDate,
}: CollectionCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div
      id="card"
      className="group bg-white rounded-2xl shadow-md transition-all duration-300 
                  overflow-hidden hover:shadow-xl hover:shadow-yellow-200 hover:scale-105"
    >
      <div className="relative">
        {discount > 0 && (
          <span
            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 
                          rounded-full text-sm font-semibold z-10"
          >
            -{discount}%
          </span>
        )}
        <div className="relative overflow-hidden h-64">
          <img
            src={image}
            alt={`${player} - ${title}`}
            className="card-image w-full h-full object-cover transform transition-transform 
                      duration-700 ease-out"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
          {title}
        </h3>
        <p className="text-lg text-gray-600 font-medium">{player}</p>
        <p className="text-2xl font-bold text-yellow-600">
          ${price.toFixed(2)}
        </p>
        {originalPrice > price && (
          <p className="text-sm text-gray-400 line-through">
            ${originalPrice.toFixed(2)}
          </p>
        )}
        <p className="text-sm text-gray-500 pt-2 border-t border-gray-100">
          Releases on{" "}
          {new Date(releaseDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
