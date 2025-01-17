import { Category } from './category';
import { Chapter } from './chapter';
import { Status } from './common';

export interface Course {
  id: string;
  title: string;
  description?: string | null;
  short_description: string;
  thumbnail?: string | null;
  videoUrl?: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  deletedAt?: Date | null;
  authorId: string;
  projectId?: string | null;
  categories: Category[];
  chapters: Chapter[];
  _count: {
    enrollments: number;
  };
  enrollments: CourseEnrollment[];
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
  };
  course: {
    id: string;
  };
}
