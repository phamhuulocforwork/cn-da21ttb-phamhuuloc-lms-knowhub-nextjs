'use client';

import { FolderKanban, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ProjectHeaderProps {
  title: String;
  description: String;
}

export function ProjectHeader({ title, description }: ProjectHeaderProps) {
  return (
    <div className='mb-4 mt-8 space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='hidden rounded-md bg-accent p-2 text-accent-foreground md:block'>
              <FolderKanban className='h-8 w-8' />
            </div>
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold md:text-xl'>{title}</h1>
              <p className='text-muted-foreground text-sm'>{description}</p>
            </div>
          </div>
        </div>
        <Button variant='outline' className='h-9 px-2 md:h-10 md:px-4'>
          <Plus className='h-4 w-4 md:mr-2' />
          <span className='hidden md:inline-block'>New Content</span>
        </Button>
      </div>
    </div>
  );
}
