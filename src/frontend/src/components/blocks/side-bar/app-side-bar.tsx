'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/side-bar';

import { Logo } from '@/components/common/logo';
import { NavigationSkeleton } from './navigation-skeleton';
import { ProjectList } from './project-list';
import React from 'react';
import { User } from '@/types/user';
import { UserMenu } from '@/components/blocks/side-bar/user-menu';
import { UserMenuSkeleton } from './user-menu-skeleton';
import { navigations } from '@/config/sidebarConfig';
import { useAuth } from '@/contexts/auth-provider';
import useIsMobile from '@/components/hooks/use-mobile';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { user, status, logout } = useAuth();
  const t = useTranslations('sidebar');
  const pathname = usePathname();

  // Thêm state để track việc load auth lần đầu
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);

  const role = user?.role || 'GUEST';
  const sidebarItems = navigations[role as keyof typeof navigations];

  // Chỉ show loading khi chưa load lần đầu và đang trong trạng thái loading
  const isLoading = !initialLoadComplete && status === 'loading';

  // Effect để đánh dấu đã load xong lần đầu
  React.useEffect(() => {
    if (status !== 'loading') {
      setInitialLoadComplete(true);
    }
  }, [status]);

  return (
    <Sidebar collapsible='icon'>
      {!isMobile && (
        <SidebarTrigger className='absolute -right-3 top-20 z-30 rounded-full border border-border bg-background p-1 duration-0 dark:bg-foreground' />
      )}
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.navigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            {isLoading ? (
              <NavigationSkeleton />
            ) : (
              <SidebarMenu>
                {sidebarItems.navigations.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className='flex items-center justify-center'
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.endsWith(item.url)}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{t('navigation.' + item.title)}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>

          {role === 'TEACHER' && <ProjectList />}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? (
          <UserMenuSkeleton />
        ) : (
          <UserMenu user={user as User | undefined} logout={logout} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
