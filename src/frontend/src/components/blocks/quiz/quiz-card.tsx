import { Album, MoreVertical, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/category';
import { Question } from '../../../types/quiz';

interface QuizCardProps {
  title: string;
  description: string;
  thumbnail: string;
  categories: Category[];
  updatedAt: Date;
  enrollments: number;
  questions: number;
}

export function QuizCard({
  title,
  description,
  thumbnail,
  categories,
  updatedAt,
  enrollments,
  questions,
}: QuizCardProps) {
  const isOverflowing = title.length > 50;
  const lastEdited = new Date(updatedAt).toLocaleDateString();

  return (
    <Card className='flex h-full flex-col overflow-hidden'>
      <CardHeader className='relative p-0'>
        <div className='relative'>
          <img
            src={thumbnail}
            alt={title}
            className='h-32 w-full object-cover'
          />
          <div className='absolute left-2 top-2 rounded-md bg-black/50'>
            <div className='flex items-center gap-1 px-2 py-0.5 text-sm text-white'>
              <span>
                {enrollments > 0 ? `${enrollments} Enrolled` : 'No enrollments'}
              </span>
              <Users className='h-4 w-4' />
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='absolute right-2 top-2 h-8 w-8 rounded-full p-0'
            >
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col p-4'>
        <div className='mb-4 flex-1'>
          <h3
            className={`${isOverflowing && 'hover:scroll-text truncate hover:overflow-visible'} cursor-pointer font-semibold hover:text-primary-500`}
          >
            {title}
          </h3>
          <p className='text-muted-foreground line-clamp-2 text-sm'>
            {description}
          </p>
        </div>
        <div className='flex flex-wrap gap-1'>
          {categories.slice(0, 2).map((category) => (
            <Badge key={category.id} variant='tag' className='text-xs'>
              {category.name}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant='tag' className='text-xs'>
              +{categories.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex items-center gap-2 text-sm font-medium'>
          <div className='text-slate-500'>Edited {lastEdited} •</div>
          <div className='flex items-center gap-1'>
            <Album className='h-4 w-4' />
            {questions} questions
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
