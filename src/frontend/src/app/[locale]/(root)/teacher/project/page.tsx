"use client";

import CourseGrid from "@/components/blocks/course/course-grid";
import { ProjectHeader } from "./_components/project-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CourseList from "@/components/blocks/course/course-list";
import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const tabsListStyle = cn(
  "flex h-9 w-full items-center justify-start gap-4",
  "rounded-none border-b border-border bg-transparent p-1",
);

const tabsTriggerStyle = cn(
  "h-9 bg-transparent rounded-none px-3 py-1.5",
  "data-[state=active]:border-b-2 data-[state=active]:border-b-primary",
  "data-[state=active]:bg-transparent data-[state=active]:text-foreground",
  "data-[state=active]:dark:text-background data-[state=active]:shadow-none font-semibold",
);

export default function TeacherProjectsPage() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mx-4 md:mx-11">
      <ProjectHeader />
      <Tabs defaultValue="course" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className={tabsListStyle}>
            <TabsTrigger className={tabsTriggerStyle} value="course">
              Course
            </TabsTrigger>
            <TabsTrigger className={tabsTriggerStyle} value="quiz">
              Quiz
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="course">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">
                All course <span className="text-muted-foreground">8</span>
              </h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Search..."
                  className="w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ToggleGroup
                  type="single"
                  value={viewType}
                  className="gap-0 rounded-md border"
                  onValueChange={(value) =>
                    value && setViewType(value as "grid" | "list")
                  }
                >
                  <ToggleGroupItem
                    className="rounded-r-none"
                    value="grid"
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="rounded-l-none"
                    value="list"
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            {viewType === "grid" ? <CourseGrid /> : <CourseList />}
          </div>
        </TabsContent>
        <TabsContent value="quiz">Quiz list here</TabsContent>
      </Tabs>
    </div>
  );
}
