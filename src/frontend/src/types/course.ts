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
}

export interface CourseEnrollment {
  id: string;
  enrolledAt: Date;
  userId: string;
  courseId: string;
}
