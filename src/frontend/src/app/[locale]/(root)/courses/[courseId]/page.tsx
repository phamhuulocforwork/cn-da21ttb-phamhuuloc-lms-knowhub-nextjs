import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { getServerSession } from 'next-auth';

import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { authOptions } from '@/lib/auth';

import { courseService } from '@/services/courseService';

import { CourseClient } from './_components/course-client';

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getServerSession(authOptions);

  try {
    const course = await courseService.getCourse(params.courseId);

    if (!course) {
      notFound();
    }

    return (
      <Suspense
        fallback={
          <div className='flex h-screen w-full items-center justify-center'>
            <LoadingSpinner size='lg' />
          </div>
        }
      >
        <CourseClient course={course} user={session?.user} />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}
