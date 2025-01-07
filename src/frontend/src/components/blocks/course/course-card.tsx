import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseCardProps {
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

export function CourseCard({
  title,
  description,
  thumbnail,
  categories,
  updatedAt,
  content,
  enrollments,
}: CourseCardProps) {
  const isOverflowing = title.length > 50;
  const lastEdited = new Date(updatedAt).toLocaleDateString();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="h-32 w-full object-cover"
          />
          <div className="absolute left-2 top-2 rounded-md bg-black/50">
            <div className="flex items-center gap-1 px-2 py-0.5 text-sm text-white">
              <span>{enrollments} Enrolled</span>
              <Users className="h-4 w-4" />
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8 rounded-full p-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3
            className={`${isOverflowing && "hover:scroll-text truncate hover:overflow-visible"} cursor-pointer font-semibold hover:text-primary-500`}
          >
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category.id} variant="tag">
              {category.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="text-muted-foreground flex w-full items-center justify-between text-sm">
          <div>Edited {lastEdited}</div>
          <div>{content.length} Contents</div>
        </div>
      </CardFooter>
    </Card>
  );
}
