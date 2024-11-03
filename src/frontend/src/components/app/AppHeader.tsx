import { SidebarTrigger } from "@/components/ui/SideBar";
import useIsMobile from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/Button";
import { SwitchTheme } from "@/components/app/SwitchTheme";
import { Logo } from "@/components/app/Logo";
import { AppCommand } from "@/components/app/AppCommand";

export function AppHeader({
  handleShowLoginModal,
}: {
  handleShowLoginModal: () => void;
}) {
  const isMobile = useIsMobile();

  return (
    <header className="flex max-h-20 min-h-20 w-full items-center justify-between px-4 md:px-11">
      <AppCommand />
      {isMobile && <SidebarTrigger />}
      {!isMobile && <SwitchTheme variant="toggle" />}
      {isMobile && <Logo />}
      <Button onClick={handleShowLoginModal}>Login</Button>
    </header>
  );
}
