import { SidebarTrigger } from "@/components/ui/SideBar";
import { SwitchThemeButton } from "@/components/app/SwitchThemeButton";
import useIsMobile from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/Button";

export function AppHeader({
  handleShowLoginModal,
}: {
  handleShowLoginModal: () => void;
}) {
  const isMobile = useIsMobile();

  return (
    <header className="flex max-h-20 min-h-20 w-full items-center justify-between px-11">
      {isMobile && <SidebarTrigger />}
      <SwitchThemeButton />
      <Button onClick={handleShowLoginModal}>Login</Button>
    </header>
  );
}
