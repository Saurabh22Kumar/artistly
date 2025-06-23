export default function ArtistListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-white dark:bg-gray-950 p-6 shadow flex flex-col gap-4 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto mb-2" />
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mt-2" />
          <div className="flex justify-between items-center mt-4">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
