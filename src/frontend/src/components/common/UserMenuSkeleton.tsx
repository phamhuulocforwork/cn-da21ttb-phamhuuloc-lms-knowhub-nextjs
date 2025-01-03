import { Skeleton } from "../ui/Skeleton";

export function UserMenuSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="mt-1 h-3 w-32 rounded" />
      </div>
      <Skeleton className="h-4 w-4 rounded" />
    </div>
  );
}
