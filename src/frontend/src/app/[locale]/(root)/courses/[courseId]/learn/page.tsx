import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { getServerSession } from 'next-auth';

import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { authOptions } from '@/lib/auth';

import { courseService } from '@/services/courseService';

import { LearnClient } from './_components/learn-client';

export default async function LearnPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

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
        <LearnClient course={course} />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}
