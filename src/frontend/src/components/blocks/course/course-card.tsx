import Image from 'next/image';

import { Album, MoreVertical, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { Category } from '@/types/category';

import { useRouter } from '@/i18n/routing';

interface CourseCardProps {
  projectId?: string;
  id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  showStatus: boolean;
  status: string;
  categories: Category[];
  updatedAt: Date;
  enrollments: number;
}

export function CourseCard({
  projectId,
  id,
  title,
  shortDescription,
  thumbnail,
  showStatus,
  status,
  categories,
  updatedAt,
  enrollments,
}: CourseCardProps) {
  const isOverflowing = title.length > 50;
  const lastEdited = new Date(updatedAt).toLocaleDateString();
  const t = useTranslations('course');
  const router = useRouter();

  const handleClick = () => {
    if (projectId) {
      router.push(`/teacher/project/${projectId}/course/${id}`);
    } else {
      router.push(`/courses/${id}`);
    }
  };

  return (
    <Card className='flex h-full flex-col overflow-hidden'>
      <CardHeader className='relative p-0'>
        <div className='relative'>
          <Image
            src={thumbnail}
            alt={title}
            width={300}
            height={200}
            className='h-32 w-full cursor-pointer object-cover'
            onClick={() => handleClick()}
          />
          <div className='absolute left-2 top-2 flex flex-col gap-1 rounded-md bg-black/50'>
            <div className='flex items-center gap-1 px-2 py-0.5 text-sm text-white'>
              <span>
                {enrollments > 0
                  ? `${enrollments} ${t('enrolled')}`
                  : `${t('noEnrollments')}`}
              </span>
              <Users className='h-4 w-4' />
            </div>
          </div>
          {showStatus && (
            <div className='absolute bottom-2 right-2 flex flex-col gap-1'>
              <div
                className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-sm text-white ${
                  status === 'PUBLISHED'
                    ? 'bg-green-500'
                    : status === 'DRAFT'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              >
                <span>{status.charAt(0) + status.slice(1).toLowerCase()}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col p-4'>
        <div className='mb-4 flex-1'>
          <h3
            className={`${isOverflowing && 'hover:scroll-text truncate hover:overflow-visible'} cursor-pointer font-semibold hover:text-primary-500`}
            onClick={() => handleClick()}
          >
            {title}
          </h3>
          <p className='text-muted-foreground line-clamp-2 text-sm'>
            {shortDescription}
          </p>
        </div>
        <div className='flex flex-wrap gap-1'>
          {categories.slice(0, 2).map((category) => (
            <Badge
              key={category.id}
              variant='tag'
              className='text-xs text-foreground'
            >
              {category.name}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant='tag' className='text-xs text-foreground'>
              +{categories.length - 2} {t('more')}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex items-center gap-2 text-sm font-medium'>
          <div className='text-slate-500'>
            {t('edited')} {lastEdited} •
          </div>
          <div className='flex items-center gap-1'>
            <Album className='h-4 w-4' />
            {/* TODO: Hiện thị số lượng bài học */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
