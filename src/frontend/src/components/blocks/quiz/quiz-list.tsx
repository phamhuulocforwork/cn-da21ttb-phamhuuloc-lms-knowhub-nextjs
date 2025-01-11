import { Course } from '@/types/course';
import { CourseListItem } from '@/components/blocks/course/course-list-item';

export default function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className='w-full space-y-4'>
      {courses.map((course) => (
        <CourseListItem
          key={course.id}
          title={course.title}
          description={course?.description || ''}
          thumbnail={course?.thumbnail || ''}
          categories={course.categories}
          updatedAt={course.updatedAt}
          enrollments={course._count.enrollments}
        />
      ))}
    </div>
  );
}
