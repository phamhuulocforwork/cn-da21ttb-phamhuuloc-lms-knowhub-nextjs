import { Suspense } from "react";
import { ManagementSkeleton } from "@/components/common/management-skeleton";
import CategoryManagementClient from "./_components/category-management-client";

export default function UserManagementPage() {
  return (
    <Suspense fallback={<ManagementSkeleton />}>
      <CategoryManagementClient />
    </Suspense>
  );
}
