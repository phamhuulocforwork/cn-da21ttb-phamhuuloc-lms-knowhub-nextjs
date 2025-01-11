import { Skeleton } from '@/components/ui/skeleton';

export function ManagementSkeleton() {
  return (
    <div className='mx-4 py-10 md:mx-11'>
      <div className='space-y-4'>
        <div>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='mt-2 h-4 w-96' />
        </div>

        <div className='flex items-center justify-between'>
          <Skeleton className='h-6 w-32' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-10 w-[300px]' />
            <Skeleton className='h-10 w-24' />
            <Skeleton className='h-10 w-24' />
          </div>
        </div>

        <div className='mt-4'>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className='mb-2 h-16 w-full' />
          ))}
        </div>

        <Skeleton className='mt-4 h-10 w-full' />
      </div>
    </div>
  );
}
