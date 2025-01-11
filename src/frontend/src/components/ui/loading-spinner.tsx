import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva(
  'animate-spin rounded-full border-4 border-border border-t-transparent',
  {
    variants: {
      size: {
        default: 'h-6 w-6',
        xs: 'h-4 w-4',
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function LoadingSpinner({ size, className }: LoadingSpinnerProps) {
  return (
    <div className={cn(`flex items-center justify-center`, className)}>
      <div className={cn(spinnerVariants({ size }))} />
    </div>
  );
}
