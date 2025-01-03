"use client";

import { ChevronsUpDown } from "lucide-react";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/SideBar";

import { useTheme } from "next-themes";
import { User } from "@/types/user";
import { useRouter } from "@/i18n/routing";
import { menuItems } from "@/config/menuConfig";
import { menuHandlers } from "@/config/menuHandlers";
import { UserMenuSkeleton } from "./UserMenuSkeleton";
import { useAuth } from "@/contexts/AuthProvider";

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
  const { status } = useAuth();
  const role = user?.role || "GUEST";
  const items = menuItems[role];

  // Thêm state để track việc load auth lần đầu
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);

  // Chỉ show loading khi chưa load lần đầu và đang trong trạng thái loading
  const isLoading = !initialLoadComplete && status === "loading";

  // Effect để đánh dấu đã load xong lần đầu
  React.useEffect(() => {
    if (status !== "loading") {
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

  // Tách items theo type
  const navigationItems = items.filter((item) => item.type === "navigation");
  const actionItems = items.filter((item) => item.type === "action");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {user ? (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="assets/images/avatars/guest.png"
                    alt="user-image"
                  />
                  <AvatarFallback className="rounded-lg">G</AvatarFallback>
                </Avatar>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {user && (
              <>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              {/* Navigation Items */}
              {navigationItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleMenuAction(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </DropdownMenuItem>
              ))}

              {/* Separator */}
              {navigationItems.length > 0 && actionItems.length > 0 && (
                <DropdownMenuSeparator />
              )}

              {/* Action Items */}
              {actionItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleMenuAction(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.id === "theme"
                    ? `Theme: ${theme === "light" ? "dark" : "light"}`
                    : item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
