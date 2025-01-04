import { Status } from "./common";

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
}
