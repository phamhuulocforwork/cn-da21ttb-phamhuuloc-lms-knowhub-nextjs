import { ContentHeader } from '@/components/common/content-header';
import { LayoutTemplate } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseClientProps {
  course: Course;
}

export function CourseClient({ course }: CourseClientProps) {
  return (
    <div className='mx-4 mb-4 md:mx-11 md:mb-11'>
      <ContentHeader
        type='course'
        title={course.title}
        description={course?.description || ''}
        status={course.status}
      />
      <div className='my-11'>
        <div className='gird gird-cols-1 md:gird-cols-2 gap-6'>
          <div>
            <div className='flex items-center gap-x-2'>
              <LayoutTemplate className='h-6 w-6 text-primary' />
              <h2 className='text-xl font-bold'>Customize your course</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
