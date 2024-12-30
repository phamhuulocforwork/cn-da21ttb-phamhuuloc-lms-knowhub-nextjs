export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
}

export enum Role {
  GUEST = "GUEST",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}
