import { Suspense } from 'react';

import { ManagementSkeleton } from '@/components/common/management-skeleton';

import UserManagementClient from './_components/user-management-client';

export default function UserManagementPage() {
  return (
    <Suspense fallback={<ManagementSkeleton />}>
      <UserManagementClient />
    </Suspense>
  );
}
