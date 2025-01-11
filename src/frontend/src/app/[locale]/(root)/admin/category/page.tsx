import CategoryManagementClient from './_components/category-management-client';
import { ManagementSkeleton } from '@/components/common/management-skeleton';
import { Suspense } from 'react';

export default function UserManagementPage() {
  return (
    <Suspense fallback={<ManagementSkeleton />}>
      <CategoryManagementClient />
    </Suspense>
  );
}
