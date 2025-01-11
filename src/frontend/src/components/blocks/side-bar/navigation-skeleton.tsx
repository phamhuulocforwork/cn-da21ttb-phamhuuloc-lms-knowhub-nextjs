import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/side-bar';
import { Skeleton } from '@/components/ui/skeleton';

export function NavigationSkeleton() {
  return (
    <SidebarMenu>
      {[...Array(3)].map((_, index) => (
        <SidebarMenuItem
          key={index}
          className='flex items-center justify-center'
        >
          <SidebarMenuButton asChild>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-4 w-24' />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
