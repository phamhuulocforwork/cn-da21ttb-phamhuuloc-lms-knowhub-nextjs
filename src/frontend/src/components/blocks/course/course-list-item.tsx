import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Users } from "lucide-react";

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
    <div className="flex gap-4 rounded-lg border p-4 hover:bg-accent/50">
      {/* Thumbnail */}
      <div className="relative h-32 w-48 flex-shrink-0">
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
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold hover:text-primary-500">{title}</h3>
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

        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category.id} variant="tag">
              {category.name}
            </Badge>
          ))}
        </div>

        <div className="text-muted-foreground mt-auto flex items-center justify-between text-sm">
          <div>Edited {lastEdited}</div>
          <div>{content.length} Contents</div>
        </div>
      </div>
    </div>
  );
}
