import { Course } from '@/types/course';
import { CourseListItem } from '@/components/blocks/course/course-list-item';

export default function CourseList({
  courses,
  showStatus = false,
  projectId,
}: {
  courses: Course[];
  showStatus?: boolean;
  projectId: string;
}) {
  return (
    <div className='w-full space-y-4'>
      {courses.map((course) => (
        <CourseListItem
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
