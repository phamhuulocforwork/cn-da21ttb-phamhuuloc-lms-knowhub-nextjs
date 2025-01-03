import { Suspense } from "react";
import UserManagementClient from "./_components/UserManagementClient";
import { ManagementSkeleton } from "@/components/common/ManagementSkeleton";

export default function UserManagementPage() {
  return (
    <Suspense fallback={<ManagementSkeleton />}>
      <UserManagementClient />
    </Suspense>
  );
}
