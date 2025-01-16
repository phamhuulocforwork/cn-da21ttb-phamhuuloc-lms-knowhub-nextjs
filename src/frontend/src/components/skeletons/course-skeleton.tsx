import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CourseGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3 2xl:grid-cols-4'>
      {[...Array(6)].map((_, i) => (
        <Card key={i} className='overflow-hidden'>
          <Skeleton className='aspect-video w-full' />
          <CardContent className='mt-5'>
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='mt-4 h-4 w-full' />
            <Skeleton className='mt-2 h-4 w-full' />
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-4 w-[70px]' />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function CourseListSkeleton() {
  return (
    <div className='space-y-4'>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className='flex w-full gap-4 rounded-lg border bg-card p-4'
        >
          <Skeleton className='h-[120px] w-[213px]' />
          <div className='flex flex-1 flex-col justify-between'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-1/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
            </div>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-4 w-[70px]' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 