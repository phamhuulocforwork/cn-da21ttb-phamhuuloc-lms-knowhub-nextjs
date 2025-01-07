import { Suspense } from "react";
import UserManagementClient from "./_components/user-management-client";
import { ManagementSkeleton } from "@/components/common/management-skeleton";

export default function UserManagementPage() {
  return (
    <Suspense fallback={<ManagementSkeleton />}>
      <UserManagementClient />
    </Suspense>
  );
}
