import { LayoutTemplate } from 'lucide-react';

export default async function CourseDetailPage({
  params,
}: {
  params: { projectId: string; courseId: string };
}) {
  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-bold'>
            Course setup for {params.courseId}
          </h1>
          <span>Complete all fields</span>
        </div>
      </div>
      <div className='gird gird-cols-1 md:gird-cols-2 mt-16 gap-6'>
        <div>
          <div className='flex items-center gap-x-2'>
            <LayoutTemplate className='h-6 w-6 text-primary' />
            <h2 className='text-xl font-bold'>Customize your course</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
