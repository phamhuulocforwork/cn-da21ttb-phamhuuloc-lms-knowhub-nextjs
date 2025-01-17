'use client';

import { Lock, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Progress } from '@/components/ui/process';

import { cn } from '@/lib/utils';

import { Course } from '@/types/course';

interface ChapterSidebarProps {
  course: Course;
  currentChapterId: string;
  onChapterSelect: (chapterId: string) => void;
}

export function ChapterSidebar({
  course,
  currentChapterId,
  onChapterSelect,
}: ChapterSidebarProps) {
  const t = useTranslations('course');

  // Tính toán tiến độ khóa học
  const completedChapters = course.chapters.filter(
    (chapter) => chapter.userProgress?.isCompleted,
  ).length;
  const totalPublishedChapters = course.chapters.filter(
    (chapter) => chapter.isPublished,
  ).length;
  const progress =
    totalPublishedChapters > 0
      ? (completedChapters / totalPublishedChapters) * 100
      : 0;

  return (
    <div className='flex h-full flex-col'>
      {/* Course info */}
      <div className='p-4 border-b'>
        <h2 className='font-semibold truncate'>{course.title}</h2>
        <div className='mt-2'>
          <Progress value={progress} className='h-2' />
          <p className='text-sm text-muted-foreground mt-2'>
            {completedChapters} / {totalPublishedChapters}{' '}
            {t('chaptersCompleted')}
          </p>
        </div>
      </div>

      {/* Chapter list */}
      <div className='flex-1 overflow-y-auto'>
        {course.chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onChapterSelect(chapter.id)}
            className={cn(
              'flex items-center gap-3 w-full p-4 text-start hover:bg-muted/50 transition-colors relative',
              currentChapterId === chapter.id && 'bg-muted',
              !chapter.isPublished && 'opacity-50',
            )}
            disabled={!chapter.isPublished}
          >
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              {chapter.isPublished ? (
                <PlayCircle className='h-4 w-4 text-muted-foreground flex-shrink-0' />
              ) : (
                <Lock className='h-4 w-4 text-muted-foreground flex-shrink-0' />
              )}
              <span className='text-sm truncate'>{chapter.title}</span>
            </div>
            {chapter.userProgress?.isCompleted && (
              <div className='h-2 w-2 bg-emerald-500 rounded-full absolute right-4' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
