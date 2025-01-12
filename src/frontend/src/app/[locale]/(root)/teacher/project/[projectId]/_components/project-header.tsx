'use client';

import { FolderKanban, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import CreateContentDialog from './create-content-dialog';
import { useState } from 'react';

interface ProjectHeaderProps {
  title: String;
  description: String;
}

export function ProjectHeader({ title, description }: ProjectHeaderProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className='mb-4 mt-8 space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <div className='hidden rounded-md bg-indigo-500 p-2 text-white md:block'>
              <FolderKanban className='h-8 w-8' />
            </div>
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold md:text-xl'>{title}</h1>
              <p className='text-muted-foreground text-sm'>{description}</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          variant='outline'
          className='h-9 px-2 md:h-10 md:px-4'
        >
          <Plus className='h-4 w-4 md:mr-2' />
          <span className='hidden md:inline-block'>New Content</span>
        </Button>
        {showCreateDialog && (
          <CreateContentDialog
            open={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
          />
        )}
      </div>
    </div>
  );
}
