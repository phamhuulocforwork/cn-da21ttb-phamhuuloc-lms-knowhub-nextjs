import { Course } from "@/types/course";
import { CourseCard } from "@/components/blocks/course/course-card";

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
      {courses.map((course, index) => (
        <CourseCard
          key={course.id}
          title={course.title}
          description={course?.description || ""}
          thumbnail={course?.thumbnail || ""}
          categories={course.categories}
          updatedAt={course.updatedAt}
          enrollments={course._count.enrollments}
        />
      ))}
    </div>
  );
}
