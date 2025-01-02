"use client";

import { usePathname } from "next/navigation";

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
} from "@/components/ui/SideBar";

import { Logo } from "@/components/common/Logo";
import { Separator } from "@/components/ui/Separator";
import useIsMobile from "@/components/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthProvider";

import { useTranslations } from "next-intl";
import { UserMenu } from "@/components/common/UserMenu";
import { User } from "@/types/user";
import { navigations } from "@/config/sidebarConfig";

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const t = useTranslations("sidebar.navigation");
  const pathname = usePathname();

  const role = user?.role || "GUEST";
  const sidebarItems = navigations[role as keyof typeof navigations];

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
          <SidebarGroupLabel>{t("navigation")}</SidebarGroupLabel>
          <SidebarGroupContent>
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
                      <span>{t(item.title)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="my-2" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={user as User | undefined} logout={logout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
