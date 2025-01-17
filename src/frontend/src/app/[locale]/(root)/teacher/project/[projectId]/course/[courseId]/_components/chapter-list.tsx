'use client';

import { useState } from 'react';

import { Reorder } from 'framer-motion';
import { CirclePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';

import { Chapter } from '@/types/chapter';

import { chapterService } from '@/services/chapterService';

import { ChapterForm } from './chapter-form';
import { ChapterListItem } from './chapter-list-item';

interface ChapterListProps {
  projectId?: string;
  courseId: string;
  items: Chapter[];
}

export function ChapterList({
  projectId,
  courseId,
  items: initialChapters,
}: ChapterListProps) {
  const [chapters, setChapters] = useState(initialChapters);
  const [isCreating, setIsCreating] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('teacher.course.chapters');

  const handleCreateSuccess = (newChapter: Chapter) => {
    setChapters([...chapters, newChapter]);
    setIsCreating(false);
  };

  const handleReorder = async (reorderedChapters: Chapter[]) => {
    // Update local state immediately for smooth UX
    setChapters(reorderedChapters);

    // Prevent multiple reorder requests
    if (isReordering) return;

    try {
      setIsReordering(true);

      // Map through reordered chapters to get their new positions
      const updates = reorderedChapters.map((chapter, index) =>
        chapterService.updateChapterPosition(courseId, chapter.id, index),
      );

      // Wait for all position updates to complete
      await Promise.all(updates);

      toast({
        variant: 'success',
        title: t('updateSuccess'),
      });
    } catch (error) {
      // Revert to original order on error
      setChapters(chapters);

      console.error('Failed to reorder chapters:', error);
      toast({
        variant: 'destructive',
        title: t('updateError'),
      });
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className='space-y-4 rounded-md bg-muted-50 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>{t('title')}</h2>
        <Button variant='ghost' onClick={() => setIsCreating(true)}>
          <CirclePlus className='mr-2 h-4 w-4' />
          {t('addChapter')}
        </Button>
      </div>

      {isCreating && (
        <ChapterForm
          courseId={courseId}
          onSuccess={handleCreateSuccess}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <Reorder.Group
        axis='y'
        values={chapters}
        onReorder={handleReorder}
        className='space-y-2'
      >
        {!chapters.length && (
          <p className='text-sm text-muted-foreground'>{t('noChapters')}</p>
        )}
        {chapters.map((chapter) => (
          <Reorder.Item
            key={chapter.id}
            value={chapter}
            disabled={isReordering}
          >
            <ChapterListItem
              key={chapter.id}
              chapter={chapter}
              projectId={projectId}
              courseId={courseId}
              disabled={isReordering}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
