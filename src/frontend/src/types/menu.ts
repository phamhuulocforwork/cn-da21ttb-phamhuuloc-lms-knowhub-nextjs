import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
  type?: 'navigation' | 'action';
}

export type MenuHandlers = {
  [key: string]: (
    router: AppRouterInstance,
    themeProps: {
      theme: string;
      setTheme: (theme: string) => void;
    },
    authProps: {
      logout?: () => void;
    },
  ) => void;
};
