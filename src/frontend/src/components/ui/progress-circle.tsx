'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const progressCircleVariants = cva('rotate-[-90deg]', {
  variants: {
    size: {
      sm: 'h-5 w-5',
      md: 'h-7 w-7',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface ProgressCircleProps
  extends VariantProps<typeof progressCircleVariants> {
  value: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressCircle({
  value,
  size = 'sm',
  label,
  showValue = true,
}: ProgressCircleProps) {
  const radius = size === 'sm' ? 8 : 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

  return (
    <div className='flex items-center gap-2'>
      <svg className={cn(progressCircleVariants({ size }))} viewBox='0 0 28 28'>
        <circle
          className='stroke-muted'
          cx='14'
          cy='14'
          r={radius}
          strokeWidth={size === 'sm' ? '3' : '4'}
          fill='none'
        />
        <circle
          className='stroke-emerald-500 transition-all duration-300 ease-in-out'
          cx='14'
          cy='14'
          r={radius}
          strokeWidth={size === 'sm' ? '3' : '4'}
          fill='none'
          style={{ strokeDasharray }}
        />
      </svg>
      {label && <span className='text-muted-foreground text-sm'>{label}</span>}
      {showValue && (
        <span className='text-sm font-medium'>{Math.round(value)}%</span>
      )}
    </div>
  );
}
