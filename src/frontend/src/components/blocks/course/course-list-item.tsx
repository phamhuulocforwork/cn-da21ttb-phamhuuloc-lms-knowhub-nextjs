import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Album, MoreVertical, Users } from "lucide-react";

interface CourseListItemProps {
  title: string;
  description: string;
  thumbnail: string;
  categories: {
    id: string;
    name: string;
  }[];
  updatedAt: string;
  content: Array<any>;
  enrollments: number;
}

export function CourseListItem({
  title,
  description,
  thumbnail,
  categories,
  updatedAt,
  content,
  enrollments,
}: CourseListItemProps) {
  const lastEdited = new Date(updatedAt).toLocaleDateString();

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 hover:bg-accent/50 md:flex-row md:p-1">
      {/* Thumbnail */}
      <div className="relative h-48 w-full flex-shrink-0 md:h-32 md:w-48">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full rounded-md object-cover"
        />
        <div className="absolute left-2 top-2 rounded-md bg-black/50">
          <div className="flex items-center gap-1 px-2 py-0.5 text-sm text-white">
            <span>{enrollments} Enrolled</span>
            <Users className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="line-clamp-2 font-semibold hover:text-primary-500 md:line-clamp-1">
                {title}
              </h3>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {description}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category) => (
              <Badge key={category.id} variant="tag" className="text-xs">
                {category.name}
              </Badge>
            ))}
            {categories.length > 2 && (
              <Badge variant="tag" className="text-xs">
                +{categories.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="text-slate-500">Edited {lastEdited}</div>
            <div className="hidden text-slate-500 md:block">•</div>
            <div className="flex items-center gap-1">
              <Album className="h-4 w-4" />
              {content.length} Chapters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
