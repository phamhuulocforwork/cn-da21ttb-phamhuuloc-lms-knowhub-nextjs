import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { CheckIcon, TriangleAlert } from 'lucide-react';

const parentFormMessageVariants = cva(
  'rounded-md p-3 flex items-center gap-2 text-sm',
  {
    variants: {
      variant: {
        success: 'bg-emerald-500/15 text-emerald-500',
        error: 'bg-destructive-500/15 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);

export interface ParentFormMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof parentFormMessageVariants> {
  message?: string;
}

export function ParentFormMessage({
  className,
  variant = 'success',
  message,
  ...props
}: ParentFormMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(parentFormMessageVariants({ variant, className }))}
      {...props}
    >
      {variant === 'success' ? (
        <CheckIcon className='h-4 w-4' />
      ) : (
        <TriangleAlert className='h-4 w-4' />
      )}
      {message}
    </div>
  );
}
