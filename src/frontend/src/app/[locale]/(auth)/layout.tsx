'use client';

import { NeatConfig, NeatGradient } from '@firecms/neat';
import { useEffect, useRef, useState } from 'react';

const config: NeatConfig = {
  colors: [
    {
      color: '#D2F4FB',
      enabled: true,
    },
    {
      color: '#AAE8F7',
      enabled: true,
    },
    {
      color: '#2FB9E1',
      enabled: true,
    },
    {
      color: '#97C8EC',
      enabled: true,
    },
    {
      color: '#a2d2ff',
      enabled: false,
    },
  ],
  speed: 2.5,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 2,
  waveFrequencyY: 3,
  waveAmplitude: 5,
  shadows: 1,
  highlights: 5,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  colorBlending: 8,
  backgroundColor: '#003FFF',
  backgroundAlpha: 1,
  grainScale: 3,
  grainIntensity: 0.3,
  grainSpeed: 1,
  resolution: 1,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const CanvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanvasSupported, setIsCanvasSupported] = useState<boolean>(false);

  useEffect(() => {
    const checkCanvasSupport = () => {
      const canvas = document.createElement('canvas');
      setIsCanvasSupported(!!(canvas.getContext && canvas.getContext('2d')));
    };

    checkCanvasSupport();
  }, []);

  useEffect(() => {
    if (!isCanvasSupported) return;

    let Gradient: NeatGradient | null = null;

    if (CanvasRef.current) {
      Gradient = new NeatGradient({
        ref: CanvasRef.current,
        ...config,
      });
      Gradient.speed = 4;
    }
    return () => {
      Gradient?.destroy();
    };
  }, [isCanvasSupported]);

  return (
    <div className='relative flex h-full min-h-screen w-full items-center justify-center bg-transparent'>
      {isCanvasSupported && (
        <canvas
          ref={CanvasRef}
          className={`absolute inset-0 -z-10 hidden h-full w-full lg:block`}
        />
      )}
      {children}
    </div>
  );
}
