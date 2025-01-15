'use client';

import { useEffect, useState } from 'react';

import type {
  RecentActivity as RecentActivityType,
  UserProfile,
  UserStats,
} from '@/types/profile';

import { userService } from '@/services/userService';

import AccountDetails from './account-details';
import ProfileHeader from './profile-header';
import RecentActivity from './recent-activity';
import StatsGrid from './stats-grid';

export default function ProfileClient() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activity, setActivity] = useState<RecentActivityType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [profileData, statsData, activityData] = await Promise.all([
        userService.getProfile(),
        userService.getProfileStats(),
        userService.getProfileActivity(),
      ]);

      setProfile(profileData);
      setStats(statsData);
      setActivity(activityData);
    };

    fetchData();
  }, []);

  if (!profile || !stats || !activity) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProfileHeader user={profile} />
      <StatsGrid stats={stats} />
      <RecentActivity activity={activity} />
      <AccountDetails user={profile} />
    </>
  );
}
