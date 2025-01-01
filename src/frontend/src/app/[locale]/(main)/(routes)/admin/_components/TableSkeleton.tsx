export function TableSkeleton() {
  return (
    <table className="w-full caption-bottom text-sm">
      <thead className="[&_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th className="text-muted-foreground h-10 w-12 px-2 text-left align-middle font-medium">
            <div className="h-4 w-8 animate-pulse rounded-full bg-muted"></div>
          </th>
          <th className="text-muted-foreground h-10 px-2 text-left align-middle font-medium">
            <div className="h-4 w-24 animate-pulse rounded-full bg-muted"></div>
          </th>
          <th className="text-muted-foreground h-10 px-2 text-left align-middle font-medium">
            <div className="h-4 w-24 animate-pulse rounded-full bg-muted"></div>
          </th>
          <th className="text-muted-foreground h-10 px-2 text-left align-middle font-medium">
            <div className="h-4 w-24 animate-pulse rounded-full bg-muted"></div>
          </th>
          <th className="text-muted-foreground h-10 w-12 px-2 text-left align-middle font-medium">
            <div className="h-8 w-8 animate-pulse rounded-md bg-muted"></div>
          </th>
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {[...Array(4)].map((_, index) => (
          <tr
            key={index}
            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td className="p-2 align-middle">
              <div className="h-4 w-8 animate-pulse rounded-full bg-muted"></div>
            </td>
            <td className="p-2 align-middle">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 animate-pulse rounded-full bg-muted"></div>
                  <div className="h-3 w-48 animate-pulse rounded-full bg-muted"></div>
                </div>
              </div>
            </td>
            <td className="p-2 align-middle">
              <div className="h-4 w-16 animate-pulse rounded-full bg-muted"></div>
            </td>
            <td className="p-2 align-middle">
              <div className="h-4 w-24 animate-pulse rounded-full bg-muted"></div>
            </td>
            <td className="p-2 align-middle">
              <div className="h-8 w-8 animate-pulse rounded-md bg-muted"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
