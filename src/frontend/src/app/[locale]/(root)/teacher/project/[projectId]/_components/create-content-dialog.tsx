'use client';

import { useRouter } from 'next/navigation';

import { BookOpenText, MessagesSquare, MonitorPlay } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

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

export default function CreateContentDialog({
  open,
  onClose,
}: CreateContentDialogProps) {
  const router = useRouter();
  const t = useTranslations('teacher.projects');

  const contentTypes = [
    {
      icon: <MonitorPlay className='h-4 w-4' />,
      title: t('course'),
      path: '/course/create',
      description: t('courseDescription'),
      iconClassName: 'bg-primary-100 text-primary',
    },
    {
      icon: <MessagesSquare className='h-4 w-4' />,
      title: t('quiz'),
      path: '/quiz/create',
      description: t('quizDescription'),
      iconClassName: 'bg-orange-100 text-orange-700',
    },
    {
      icon: <BookOpenText className='h-4 w-4' />,
      title: t('wiki'),
      path: '/wiki/create',
      description: t('wikiDescription'),
      iconClassName: 'bg-teal-100 text-teal-700',
      disabled: true,
    },
  ];

  const handleContentClick = (content: (typeof contentTypes)[0]) => {
    if (content.disabled) return;

    router.push(`${window.location.pathname}${content.path}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader className='flex flex-row items-center justify-between'>
          <DialogTitle>{t('createContent')}</DialogTitle>
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
            {t('cancel')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
