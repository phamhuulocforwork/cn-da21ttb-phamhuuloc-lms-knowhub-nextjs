export enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  DELETED = "DELETED",
}

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SHORT_ANSWER = "SHORT_ANSWER",
  LONG_ANSWER = "LONG_ANSWER",
}

export enum ContentType {
  FILE = "FILE",
  LINK = "LINK",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  CODE = "CODE",
  MATH = "MATH",
  TABLE = "TABLE",
  CHART = "CHART",
  DIAGRAM = "DIAGRAM",
  GRAPH = "GRAPH",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
}
