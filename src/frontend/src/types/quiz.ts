import { Category } from './category';
import { QuestionType, Status } from './common';

export interface Quiz {
  id: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  duration: number;
  categories: Category[];
  startTime?: Date | null;
  endTime?: Date | null;
  randomizeAnswers: boolean;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  deletedAt?: Date | null;
  authorId: string;
  projectId?: string | null;
  _count: {
    enrollments: number;
    questions: number;
  };
}

export interface Question {
  id: string;
  type: QuestionType;
  content: string;
  image?: string | null;
  isRequired: boolean;
  points: number;
  multipleAnswers: boolean;
  order: number;
  quizId: string;
}

export interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
  order: number;
  questionId: string;
}

export interface CourseEnrollment {
  id: string;
  enrolledAt: Date;
  userId: string;
  courseId: string;
}

export interface QuizAttempt {
  id: string;
  startedAt: Date;
  submittedAt?: Date | null;
  score?: number | null;
  userId: string;
  quizId: string;
}

export interface QuestionAttempt {
  id: string;
  answer: string;
  attemptId: string;
  questionId: string;
}
