import { ChartColumnStacked, Home, Users, FolderKanban } from "lucide-react";

type NavigationItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

type NavigationConfig = {
  navigations: NavigationItem[];
  projects?: NavigationItem[];
};

export const navigations: Record<string, NavigationConfig> = {
  GUEST: {
    navigations: [
      {
        title: "home",
        url: "/",
        icon: Home,
      },
    ],
  },
  STUDENT: {
    navigations: [
      {
        title: "home",
        url: "/student",
        icon: Home,
      },
    ],
  },
  TEACHER: {
    navigations: [
      {
        title: "home",
        url: "/teacher",
        icon: Home,
      },
    ],
    projects: [
      {
        title: "projects",
        url: "/teacher/projects",
        icon: FolderKanban,
      },
    ],
  },
  ADMIN: {
    navigations: [
      {
        title: "users",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "category",
        url: "/admin/category",
        icon: ChartColumnStacked,
      },
    ],
  },
};
