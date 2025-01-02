import { Home, Users } from "lucide-react";

export const navigations = {
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
  },
  ADMIN: {
    navigations: [
      {
        title: "users",
        url: "/admin/users",
        icon: Users,
      },
    ],
  },
};
