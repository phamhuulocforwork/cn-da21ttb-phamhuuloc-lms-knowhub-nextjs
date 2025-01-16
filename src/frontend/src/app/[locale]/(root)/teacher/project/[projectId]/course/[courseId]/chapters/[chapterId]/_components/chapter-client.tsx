'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { ArrowLeft, LayoutTemplate, Video } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ContentHeader } from '@/components/common/content-header';
import { EditField } from '@/components/common/edit-field';
import { useToast } from '@/components/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Chapter } from '@/types/chapter';

import { chapterService } from '@/services/chapterService';

import { ChapterVideoForm } from './chapter-video-form';

const titleSchema = z
  .string()
  .min(1, 'Title is required')
  .max(100, 'Title is too long');

const descriptionSchema = z
  .string()
  .min(1, 'Description is required')
  .max(400, 'Description is too long');

export function ChapterClient({
  params,
}: {
  params: { courseId: string; projectId: string; chapterId: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const tToast = useTranslations('toast');
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      const chapterData = await chapterService.getChapter(
        params.courseId,
        params.chapterId,
      );
      setChapter(chapterData);
    };

    fetchChapter();
  }, [params.courseId, params.chapterId]);

  const handleSaveField = async (field: string, value: string) => {
    if (!chapter) return;

    try {
      await chapterService.updateChapter(params.courseId, chapter.id, {
        [field]: value,
      });

      setChapter({
        ...chapter,
        [field]: value,
      });

      toast({
        variant: 'success',
        title: tToast('updateSuccess'),
      });
    } catch (error) {
      console.error('Failed to update chapter:', error);
      toast({
        variant: 'destructive',
        title: tToast('updateError'),
      });
    }
  };

  const handleTogglePublish = async () => {
    if (!chapter) return;

    setIsPublishLoading(true);
    try {
      await chapterService.updateChapter(params.courseId, chapter.id, {
        isPublished: !chapter.isPublished,
      });

      setChapter({
        ...chapter,
        isPublished: !chapter.isPublished,
      });

      toast({
        variant: 'success',
        title: tToast('updateSuccess'),
      });
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      toast({
        variant: 'destructive',
        title: tToast('updateError'),
      });
    } finally {
      setIsPublishLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!chapter) return;

    setIsDeleteLoading(true);
    try {
      await chapterService.deleteChapter(params.courseId, chapter.id);
      router.push(
        `/teacher/project/${params.projectId}/course/${params.courseId}`,
      );

      toast({
        variant: 'success',
        title: tToast('deleteSuccess'),
      });
    } catch (error) {
      console.error('Failed to delete chapter:', error);
      toast({
        variant: 'destructive',
        title: tToast('deleteError'),
      });
    } finally {
      setIsDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  if (!chapter) {
    return null;
  }

  return (
    <div className='mx-4 mb-4 md:mx-11 md:mb-11'>
      <ContentHeader
        type='chapter'
        title={chapter.title}
        status={chapter.isPublished ? 'PUBLISHED' : 'UNPUBLISHED'}
        onTogglePublish={handleTogglePublish}
        onDelete={() => setShowDeleteDialog(true)}
        isDeleteLoading={isDeleteLoading}
        isPublishLoading={isPublishLoading}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chapter</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chapter? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className='bg-destructive hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='my-11 flex flex-col gap-4'>
        <div className='w-full'>
          <Link
            href={`/teacher/project/${params.projectId}/course/${params.courseId}`}
            className='flex items-center text-sm font-semibold hover:opacity-75'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to course
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-6'>
            <div className='flex items-center gap-x-2'>
              <LayoutTemplate className='h-6 w-6 text-primary' />
              <h2 className='text-xl font-bold'>Chapter Details</h2>
            </div>

            <EditField
              label='Chapter Title'
              value={chapter.title}
              onSave={(value) => handleSaveField('title', value as string)}
              validation={titleSchema}
              required
            />

            <EditField
              label='Chapter Description'
              value={chapter?.description || ''}
              type='editor'
              onSave={(value) =>
                handleSaveField('description', value as string)
              }
              validation={descriptionSchema}
              required
            />
          </div>

          <div className='space-y-6'>
            <div className='flex items-center gap-x-2'>
              <Video className='h-6 w-6 text-primary' />
              <h2 className='text-xl font-bold'>Chapter Video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
