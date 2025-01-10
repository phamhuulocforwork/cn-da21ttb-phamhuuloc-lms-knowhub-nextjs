import { Category } from "./category";
import { Course } from "./course";
import { Status } from "./common";
import { User } from "./user";
import { Quiz } from "./quiz";

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
