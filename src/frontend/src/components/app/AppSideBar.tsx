"use client";

import { BookOpen, Home, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/SideBar";

import { Logo } from "@/components/app/Logo";
import useIsMobile from "@/components/hooks/use-mobile";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "My Learning",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon">
      {!isMobile && (
        <SidebarTrigger className="absolute -right-3 top-20 h-6 w-6 rounded-full border-2 border-border bg-background p-1 dark:bg-foreground" />
      )}
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
          {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
