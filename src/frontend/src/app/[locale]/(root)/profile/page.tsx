import { Suspense } from 'react';

import ProfileClient from './_components/profile-client';
import { ProfileSkeleton } from './_components/profile-skeleton';

export default function ProfilePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileClient />
      </Suspense>
    </div>
  );
}
