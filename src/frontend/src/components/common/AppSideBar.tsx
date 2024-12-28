"use client";

import { Search, Home, BookOpen, Users } from "lucide-react";

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

const sidebarConfig = {
  GUEST: {
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
      },
      {
        title: "Search",
        url: "/search",
        icon: Search,
      },
    ],
  },
  STUDENT: {
    navMain: [
      {
        title: "Home",
        url: "/student",
        icon: Home,
        isActive: true,
      },
      {
        title: "Courses",
        url: "/student/courses",
        icon: BookOpen,
      },
      {
        title: "Search",
        url: "/student/search",
        icon: Search,
      },
    ],
  },
  TEACHER: {
    navMain: [
      {
        title: "Home",
        url: "/teacher",
        icon: Home,
        isActive: true,
      },
      {
        title: "My Courses",
        url: "/teacher/courses",
        icon: BookOpen,
      },
      {
        title: "Students",
        url: "/teacher/students",
        icon: Users,
      },
    ],
  },
  ADMIN: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
        isActive: true,
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
    ],
  },
};

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

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
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.navMain.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="flex items-center justify-center"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
