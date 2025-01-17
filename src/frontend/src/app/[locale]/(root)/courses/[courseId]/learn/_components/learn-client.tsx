'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Course } from '@/types/course';

import { ChapterContent } from './chapter-content';
import { ChapterSidebar } from './chapter-sidebar';

interface LearnClientProps {
  course: Course;
}

export function LearnClient({ course }: LearnClientProps) {
  const [currentChapterId, setCurrentChapterId] = useState<string>(
    course.chapters[0]?.id || '',
  );
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(
    new Set(
      course.chapters
        .filter((chapter) => chapter.userProgress?.isCompleted)
        .map((chapter) => chapter.id),
    ),
  );
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('course');

  const goToNextChapter = () => {
    const currentIndex = course.chapters.findIndex(
      (chapter) => chapter.id === currentChapterId,
    );
    const nextChapter = course.chapters[currentIndex + 1];

    if (nextChapter && nextChapter.isPublished) {
      setCurrentChapterId(nextChapter.id);
      toast({
        title: t('nextChapter'),
        description: nextChapter.title,
      });
    } else if (currentIndex === course.chapters.length - 1) {
      toast({
        title: t('courseCompleted'),
        description: t('courseCompletedDesc'),
      });
      router.push('/courses');
    }
  };

  const handleChapterComplete = (chapterId: string) => {
    setCompletedChapters((prev) => {
      const newSet = new Set(prev);
      newSet.add(chapterId);
      return newSet;
    });
    goToNextChapter();
  };

  return (
    <div className='flex'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' className='md:hidden fixed left-2 top-4'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 w-72'>
          <ChapterSidebar
            course={course}
            currentChapterId={currentChapterId}
            onChapterSelect={setCurrentChapterId}
          />
        </SheetContent>
      </Sheet>

      <div className='hidden md:flex h-full w-80 flex-col border-r'>
        <ChapterSidebar
          course={course}
          currentChapterId={currentChapterId}
          onChapterSelect={setCurrentChapterId}
        />
      </div>

      <div className='flex-1 h-full overflow-y-auto'>
        <ChapterContent
          courseId={course.id}
          chapterId={currentChapterId}
          onComplete={() => handleChapterComplete(currentChapterId)}
        />
      </div>
    </div>
  );
}
