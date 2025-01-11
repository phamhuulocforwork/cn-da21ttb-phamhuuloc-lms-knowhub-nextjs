import { Status } from './common';
import { Role } from './user';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: Role;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  projectsCount: number;
  coursesEnrolled: number;
  quizzesAttempted: number;
  averageQuizScore: number;
}

export interface RecentActivity {
  enrolledCourses: {
    id: string;
    title: string;
    thumbnail: string;
    status: Status;
  }[];
  quizAttempts: {
    id: string;
    title: string;
    score: number;
    submittedAt: Date;
  }[];
  createdContent: {
    id: string;
    title: string;
    type: 'Project' | 'Course' | 'Wiki';
    status: Status;
    createdAt: Date;
  }[];
}
