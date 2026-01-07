export default function TourDetailLoading() {
  return (
    <div className="p-6">
      <div className="h-80 w-full bg-gray-200 animate-pulse mb-4" />
      <div className="grid grid-cols-4 gap-8">
        <div className="w-full col-span-3 flex flex-col gap-4">
          <div className="h-20 w-full bg-gray-200 animate-pulse mb-2" />
          <div className="h-20 w-full bg-gray-200 animate-pulse mb-2" />
          <div className="h-20 w-full bg-gray-200 animate-pulse mb-2" />
          <div className="h-20 w-full bg-gray-200 animate-pulse mb-2" />
        </div>
        <div className="h-80 w-full col-span-1 bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
