import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { projectService } from '@/services/projectService';

import { ProjectClient } from './_components/project-client';

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  try {
    const project = await projectService.getProject(params.projectId);

    if (!project) {
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
        <ProjectClient project={project} />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}
