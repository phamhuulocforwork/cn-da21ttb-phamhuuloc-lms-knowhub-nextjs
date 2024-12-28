import { SidebarTrigger } from "@/components/ui/SideBar";
import { SearchBar } from "@/components/common/SearchBar";

export function AppHeader() {
  return (
    <header className="sticky flex max-h-20 min-h-20 w-full items-center justify-between px-4 md:px-11">
      <SidebarTrigger className="block md:hidden" />
      <SearchBar />
    </header>
  );
}
