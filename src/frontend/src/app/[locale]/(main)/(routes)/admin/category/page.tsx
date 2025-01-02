import { Suspense } from "react";
import { ManagementSkeleton } from "@/components/common/ManagementSkeleton";
import CategoryManagementClient from "./_components/CategoryManagementClient";

export default function UserManagementPage() {
  return (
    <Suspense fallback={<ManagementSkeleton />}>
      <CategoryManagementClient />
    </Suspense>
  );
}
