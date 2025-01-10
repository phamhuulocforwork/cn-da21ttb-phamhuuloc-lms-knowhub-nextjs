import { Category } from "./category";
import { Status } from "./common";

export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  videoUrl?: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  deletedAt?: Date;
  authorId: string;
  projectId?: string;
  categories: Category[];
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
