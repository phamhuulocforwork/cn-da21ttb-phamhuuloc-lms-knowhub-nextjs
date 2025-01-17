import { CourseCard } from '@/components/blocks/course/course-card';

import { Course } from '@/types/course';

export default function CourseGrid({
  courses,
  showStatus = false,
  projectId,
}: {
  courses: Course[];
  showStatus?: boolean;
  projectId?: string;
}) {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3 2xl:grid-cols-4'>
      {courses.map((course, index) => (
        <CourseCard
          key={course.id}
          projectId={projectId}
          id={course.id}
          title={course.title}
          shortDescription={course?.short_description || ''}
          thumbnail={course?.thumbnail || ''}
          showStatus={showStatus}
          status={course?.status}
          categories={course.categories}
          updatedAt={course.updatedAt}
          enrollments={course._count.enrollments}
        />
      ))}
    </div>
  );
}
