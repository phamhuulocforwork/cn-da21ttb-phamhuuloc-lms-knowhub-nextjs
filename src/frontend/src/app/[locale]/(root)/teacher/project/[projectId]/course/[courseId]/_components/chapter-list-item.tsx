'use client';

import { useRouter } from 'next/navigation';

import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { Chapter } from '@/types/chapter';

interface ChapterListItemProps {
  chapter: Chapter;
  projectId?: string;
  courseId: string;
  disabled?: boolean;
}

export function ChapterListItem({
  chapter,
  projectId,
  courseId,
  disabled,
}: ChapterListItemProps) {
  const router = useRouter();
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={chapter}
      dragListener={false}
      dragControls={dragControls}
      className={cn(
        'flex w-full items-center justify-between rounded-md border bg-background p-3',
        chapter.isPublished
          ? 'border-primary/50 bg-primary/5 border-solid'
          : 'border-dashed',
      )}
    >
      <div className='flex flex-1 items-center gap-4'>
        <div
          className={cn('cursor-grab', disabled && 'cursor-default')}
          onPointerDown={(e) => {
            if (disabled) return;
            e.preventDefault();
            dragControls.start(e);
          }}
        >
          <GripVertical className='h-5 w-5 text-muted-foreground' />
        </div>

        <div className='flex flex-col gap-y-1'>
          <div className='font-medium'>{chapter.title}</div>
        </div>
      </div>

      <Button
        variant='ghost'
        size='icon'
        disabled={disabled}
        onClick={() =>
          router.push(
            `/teacher/project/${projectId}/course/${courseId}/chapters/${chapter.id}`,
          )
        }
      >
        <Pencil className='h-4 w-4' />
      </Button>
    </Reorder.Item>
  );
}
