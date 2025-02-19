'use client';

import { useCallback, useEffect, useState } from 'react';

import * as z from 'zod';
import { LayoutList, LayoutTemplate } from 'lucide-react';
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
import { Option } from '@/components/ui/multiple-selector';

import { Chapter } from '@/types/chapter';
import { Status } from '@/types/common';
import { Course } from '@/types/course';

import { categoryService } from '@/services/categoryService';
import { courseService } from '@/services/courseService';

import { ChapterList } from './chapter-list';

const titleSchema = z
  .string()
  .min(1, 'Title is required')
  .max(100, 'Title is too long');
const shortDescriptionSchema = z
  .string()
  .min(1, 'Short description is required')
  .max(200, 'Short description is too long');

export function CourseClient({
  params,
}: {
  params: { courseId: string; projectId: string };
}) {
  const { toast } = useToast();
  const tToast = useTranslations('toast');
  const t = useTranslations('teacher.course');
  const tAlert = useTranslations('alertDialog');
  const [course, setCourse] = useState<Course | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const [categories, setCategories] = useState<Option[]>([]);

  const fetchCategories = useCallback(async (search: string = '') => {
    const { categories } = await categoryService.getCategories({
      page: 1,
      limit: 10,
      search,
    });

    const mappedCategories = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));

    setCategories(mappedCategories);
    return mappedCategories;
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  const handleSaveCategories = async (categoryIds: string[]) => {
    if (!course) return;

    try {
      await courseService.updateCourse(course.id, {
        categories: categories
          .filter((cat) => categoryIds.includes(cat.value))
          .map((cat) => ({
            id: cat.value,
            name: cat.label,
          })),
      });

      setCourse({
        ...course,
        categories: categories
          .filter((cat) => categoryIds.includes(cat.value))
          .map((cat) => ({
            id: cat.value,
            name: cat.label,
          })),
      });

      toast({
        variant: 'success',
        title: tToast('updateSuccess'),
      });
    } catch (error) {
      console.error('Failed to update course categories:', error);
      toast({
        variant: 'destructive',
        title: tToast('updateError'),
      });
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
            <AlertDialogTitle>{t('delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('delete.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tAlert('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className='bg-destructive hover:bg-destructive/90'
            >
              {tAlert('confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='my-11 flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-6'>
            <div className='flex items-center gap-x-2'>
              <LayoutTemplate className='h-6 w-6 text-primary' />
              <h2 className='text-xl font-bold'>{t('customize.title')}</h2>
            </div>

            <EditField
              label={t('customize.thumbnail')}
              value={course?.thumbnail || ''}
              type='file'
              endpoint='courseThumbnail'
              onSave={(url) => handleSaveField('thumbnail', url as string)}
              required
            />

            <EditField
              label={t('customize.courseTitle')}
              value={course.title}
              onSave={(value) => handleSaveField('title', value as string)}
              validation={titleSchema}
              required
            />

            <EditField
              label={t('customize.shortDescription')}
              value={course?.short_description || ''}
              onSave={(value) =>
                handleSaveField('short_description', value as string)
              }
              validation={shortDescriptionSchema}
              required
            />

            <EditField
              label={t('customize.categories')}
              value={course.categories.map((cat) => cat.id)}
              type='multiple-selector'
              options={categories}
              onSearch={fetchCategories}
              onSave={(value) => handleSaveCategories(value as string[])}
              required
            />
          </div>

          <div className='space-y-6'>
            <div className='flex items-center gap-x-2'>
              <LayoutList className='h-6 w-6 text-primary' />
              <h2 className='text-xl font-bold'>{t('chapters.title')}</h2>
            </div>
            <ChapterList
              projectId={params.projectId}
              courseId={course.id}
              items={course.chapters}
            />
          </div>
        </div>

        <EditField
          label={t('customize.description')}
          value={course?.description || ''}
          type='editor'
          onSave={(value) => handleSaveField('description', value as string)}
        />
      </div>
    </div>
  );
}
