"use client";

import { Home, Users } from "lucide-react";
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
import { NavUser } from "@/components/common/NavUser";
import { useAuth } from "@/contexts/AuthProvider";
import { NavGuest } from "@/components/common/NavGuest";

import { useTranslations } from "next-intl";

const sidebarConfig = {
  GUEST: {
    navMain: [
      {
        title: "home",
        url: "/",
        icon: Home,
      },
    ],
  },
  STUDENT: {
    navMain: [
      {
        title: "home",
        url: "/student",
        icon: Home,
      },
    ],
  },
  TEACHER: {
    navMain: [
      {
        title: "home",
        url: "/teacher",
        icon: Home,
      },
    ],
  },
  ADMIN: {
    navMain: [
      {
        title: "users",
        url: "/admin/users",
        icon: Users,
      },
    ],
  },
};

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const t = useTranslations("navigation");
  const pathname = usePathname();

  const role = user?.role || "GUEST";
  const sidebarItems = sidebarConfig[role as keyof typeof sidebarConfig];

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
              {sidebarItems.navMain.map((item) => (
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
        {user ? <NavUser user={user} logout={logout} /> : <NavGuest />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
