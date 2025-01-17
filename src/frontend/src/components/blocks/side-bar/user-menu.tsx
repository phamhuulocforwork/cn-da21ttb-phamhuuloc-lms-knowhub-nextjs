'use client';

import * as React from 'react';

import { ChevronsUpDown, Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/side-bar';

import { User } from '@/types/user';

import { menuItems } from '@/config/menuConfig';
import { menuHandlers } from '@/config/menuHandlers';
import { useAuth } from '@/contexts/auth-provider';
import { usePathname, useRouter } from '@/i18n/routing';

import { UserMenuSkeleton } from './user-menu-skeleton';

export function UserMenu({
  user,
  logout,
}: {
  user?: User;
  logout?: () => void;
}) {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useAuth();
  const t = useTranslations('sidebar');
  const role = user?.role || 'GUEST';
  const items = menuItems[role];

  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);

  const isLoading = !initialLoadComplete && status === 'loading';

  React.useEffect(() => {
    if (status !== 'loading') {
      setInitialLoadComplete(true);
    }
  }, [status]);

  if (isLoading) {
    return <UserMenuSkeleton />;
  }

  const handleMenuAction = (actionId: string) => {
    const handler = menuHandlers[actionId];
    if (handler) {
      handler(router, { theme: theme as string, setTheme }, { logout });
    }
  };

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  const navigationItems = items.filter((item) => item.type === 'navigation');
  const actionItems = items.filter((item) => item.type === 'action');

  const currentLocale = pathname.split('/')[1];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {user ? (
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback className='rounded-lg'>
                    {user?.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src='assets/images/avatars/guest.png'
                    alt='user-image'
                  />
                  <AvatarFallback className='rounded-lg'>G</AvatarFallback>
                </Avatar>
              )}
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user?.name}</span>
                <span className='truncate text-xs'>{user?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            {user && (
              <>
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className='rounded-lg'>
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>
                        {user.name}
                      </span>
                      <span className='truncate text-xs'>{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              {navigationItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleMenuAction(item.id)}
                  className='cursor-pointer'
                >
                  <item.icon className='h-4 w-4' />
                  {t.raw(`menu.${item.id}`)}
                </DropdownMenuItem>
              ))}

              {navigationItems.length > 0 && actionItems.length > 0 && (
                <DropdownMenuSeparator />
              )}

              {actionItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleMenuAction(item.id)}
                  className='cursor-pointer'
                >
                  <item.icon className='h-4 w-4' />
                  {item.id === 'theme'
                    ? `${t('tool.theme')}: ${t(`tool.${theme === 'light' ? 'dark' : 'light'}`)}`
                    : t.raw(`menu.${item.id}`)}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel className='flex items-center gap-2'>
                <Languages className='h-4 w-4' />
                {t('tool.language')}
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={currentLocale}
                onValueChange={handleLanguageChange}
              >
                <DropdownMenuRadioItem value='en'>
                  English
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='vi'>
                  Tiếng Việt
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
