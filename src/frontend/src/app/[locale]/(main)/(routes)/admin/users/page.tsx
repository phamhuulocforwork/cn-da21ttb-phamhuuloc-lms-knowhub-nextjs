import { Suspense } from "react";
import UserManagementClient from "./_components/UserManagementClient";
import { UserManagementSkeleton } from "@/components/common/ManagementSkeleton";

export default function UserManagementPage() {
  return (
    <Suspense fallback={<UserManagementSkeleton />}>
      <UserManagementClient />
    </Suspense>
  );
}
