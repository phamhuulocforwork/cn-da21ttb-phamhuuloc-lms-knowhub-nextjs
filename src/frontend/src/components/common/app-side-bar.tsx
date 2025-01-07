"use client";

import { usePathname } from "next/navigation";
import React from "react";

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
} from "@/components/ui/side-bar";

import { Logo } from "@/components/common/logo";
import { Separator } from "@/components/ui/separator";
import useIsMobile from "@/components/hooks/use-mobile";
import { useAuth } from "@/contexts/auth-provider";

import { useTranslations } from "next-intl";
import { UserMenu } from "@/components/common/user-menu";
import { User } from "@/types/user";
import { navigations } from "@/config/sidebarConfig";
import { NavigationSkeleton } from "./navigation-skeleton";
import { UserMenuSkeleton } from "./user-menu-skeleton";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/routing";

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { user, status, logout } = useAuth();
  const t = useTranslations("sidebar");
  const pathname = usePathname();

  // Thêm state để track việc load auth lần đầu
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);

  const role = user?.role || "GUEST";
  const sidebarItems = navigations[role as keyof typeof navigations];

  // Chỉ show loading khi chưa load lần đầu và đang trong trạng thái loading
  const isLoading = !initialLoadComplete && status === "loading";

  // Effect để đánh dấu đã load xong lần đầu
  React.useEffect(() => {
    if (status !== "loading") {
      setInitialLoadComplete(true);
    }
  }, [status]);

  return (
    <Sidebar collapsible="icon">
      {!isMobile && (
        <SidebarTrigger className="absolute -right-3 top-20 z-30 rounded-full border border-border bg-background p-1 duration-0 dark:bg-foreground" />
      )}
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("navigation.navigation")}</SidebarGroupLabel>
          <SidebarGroupContent>
            {isLoading ? (
              <NavigationSkeleton />
            ) : (
              <SidebarMenu>
                {sidebarItems.navigations.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex items-center justify-center"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.endsWith(item.url)}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{t("navigation." + item.title)}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>

          {role === "TEACHER" && sidebarItems.projects && (
            <>
              <Separator className="my-2" />
              <SidebarGroupLabel className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {t("projects")}
                  <span className="rounded-sm bg-muted px-2 py-0.5 text-xs">
                    {sidebarItems.projects?.length || 0}
                  </span>
                </div>
                <Link
                  href="/teacher/project/create"
                  className="rounded-full border bg-background p-1"
                >
                  <Plus className="h-3 w-3" />
                </Link>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.projects.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="flex items-center justify-center"
                    >
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>adasa</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </>
          )}
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
