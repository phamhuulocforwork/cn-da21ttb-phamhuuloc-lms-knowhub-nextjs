import { SidebarTrigger } from "@/components/ui/SideBar";
import { SwitchTheme } from "@/components/app/SwitchTheme";
import { Logo } from "@/components/app/Logo";
import LoginModal from "@/components/auth/LoginModal";

import useIsMobile from "@/components/hooks/use-mobile";

export function AppHeader() {
  const isMobile = useIsMobile();

  return (
    <header className="flex max-h-20 min-h-20 w-full items-center justify-between px-4 md:px-11">
      {isMobile && <SidebarTrigger />}
      {!isMobile && <SwitchTheme variant="toggle" />}
      {isMobile && <Logo />}
      <LoginModal />
    </header>
  );
}
