import { Category } from './category';
import { Status } from './common';
import { Course } from './course';
import { Quiz } from './quiz';
import { User } from './user';

export interface Project {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  deletedAt?: Date;
  authorId: string;
  author?: User;
  _count?: {
    courses: number;
    quizzes: number;
  };
}

export interface ProjectWithContent extends Project {
  courses: Course[];
  quizzes: Quiz[];
  categories: Category[];
}

export interface ProjectStats {
  totalEnrollments: number;
  averageRating?: number;
  completionRate?: number;
  activeStudents: number;
}
