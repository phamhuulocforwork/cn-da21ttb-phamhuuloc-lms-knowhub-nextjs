import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { courseService } from '@/services/courseService';
import { projectService } from '@/services/projectService';

import { CourseClient } from './_components/course-client';

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string; projectId: string };
}) {
  try {
    const [course, project] = await Promise.all([
      courseService.getCourse(params.courseId),
      projectService.getProject(params.projectId),
    ]);

    if (!course || !project) {
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
        <CourseClient params={params} />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}
