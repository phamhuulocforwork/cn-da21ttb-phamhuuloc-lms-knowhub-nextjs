'use client';

import { BookOpenText, MessagesSquare, MonitorPlay } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface CreateContentDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ContentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ContentCard = ({
  icon,
  title,
  description,
  iconClassName,
  disabled = false,
  onClick,
}: ContentCardProps) => {
  return (
    <div
      className={cn(
        'group cursor-pointer space-y-3 rounded-lg border p-4',
        'hover:border-primary hover:bg-muted/50',
        disabled && 'cursor-not-allowed opacity-50',
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className='flex items-start justify-between'>
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded',
            iconClassName,
          )}
        >
          {icon}
        </div>
      </div>
      <div>
        <h3 className='font-semibold'>{title}</h3>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </div>
    </div>
  );
};

const contentTypes = [
  {
    icon: <MonitorPlay className='h-4 w-4' />,
    title: 'Course',
    path: '/course/create',
    description: 'Create and publish educational content for learners.',
    iconClassName: 'bg-primary-100 text-primary',
  },
  {
    icon: <MessagesSquare className='h-4 w-4' />,
    title: 'Quiz',
    path: '/quiz/create',
    description:
      "Create an assessment to evaluate learners' understanding of the material.",
    iconClassName: 'bg-orange-100 text-orange-700',
  },
  {
    icon: <BookOpenText className='h-4 w-4' />,
    title: 'Wiki',
    path: '/wiki/create',
    description: 'Create a knowledge base for course-related information.',
    iconClassName: 'bg-teal-100 text-teal-700',
    disabled: true,
  },
];

export default function CreateContentDialog({
  open,
  onClose,
}: CreateContentDialogProps) {
  const router = useRouter();

  const handleContentClick = (content: (typeof contentTypes)[0]) => {
    if (content.disabled) return;

    router.push(`${window.location.pathname}${content.path}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader className='flex flex-row items-center justify-between'>
          <DialogTitle>Create new content</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-4 border-y py-4 md:grid-cols-2'>
          {contentTypes.map((content, index) => (
            <ContentCard
              key={index}
              icon={content.icon}
              title={content.title}
              description={content.description}
              iconClassName={content.iconClassName}
              disabled={content.disabled}
              onClick={() => handleContentClick(content)}
            />
          ))}
        </div>
        <div className='flex justify-end'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
