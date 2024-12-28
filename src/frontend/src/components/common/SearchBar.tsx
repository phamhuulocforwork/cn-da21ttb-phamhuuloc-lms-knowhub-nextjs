"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command";
import { Calendar, Smile, Calculator, User, Settings } from "lucide-react";

//TODO:
const suggestions = [
  {
    icon: Calendar,
    label: "Calendar",
    disabled: false,
  },
  {
    icon: Smile,
    label: "Search Emoji",
    disabled: false,
  },
  {
    icon: Calculator,
    label: "Calculator",
    disabled: true,
  },
];

const settingsItems = [
  {
    icon: User,
    label: "Profile",
    shortcut: "⌘P",
  },
  {
    icon: Settings,
    label: "Settings",
    shortcut: "⌘S",
  },
];

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      <Command className="rounded-md border">
        <CommandInput
          ref={inputRef}
          placeholder="Search... (⌘K)"
          className="placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <div className="absolute mt-14 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {suggestions.map((item) => (
                  <CommandItem key={item.label} disabled={item.disabled}>
                    <item.icon />
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                {settingsItems.map((item) => (
                  <CommandItem key={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
