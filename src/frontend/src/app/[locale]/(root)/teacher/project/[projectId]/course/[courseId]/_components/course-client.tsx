'use client';

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
import { useCallback, useEffect, useState } from 'react';

import { ContentHeader } from '@/components/common/content-header';
import { Course } from '@/types/course';
import { EditField } from '@/components/common/edit-field';
import { LayoutTemplate } from 'lucide-react';
import { Status } from '@/types/common';
import { categoryService } from '@/services/categoryService';
import { courseService } from '@/services/courseService';
import { useToast } from '@/components/hooks/use-toast';
import { useTranslations } from 'next-intl';

export function CourseClient({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const { toast } = useToast();
  const tToast = useTranslations('toast');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await courseService.getCourse(
        params.courseId as string,
      );
      setCourse(courseData);
    };

    fetchCourse();
  }, [params.courseId]);

  const handleSaveField = async (field: string, value: string) => {
    if (!course) return;

    try {
      await courseService.updateCourse(course.id, {
        [field]: value,
      });

      setCourse({
        ...course,
        [field]: value,
      });

      toast({
        variant: 'success',
        title: tToast('updateSuccess'),
      });
    } catch (error) {
      console.error('Failed to update course:', error);
      toast({
        variant: 'destructive',
        title: tToast('updateError'),
      });
    }
  };

  const handleTogglePublish = async () => {
    if (!course) return;

    setIsPublishLoading(true);
    const newStatus =
      course.status === Status.PUBLISHED
        ? Status.UNPUBLISHED
        : Status.PUBLISHED;

    try {
      await courseService.updateCourse(course.id, {
        status: newStatus,
      });

      setCourse({
        ...course,
        status: newStatus,
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
    if (!course) return;

    setIsDeleteLoading(true);
    try {
      await courseService.updateCourse(course.id, {
        status: Status.DELETED,
      });

      setCourse({
        ...course,
        status: Status.DELETED,
      });

      toast({
        variant: 'success',
        title: tToast('deleteSuccess'),
      });
    } catch (error) {
      console.error('Failed to delete course:', error);
      toast({
        variant: 'destructive',
        title: tToast('deleteError'),
      });
    } finally {
      setIsDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  if (!course) {
    return null;
  }

  return (
    <div className='mx-4 mb-4 md:mx-11 md:mb-11'>
      <ContentHeader
        type='course'
        title={course.title}
        description={course?.short_description || ''}
        status={course.status}
        onTogglePublish={handleTogglePublish}
        onDelete={() => setShowDeleteDialog(true)}
        isDeleteLoading={isDeleteLoading}
        isPublishLoading={isPublishLoading}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this course? This action cannot be
              undone.
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
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-6'>
            <div className='flex items-center gap-x-2'>
              <LayoutTemplate className='h-6 w-6 text-primary' />
              <h2 className='text-xl font-bold'>Customize your course</h2>
            </div>

            <EditField
              label='Course Title'
              value={course.title}
              onSave={(value) => handleSaveField('title', value as string)}
            />

            <EditField
              label='Course Short Description'
              value={course?.short_description || ''}
              onSave={(value) =>
                handleSaveField('short_description', value as string)
              }
            />
          </div>
        </div>
        <EditField
          label='Course Description'
          value={course?.description || ''}
          type='editor'
          onSave={(value) => handleSaveField('description', value as string)}
        />
      </div>
    </div>
  );
}
