import { Suspense } from "react";
import UserManagementClient from "./_components/UserManagementClient";
import { ManagementSkeleton } from "@/app/[locale]/(main)/(routes)/admin/users/_components/ManagementSkeleton";

export default function UserManagementPage() {
  return (
    <Suspense fallback={<ManagementSkeleton />}>
      <UserManagementClient />
    </Suspense>
  );
}
