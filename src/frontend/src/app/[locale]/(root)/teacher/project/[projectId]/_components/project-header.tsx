"use client";

import { FolderKanban, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
  title: String;
}

export function ProjectHeader({title}: ProjectHeaderProps) {
  return (
    <div className="mb-4 mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="hidden rounded-md bg-accent p-2 text-accent-foreground md:block">
              <FolderKanban className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold md:text-2xl">
              {title}
            </h1>
          </div>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Content
        </Button>
      </div>
    </div>
  );
}
