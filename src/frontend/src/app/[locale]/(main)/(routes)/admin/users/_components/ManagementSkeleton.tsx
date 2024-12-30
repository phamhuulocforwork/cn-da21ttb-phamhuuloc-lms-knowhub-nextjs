export function ManagementSkeleton() {
  return (
    <div className="mx-4 py-10 md:mx-11">
      <div className="space-y-4">
        <div>
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-muted" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="flex items-center gap-2">
            <div className="h-10 w-[300px] animate-pulse rounded bg-muted" />
            <div className="h-10 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-24 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="mb-2 h-16 w-full animate-pulse rounded bg-muted"
            />
          ))}
        </div>

        <div className="mt-4 h-10 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
