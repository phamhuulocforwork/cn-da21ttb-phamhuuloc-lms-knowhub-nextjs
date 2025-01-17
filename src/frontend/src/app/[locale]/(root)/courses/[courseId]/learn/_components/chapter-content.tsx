'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';
import { CheckCircle, VideoOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { Chapter } from '@/types/chapter';

import { chapterService } from '@/services/chapterService';

interface ChapterContentProps {
  courseId: string;
  chapterId: string;
  onComplete?: (chapterId: string) => void;
}

export function ChapterContent({
  courseId,
  chapterId,
  onComplete,
}: ChapterContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [html, setHtml] = useState<string>('');
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('course');

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setIsLoading(true);
        const data = await chapterService.getChapter(courseId, chapterId);
        setChapter(data);

        if (data.description) {
          const tempEditor = createEditor({
            nodes: [],
            onError: () => null,
          });
          tempEditor.setEditorState(
            tempEditor.parseEditorState(data.description),
          );
          tempEditor.update(() => {
            const htmlString = $generateHtmlFromNodes(tempEditor);
            // Check if editor state is empty
            const editorState = tempEditor.getEditorState();
            const json = editorState.toJSON();
            const isEmpty = json.root.children.every(
              (child: any) =>
                child.children.length === 0 ||
                (child.children.length === 1 && child.children[0].text === ''),
            );

            if (isEmpty) {
              setHtml(
                '<p class="text-muted-foreground italic">Empty content</p>',
              );
            } else {
              setHtml(htmlString);
            }
          });
        }
      } catch (error) {
        toast({
          title: t('loadError'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (chapterId) {
      fetchChapter();
    }
  }, [chapterId, courseId, toast, t]);

  const handleComplete = async () => {
    try {
      setIsUpdating(true);
      await chapterService.updateProgress(courseId, chapterId);

      toast({
        title: t('chapterCompleted'),
        description: t('nextChapter'),
      });

      onComplete?.(chapterId);
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.response?.data?.error || t('updateProgressError'),
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-lg font-semibold'>{t('notFound')}</h2>
          <p className='text-sm text-muted-foreground mt-1'>
            {t('notFoundDesc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      {chapter.videoUrl ? (
        <div className='relative aspect-video'>
          <iframe
            src={chapter.videoUrl}
            className='w-full h-full'
            allowFullScreen
          />
        </div>
      ) : (
        <div className='flex h-full items-center justify-center bg-slate-800'>
          <div className='text-center text-slate-400'>
            <VideoOff className='h-12 w-12 mx-auto mb-2' />
            <p>{t('noVideo')}</p>
          </div>
        </div>
      )}

      {/* Chapter info */}
      <div className='flex-1 p-4 md:p-6 overflow-y-auto'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h1 className='text-2xl font-bold'>{chapter.title}</h1>
            {chapter.userProgress?.isCompleted && (
              <p className='text-sm text-emerald-500 flex items-center gap-1 mt-1'>
                <CheckCircle className='h-4 w-4' />
                {t('completed')}
              </p>
            )}
          </div>
          <Button
            onClick={handleComplete}
            disabled={isUpdating || chapter.userProgress?.isCompleted}
            size='sm'
          >
            {isUpdating ? (
              <LoadingSpinner size='sm' />
            ) : chapter.userProgress?.isCompleted ? (
              <span>{t('alreadyCompleted')}</span>
            ) : (
              <>
                <CheckCircle className='h-4 w-4 mr-2' />
                {t('markComplete')}
              </>
            )}
          </Button>
        </div>

        {chapter.description && (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}
