"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { FolderKanban, Plus } from "lucide-react";

const people = [
  {
    id: 1,
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1678474297909-ab847047b276?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Robert Johnson",
    image:
      "https://images.unsplash.com/photo-1675876421108-7ef2e346f92b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1693010909469-aace53ce1cc2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function ProjectHeader() {
  return (
    <div className="mb-4 mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="hidden rounded-md bg-accent p-2 text-accent-foreground md:block">
              <FolderKanban className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold md:text-2xl">
              Become a professional web programmer👌
            </h1>
          </div>
          <div className="hidden md:flex">
            <AnimatedTooltip items={people} />
          </div>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Content
        </Button>
      </div>
    </div>
  );
}
