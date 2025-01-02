"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/Command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  disabled = false,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(value);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = (optionValue: string) => {
    const newSelected = selected.includes(optionValue)
      ? selected.filter((s) => s !== optionValue)
      : [...selected, optionValue];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleRemove = (optionValue: string) => {
    const newSelected = selected.filter((s) => s !== optionValue);
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <Command className="overflow-visible bg-transparent">
      <div
        className={cn(
          "group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((selectedValue) => {
            const option = options.find((o) => o.value === selectedValue);
            if (!option) return null;
            return (
              <Badge key={selectedValue} variant="secondary">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRemove(selectedValue);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleRemove(selectedValue)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            disabled={disabled}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select..."
            className="placeholder:text-muted-foreground flex-1 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
