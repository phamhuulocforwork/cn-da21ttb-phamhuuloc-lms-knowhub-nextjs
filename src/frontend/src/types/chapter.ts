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
    chapterId: string;
    isCompleted: boolean;
  } | null;
}

export interface MuxData {
  id: string;
  assetId: string;
  playbackId?: string;
  chapterId: string;
}
