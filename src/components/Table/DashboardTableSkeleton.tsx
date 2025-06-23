export default function DashboardTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 animate-pulse" aria-hidden="true">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-100 dark:divide-gray-900">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td className="px-4 py-3">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
              </td>
              <td className="px-4 py-3 flex gap-2">
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
