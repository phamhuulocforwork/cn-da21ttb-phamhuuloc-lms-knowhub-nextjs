import { CourseListItem } from "@/components/blocks/course/course-list-item";

export default function CourseList() {
  const courses = [
    {
      id: "cm5lfpr120008ushw39w16498",
      title: "Mastering UI/UX Design: A Guide",
      description: "Comprehensive guide to master UI/UX design principles",
      thumbnail: "https://placehold.co/400x400",
      videoUrl: null,
      status: "PUBLISHED",
      createdAt: "2025-01-06T19:28:27.158Z",
      updatedAt: "2025-01-06T19:28:27.158Z",
      publishedAt: null,
      deletedAt: null,
      authorId: "cm5lfpr080001ushwavi8wi7p",
      projectId: "cm5lfpr0r0006ushwe6zjjjbo",
      author: {
        id: "cm5lfpr080001ushwavi8wi7p",
        name: "Teacher",
        image: null,
      },
      categories: [
        {
          id: "cm5lfpr0g0003ushwxg6jctrl",
          name: "UI/UX Design",
          description:
            "User Interface and User Experience Design principles and practices",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "Design Learning Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawykk",
          type: "TEXT",
          value: "Introduction to UI/UX Design",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16498",
        },
        {
          id: "cm5lfpr12000aushw8p95ljdi",
          type: "VIDEO",
          value: "https://example.com/intro-video",
          order: 2,
          courseId: "cm5lfpr120008ushw39w16498",
        },
      ],
      _count: {
        enrollments: 1,
      },
    },
  ];

  return (
    <div className="mx-auto space-y-4">
      {courses.map((course) => (
        <CourseListItem
          key={course.id}
          title={course.title}
          description={course.description}
          thumbnail={course.thumbnail}
          categories={course.categories}
          updatedAt={course.updatedAt}
          content={course.content}
          enrollments={course._count.enrollments}
        />
      ))}
    </div>
  );
}
