import { useEffect, useMemo, useRef, useState } from 'react';

import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

interface ColorProps {
  textColor: string;
  primaryColor: string;
  destructiveColor: string;
  secondaryColor: string;
}

const COLORS = {
  dark: {
    text: '#FFFFFF',
  },
  light: {
    text: '#23272E',
  },
  primary: '#70d5f0',
  destructive: '#ff3636',
  secondary: '#ffde4d',
} as const;

const FullLogo = ({
  textColor,
  primaryColor,
  destructiveColor,
  secondaryColor,
}: ColorProps) => (
  <svg
    className='max-w-48'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 6633.21 1168.84'
  >
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6633.21 1168.84'>
      <g>
        <path
          fill={textColor}
          d='M1623.11 490.54c-43.15-21.58-91.37-32.36-144.67-32.36-57.54 0-109.14 12.49-154.83 37.44-23.81 13.01-44.92 29.5-63.45 49.29v-75.3h-229.69v687.82h241.12V824.95c0-38.07 5.91-68.95 17.77-92.64 11.84-23.68 28.34-41.24 49.49-52.66 21.14-11.42 44.42-17.13 69.8-17.13 35.53 0 63.24 11.22 83.12 33.63 19.87 22.43 29.82 58.18 29.82 107.24v354.06h241.12v-393.4c0-71.07-12.49-129-37.43-173.85-24.97-44.84-59.01-78.05-102.16-99.62zM2468.91 503.23c-58.81-30.02-125.85-45.05-201.14-45.05s-142.13 15.03-200.51 45.05c-58.38 30.04-104.28 71.7-137.69 125-33.43 53.3-50.12 114.65-50.12 184.01s16.69 130.93 50.12 184.64c33.41 53.74 79.31 95.81 137.69 126.27 58.38 30.46 125.2 45.68 200.51 45.68s142.33-15.22 201.14-45.68c58.79-30.46 104.7-72.54 137.69-126.27 33-53.72 49.49-115.27 49.49-184.64s-16.5-130.71-49.49-184.01c-33-53.3-78.9-94.96-137.69-125zm-75.51 398.48c-12.69 24.97-29.82 43.78-51.4 56.47-21.57 12.69-46.32 19.04-74.24 19.04s-51.39-6.35-72.97-19.04c-21.57-12.69-38.92-31.51-52.03-56.47-13.13-24.95-19.67-54.76-19.67-89.46s6.54-64.09 19.67-88.2c13.11-24.11 30.46-42.51 52.03-55.2 21.58-12.69 45.88-19.04 72.97-19.04s52.67 6.35 74.24 19.04c21.58 12.69 38.71 31.09 51.4 55.2 12.69 24.11 19.04 53.52 19.04 88.2s-6.35 64.52-19.04 89.46z'
        ></path>
        <path
          fill={textColor}
          d='M3530.03 889.21L3388.31 469.6 3182.72 469.6 3036.56 886.01 2895.92 469.6 2667.5 469.6 2912.42 1157.42 3145.92 1157.42 3279.9 782.47 3409.88 1157.42 3643.39 1157.42 3888.31 469.6 3676.38 469.6 3530.03 889.21z'
        ></path>
        <path
          fill={textColor}
          d='M4567.23 602.85L4224.59 602.85 4224.59 269.09 3973.32 269.09 3973.32 1157.42 4224.59 1157.42 4224.59 810.97 4567.23 810.97 4567.23 1157.42 4818.51 1157.42 4818.51 269.09 4567.23 269.09 4567.23 602.85z'
        ></path>
        <path
          fill={textColor}
          d='M5466.99 800.82c0 38.07-5.93 69.17-17.77 93.28-11.86 24.11-27.51 41.68-46.96 52.66-19.47 11-41.05 16.5-64.72 16.5-36.39 0-64.52-11.42-84.39-34.27-19.89-22.84-29.82-60.91-29.82-114.21V469.61h-241.12v384.52c0 71.92 12.47 131.35 37.44 178.3 24.94 46.96 59.64 81.44 104.06 103.43 44.42 21.99 94.55 32.99 150.38 32.99 52.45 0 101.09-12.47 145.94-37.43 22.02-12.25 41.46-27.66 58.38-46.15v72.16h229.7V469.6h-241.12v331.21zM6588.16 623.79c-30.04-52.86-70.65-93.69-121.83-122.46-51.2-28.75-108.09-43.15-170.68-43.15-58.38 0-108.31 12.69-149.75 38.07-15.32 9.38-29.27 20.64-41.88 33.72V215.8H5862.9v941.62h229.7v-69.13c14.23 16.83 30.44 31.09 48.85 42.48 41.03 25.38 92.43 38.07 154.19 38.07s119.49-14.59 170.68-43.78c51.18-29.19 91.79-70.21 121.83-123.1 30.02-52.86 45.05-116.12 45.05-189.72s-15.03-135.57-45.05-188.45zm-218.27 277.92c-13.12 24.97-30.46 43.78-52.03 56.47-21.58 12.69-45.9 19.04-72.97 19.04s-51.4-6.35-72.97-19.04c-21.58-12.69-38.93-31.51-52.03-56.47-13.13-24.95-19.67-54.76-19.67-89.46s6.54-64.09 19.67-88.2c13.11-24.11 30.46-42.51 52.03-55.2 21.57-12.69 45.88-19.04 72.97-19.04s51.39 6.35 72.97 19.04c21.57 12.69 38.9 31.09 52.03 55.2 13.11 24.11 19.67 53.52 19.67 88.2s-6.56 64.52-19.67 89.46z'
        ></path>
        <path
          fill={primaryColor}
          d='M276.8 579.54L276.8 168.84 0 168.84 0 1157.42 276.8 1157.42 276.8 909.77 276.8 579.54z'
        ></path>
        <path
          fill={destructiveColor}
          d='M233.39 220.18v-51.34h-69.2v106.27c13.51 6.76 21.09 10.54 34.6 17.3 13.51-6.76 21.09-10.54 34.6-17.3v-54.93z'
        ></path>
        <path
          fill={textColor}
          d='M563.78 606.09L967.4 168.84 659.53 168.84 342.94 508.56 342.94 838.9 380.63 798.53 663.76 1157.42 988.58 1157.42 563.78 606.09z'
        ></path>
        <path
          fill={secondaryColor}
          d='M459.71 0L500.99 75.48 576.48 116.77 500.99 158.05 459.71 233.53 418.43 158.05 342.94 116.77 418.43 75.48 459.71 0z'
        ></path>
      </g>
    </svg>
  </svg>
);

