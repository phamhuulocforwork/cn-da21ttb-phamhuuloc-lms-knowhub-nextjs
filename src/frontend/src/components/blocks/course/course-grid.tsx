import { CourseCard } from "@/components/blocks/course/course-card";

export default function CourseGrid() {
  const courses = [
    {
      id: "cm5lfpr120008ushw39w16498",
      title: "Mastering UI/UX Design: A Guide",
      description: "Comprehensive guide to master UI/UX design principles",
      thumbnail:
        "https://plus.unsplash.com/premium_vector-1731234275956-b027f5d889cc?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    {
      id: "cm5lfpr120008ushw39w16499",
      title: "Web Development Fundamentals",
      description: "Learn the basics of web development from scratch",
      thumbnail:
        "https://plus.unsplash.com/premium_vector-1734699537586-78bccc546fc1?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          id: "cm5lfpr0g0003ushwxg6jctr2",
          name: "Web Development",
          description:
            "Learn modern web development technologies and practices",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "Web Development Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawy01",
          type: "TEXT",
          value: "HTML & CSS Basics",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16499",
        },
      ],
      _count: {
        enrollments: 5,
      },
    },
    {
      id: "cm5lfpr120008ushw39w16500",
      title: "JavaScript Mastery",
      description: "Advanced JavaScript concepts and modern practices",
      thumbnail:
        "https://plus.unsplash.com/premium_vector-1734027997317-854a5f2c7b72?q=80&w=2196&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          id: "cm5lfpr0g0003ushwxg6jctr3",
          name: "JavaScript",
          description: "Modern JavaScript programming",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "JavaScript Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawy02",
          type: "TEXT",
          value: "ES6+ Features",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16500",
        },
      ],
      _count: {
        enrollments: 3,
      },
    },
    {
      id: "cm5lfpr120008ushw39w16501",
      title: "React.js Essential Training",
      description: "Build modern web applications with React",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          id: "cm5lfpr0g0003ushwxg6jctr4",
          name: "React",
          description: "React.js framework and ecosystem",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "Frontend Framework Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawy03",
          type: "TEXT",
          value: "React Hooks",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16501",
        },
      ],
      _count: {
        enrollments: 8,
      },
    },
    {
      id: "cm5lfpr120008ushw39w16502",
      title: "Node.js Backend Development",
      description: "Server-side programming with Node.js",
      thumbnail:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          id: "cm5lfpr0g0003ushwxg6jctr5",
          name: "Backend",
          description: "Backend development with Node.js",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "Backend Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawy04",
          type: "TEXT",
          value: "Express.js Basics",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16502",
        },
      ],
      _count: {
        enrollments: 4,
      },
    },
    {
      id: "cm5lfpr120008ushw39w16503",
      title: "Database Design",
      description: "Learn SQL and NoSQL database design",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          id: "cm5lfpr0g0003ushwxg6jctr6",
          name: "Database",
          description: "Database design and management",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "Database Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawy05",
          type: "TEXT",
          value: "SQL Fundamentals",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16503",
        },
      ],
      _count: {
        enrollments: 2,
      },
    },
    {
      id: "cm5lfpr120008ushw39w16504",
      title: "DevOps Essentials",
      description: "Introduction to DevOps practices and tools",
      thumbnail:
        "https://images.unsplash.com/photo-1667372335937-d03be6fb0a9c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          id: "cm5lfpr0g0003ushwxg6jctr7",
          name: "DevOps",
          description: "DevOps methodologies and tools",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "DevOps Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawy06",
          type: "TEXT",
          value: "CI/CD Pipeline",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16504",
        },
      ],
      _count: {
        enrollments: 6,
      },
    },
    {
      id: "cm5lfpr120008ushw39w16505",
      title: "Cloud Computing",
      description: "AWS cloud services and architecture",
      thumbnail: "https://plus.unsplash.com/premium_photo-1733306493254-52b143296396?q=80&w=1993&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          id: "cm5lfpr0g0003ushwxg6jctr8",
          name: "Cloud",
          description: "Cloud computing and services",
        },
      ],
      project: {
        id: "cm5lfpr0r0006ushwe6zjjjbo",
        title: "Cloud Path",
      },
      content: [
        {
          id: "cm5lfpr120009ushwqdzawy07",
          type: "TEXT",
          value: "AWS Basics",
          order: 1,
          courseId: "cm5lfpr120008ushw39w16505",
        },
      ],
      _count: {
        enrollments: 7,
      },
    },
  ];

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {courses.map((course, index) => (
          <CourseCard
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
    </div>
  );
}
