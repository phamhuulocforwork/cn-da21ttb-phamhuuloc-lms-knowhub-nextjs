import {
  BadgeCheck,
  LogOut,
  SunMoon,
  LogIn,
  UserPlus,
  BookOpen,
  LucideIcon,
} from 'lucide-react';

export type MenuItemType = {
  id: string;
  icon: LucideIcon;
  label: string;
  type?: 'navigation' | 'action';
};

export const menuItems = {
  ADMIN: [
    { id: 'profile', icon: BadgeCheck, label: 'Profile', type: 'navigation' },
    { id: 'theme', icon: SunMoon, label: 'Theme', type: 'action' },
    { id: 'logout', icon: LogOut, label: 'Log out', type: 'action' },
  ],
  TEACHER: [
    { id: 'profile', icon: BadgeCheck, label: 'Profile', type: 'navigation' },
    { id: 'courses', icon: BookOpen, label: 'My Courses', type: 'navigation' },
    { id: 'theme', icon: SunMoon, label: 'Theme', type: 'action' },
    { id: 'logout', icon: LogOut, label: 'Log out', type: 'action' },
  ],
  STUDENT: [
    { id: 'profile', icon: BadgeCheck, label: 'Profile', type: 'navigation' },
    { id: 'theme', icon: SunMoon, label: 'Theme', type: 'action' },
    { id: 'logout', icon: LogOut, label: 'Log out', type: 'action' },
  ],
  GUEST: [
    { id: 'login', icon: LogIn, label: 'Log In', type: 'navigation' },
    { id: 'register', icon: UserPlus, label: 'Register', type: 'navigation' },
    { id: 'theme', icon: SunMoon, label: 'Theme', type: 'action' },
  ],
} as const;
