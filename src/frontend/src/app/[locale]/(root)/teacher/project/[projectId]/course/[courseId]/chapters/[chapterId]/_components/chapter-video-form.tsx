'use client';

import { useState } from 'react';
import React from 'react';

import { useRouter } from 'next/navigation';

import { Pencil, PlusCircle, Video } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FileUpload } from '@/components/common/file-upload';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';

import { Chapter, MuxData } from '@/types/chapter';

import { chapterService } from '@/services/chapterService';

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

export function ChapterVideoForm({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const tToast = useTranslations('toast');
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (url: string) => {
    try {
      setIsLoading(true);

      await chapterService.updateChapter(courseId, chapterId, {
        videoUrl: url,
      });

      toast({
        variant: 'success',
        title: tToast('updateSuccess'),
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error('Error updating chapter video:', error);
      toast({
        variant: 'destructive',
        title: tToast('updateError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-6 rounded-md bg-slate-100 p-4'>
      <div className='font-medium flex items-center justify-between'>
        Chapter video
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && (
            <>
              <Video className='h-4 w-4 mr-2' />
              Cancel
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <Video className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <iframe
              src={initialData.videoUrl}
              className='w-full h-full'
              allowFullScreen
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload endpoint='chapterVideo' onChange={onSubmit} />
          <div className='text-xs text-muted-foreground mt-4'>
            Upload chapter video
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className='text-xs text-muted-foreground mt-2'>
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
}
