export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-yellow-500 ml-4"></div>
      <p className="text-lg text-gray-600 ml-4">Loading...</p>
    </div>
  );
}
