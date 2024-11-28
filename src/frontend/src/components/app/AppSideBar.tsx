"use client";

import {
  Search,
  Frame,
  PieChart,
  Home,
} from "lucide-react";

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

import { Logo } from "@/components/app/Logo";
import { Separator } from "@/components/ui/Separator";
import useIsMobile from "@/components/hooks/use-mobile";
import { NavUser } from "./NavUser";

const data = {
  user: {
    name: "Hữu Lộc",
    email: "phamhuulocforwork@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/146953048?v=4&size=64.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar() {
  const isMobile = useIsMobile();
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
              {data.navMain.map((item) => (
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
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem
                  key={item.name}
                  className="flex items-center justify-center"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
