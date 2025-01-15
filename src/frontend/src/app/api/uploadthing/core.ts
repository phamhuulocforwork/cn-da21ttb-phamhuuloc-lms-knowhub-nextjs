import { getServerSession } from 'next-auth';
import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { authOptions } from '@/lib/auth';

const f = createUploadthing();

const auth = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new UploadThingError('Unauthorized');
  }

  return { id: session.user.id };
};

export const ourFileRouter = {
  courseThumbnail: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      return { userId: user.id };
    })
    .onUploadComplete(() => {}),
  courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
    .middleware(async ({ req }) => {
      const user = await auth(req);
      return { userId: user.id };
    })
    .onUploadComplete(() => {}),
  chapterVideo: f({
    video: {
      maxFileSize: '512GB',
      maxFileCount: 1,
    },
  }).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