const IconLogo = ({
  textColor,
  primaryColor,
  destructiveColor,
  secondaryColor,
}: ColorProps) => (
  <svg
    className='max-w-8'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 1200 1200'
  >
    <g>
      <path
        fill={primaryColor}
        d='M380 600.83L380 190.13 100 190.13 100 1178.71 380 1178.71 380 931.06 380 600.83z'
      ></path>
      <path
        fill={destructiveColor}
        d='M336.08 241.47v-51.34h-70V296.4c13.67 6.76 21.33 10.54 35 17.3 13.67-6.76 21.33-10.54 35-17.3v-54.93z'
      ></path>
      <path
        fill={textColor}
        d='M670.29 627.38L1078.57 190.13 767.15 190.13 446.91 529.85 446.91 860.2 485.02 819.82 771.43 1178.71 1100 1178.71 670.29 627.38z'
      ></path>
      <path
        fill={secondaryColor}
        d='M565.02 21.29L606.78 96.77 683.14 138.06 606.78 179.34 565.02 254.83 523.26 179.34 446.91 138.06 523.26 96.77 565.02 21.29z'
      ></path>
    </g>
  </svg>
);

export function Logo({
  className,
  redirect,
}: {
  className?: string;
  redirect?: boolean;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showFullLogo, setShowFullLogo] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setShowFullLogo(entry.contentRect.width >= 200);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const colors = useMemo<ColorProps>(
    () => ({
      textColor: !mounted
        ? COLORS.light.text
        : theme === 'dark'
          ? COLORS.dark.text
          : COLORS.light.text,
      primaryColor: COLORS.primary,
      destructiveColor: COLORS.destructive,
      secondaryColor: COLORS.secondary,
    }),
    [theme, mounted],
  );

  const handleClick = () => {
    if (redirect) {
      window.location.href = '/';
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        className,
        'flex w-full items-center justify-center py-2',
        redirect && 'cursor-pointer',
      )}
      onClick={handleClick}
    >
      {showFullLogo ? <FullLogo {...colors} /> : <IconLogo {...colors} />}
    </div>
  );
}
