'use client';

import {
  BookOpenText,
  LayoutTemplate,
  MessagesSquare,
  MonitorPlay,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

interface ContentHeaderProps {
  type: 'course' | 'quiz' | 'chapter';
  title: string;
  description?: string;
  status?: string;
  onTogglePublish?: () => void;
  onDelete?: () => void;
  isDeleteLoading?: boolean;
  isPublishLoading?: boolean;
}

export function ContentHeader({
  type,
  title,
  description,
  status,
  onTogglePublish,
  onDelete,
  isDeleteLoading,
  isPublishLoading,
}: ContentHeaderProps) {
  const getIcon = () => {
    switch (type) {
      case 'course':
        return <MonitorPlay className='h-8 w-8' />;
      case 'quiz':
        return <MessagesSquare className='h-8 w-8' />;
      case 'chapter':
        return <LayoutTemplate className='h-8 w-8' />;
      default:
        return <BookOpenText className='h-8 w-8' />;
    }
  };

  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'unpublished':
        return 'bg-red-500';
      default:
        return 'bg-red-500';
    }
  };

  const isPublished = status?.toLowerCase() === 'published';
  const showActionButtons = status?.toLowerCase() !== 'deleted';

  return (
    <div className='mt-8 space-y-4 border-b pb-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <div
              className={cn(
                'hidden rounded-md p-2 text-white md:block',
                type === 'course' ? 'bg-blue-500' : 'bg-orange-500',
              )}
            >
              {getIcon()}
            </div>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-bold md:text-xl'>{title}</h1>
                {status && (
                  <span
                    className={cn(
                      'rounded-md px-2 py-0.5 text-sm text-white',
                      getStatusColor(),
                    )}
                  >
                    {status.charAt(0).toUpperCase() +
                      status.slice(1).toLowerCase()}
                  </span>
                )}
              </div>
              {description && (
                <p className='text-muted-foreground text-sm'>{description}</p>
              )}
            </div>
          </div>
        </div>
        {showActionButtons && (
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              onClick={onTogglePublish}
              disabled={isPublishLoading}
              className='font-semibold'
            >
              {isPublished ? 'Unpublish' : 'Publish'}
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive'
              onClick={onDelete}
              disabled={isDeleteLoading}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
