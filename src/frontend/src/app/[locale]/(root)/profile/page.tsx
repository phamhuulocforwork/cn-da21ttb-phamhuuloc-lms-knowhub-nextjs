import { Suspense } from "react";
import { ProfileSkeleton } from "./_components/ProfileSkeleton";
import ProfileClient from "./_components/ProfileClient";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileClient />
      </Suspense>
    </div>
  );
}
