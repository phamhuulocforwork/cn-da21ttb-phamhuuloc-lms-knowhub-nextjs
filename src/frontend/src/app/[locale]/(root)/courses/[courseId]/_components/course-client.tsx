'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';
import {
  BookOpen,
  CheckCircle,
  Clock,
  LayoutList,
  Lock,
  PlayCircle,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useToast } from '@/components/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { cn } from '@/lib/utils';

import { Course } from '@/types/course';
import { User as UserType } from '@/types/user';

import { courseService } from '@/services/courseService';

interface CourseClientProps {
  course: Course;
  user?: UserType;
}

export function CourseClient({ course, user }: CourseClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState<string>('');
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('course');

  const isEnrolled = course.enrollments?.some(
    (enrollment: any) => enrollment.userId === user?.id,
  );

  useEffect(() => {
    if (course.description) {
      const tempEditor = createEditor({
        nodes: [],
        onError: () => null,
      });
      tempEditor.setEditorState(
        tempEditor.parseEditorState(course.description),
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
          setHtml('<p class="text-muted-foreground italic">Empty content</p>');
        } else {
          setHtml(htmlString);
        }
      });
    }
  }, [course.description]);

  const handleEnrollCourse = async () => {
    try {
      setIsLoading(true);
      if (!user) {
        return router.push('/login');
      }

      await courseService.enrollCourse(course.id);
      toast({
        title: t('enrollSuccess'),
      });
      router.refresh();
    } catch (error: any) {
      toast({
        title: error.response?.data?.error || t('enrollError'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mx-4 mb-4 md:mx-11 md:mb-11'>
      <div className='mt-8 space-y-4 border-b pb-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-4'>
              <div
                className={cn(
                  'hidden rounded-md p-2 text-white md:block',
                  'bg-blue-500',
                )}
              >
                <BookOpen className='h-8 w-8' />
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <h1 className='text-xl font-bold md:text-xl'>
                    {course.title}
                  </h1>
                </div>
                {course.short_description && (
                  <p className='text-muted-foreground text-sm'>
                    {course.short_description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            {!isEnrolled ? (
              <Button onClick={handleEnrollCourse} disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner size='sm' />
                ) : (
                  <>
                    <User className='mr-2 h-4 w-4' />
                    {t('enroll')}
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => router.push(`/courses/${course.id}/learn`)}
              >
                <PlayCircle className='mr-2 h-4 w-4' />
                {t('continue')}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className='mt-8 space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <LayoutList className='h-5 w-5' />
                {t('chapters')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {course.chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className='flex items-center gap-2 text-sm'
                  >
                    {chapter.isPublished ? (
                      <>
                        <PlayCircle className='h-4 w-4 text-muted-foreground' />
                        <span>{chapter.title}</span>
                      </>
                    ) : (
                      <>
                        <Lock className='h-4 w-4 text-muted-foreground' />
                        <span className='text-muted-foreground'>
                          {t('chapterLocked')}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='h-5 w-5' />
                {t('courseInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-5 w-5 text-muted-foreground' />
                <span>
                  {course.chapters.length} {t('chapters')}
                </span>
              </div>
              {course.categories?.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {course.categories.map((category) => (
                    <Badge key={category.id} variant='secondary'>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {course.description && (
          <Card>
            <CardHeader>
              <CardTitle>{t('description')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
