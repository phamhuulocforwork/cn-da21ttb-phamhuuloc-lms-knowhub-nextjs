export interface Chapter {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  position: number;
  isPublished: boolean;
  courseId: string;
  muxData?: MuxData;
  userProgress?: {
    id: string;
    userId: string;
    isCompleted: boolean;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface MuxData {
  id: string;
  assetId: string;
  playbackId?: string;
  chapterId: string;
}
