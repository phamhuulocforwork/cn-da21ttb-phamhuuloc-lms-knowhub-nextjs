"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  SunMoon,
  LogIn,
  UserPlus,
} from "lucide-react";

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
import { useTranslations } from "next-intl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const menuConfig = {
  GUEST: {
    items: [
      {
        icon: LogIn,
        title: "login",
        action: (router: AppRouterInstance) => router.push("/login"),
      },
      {
        icon: UserPlus,
        title: "register",
        action: (router: AppRouterInstance) => router.push("/register"),
      },
    ],
  },
};

export function NavUser({
  user,
  logout,
}: {
  user?: User;
  logout?: () => void;
}) {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const t = useTranslations("sidebar");
  const role = user?.role || "GUEST";
  const menuItems = menuConfig[role as keyof typeof menuConfig];

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
            {user ? (
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
                <DropdownMenuGroup>
                  {menuItems.items.map((item) => (
                    <DropdownMenuItem
                      key={item.title}
                      onClick={() => item.action?.(router)}
                    >
                      <item.icon />
                      {t(`menu.${item.title}`)}
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                  >
                    <SunMoon />
                    {t("tool.theme")}
                    {theme === "light" ? t("tool.light") : t("tool.dark")}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    {t("menu.logout")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            ) : (
              <DropdownMenuGroup>
                {menuItems.items.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="cursor-pointer"
                    onClick={() => item.action?.(router)}
                  >
                    <item.icon />
                    {t(`menu.${item.title}`)}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <SunMoon />
                  {t("tool.theme")}:{" "}
                  {theme === "light" ? t("tool.dark") : t("tool.light")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
