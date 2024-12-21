export type CollectionCardProps = {
  title: string;
  image: string;
  price: string;
};

export default function CollectionCard({
  title,
  image,
  price,
}: CollectionCardProps) {
  return (
    <div
      id="card"
      className="group bg-white rounded-2xl shadow-md transition-all duration-300 
                  overflow-hidden hover:shadow-xl hover:shadow-yellow-200 hover:scale-105"
    >
      <div className="relative">
        <div className="relative overflow-hidden h-64">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform 
                      duration-700 ease-in-out"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-yellow-600">{price}</p>
      </div>
    </div>
  );
}
