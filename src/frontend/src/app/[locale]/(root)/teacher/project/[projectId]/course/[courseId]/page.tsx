import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CourseClient } from './_components/course-client';
import { courseService } from '@/services/courseService';

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  try {
    const course = await courseService.getCourse(params.courseId);

    if (!course) {
      notFound();
    }

    return (
      <Suspense
        fallback={
          <div className='flex h-[calc(100vh-4rem)] w-full items-center justify-center'>
            <LoadingSpinner size='lg' />
          </div>
        }
      >
        <CourseClient />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}
