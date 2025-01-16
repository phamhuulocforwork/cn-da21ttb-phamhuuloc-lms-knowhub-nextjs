import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { ChapterClient } from './_components/chapter-client';

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; projectId: string; chapterId: string };
}) {
  try {
    return (
      <Suspense
        fallback={
          <div className='flex h-[calc(100vh-4rem)] w-full items-center justify-center'>
            <LoadingSpinner size='lg' />
          </div>
        }
      >
        <ChapterClient params={params} />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}
