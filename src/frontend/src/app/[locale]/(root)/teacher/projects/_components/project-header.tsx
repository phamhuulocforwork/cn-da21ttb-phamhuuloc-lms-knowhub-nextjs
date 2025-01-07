"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateProjectForm } from "./create-project-form";

const people = [
  {
    id: 1,
    name: "John Doe",
    image: "https://placewaifu.com/image/400",
  },
  {
    id: 2,
    name: "Robert Johnson",
    image: "https://placewaifu.com/image/400",
  },
  {
    id: 3,
    name: "Jane Smith",
    image: "https://placewaifu.com/image/400",
  },
];

export function ProjectHeader() {
  return (
    <div className="mx-4 space-y-4 py-8 md:mx-11">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Projects Name</h1>
          <AnimatedTooltip items={people} />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
