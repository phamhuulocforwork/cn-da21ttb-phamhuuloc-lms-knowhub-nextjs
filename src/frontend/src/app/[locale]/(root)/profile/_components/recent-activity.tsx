import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { RecentActivity } from '@/types/profile';

interface Props {
  activity: RecentActivity;
}

export default async function RecentActivity({ activity }: Props) {
  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div>
            <h3 className='mb-2 text-lg font-semibold'>
              Latest Enrolled Courses
            </h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {activity.enrolledCourses.map((course: any) => (
                <div key={course.id} className='flex items-center space-x-4'>
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={50}
                    height={50}
                    unoptimized={true} // FIXME: xóa khi sử dụng ảnh thật
                    className='rounded'
                  />
                  <span>{course.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className='mb-2 text-lg font-semibold'>Recent Quiz Attempts</h3>
            <div className='space-y-2'>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {activity.quizAttempts.map((quiz: any) => (
                <div
                  key={quiz.id}
                  className='flex items-center justify-between'
                >
                  <span>{quiz.title}</span>
                  <span className='font-semibold'>{quiz.score}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className='mb-2 text-lg font-semibold'>Created Content</h3>
            <div className='space-y-2'>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {activity.createdContent.map((content: any) => (
                <div
                  key={content.id}
                  className='flex items-center justify-between'
                >
                  <span>{content.title}</span>
                  <span className='text-muted-foreground text-sm'>
                    {content.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
