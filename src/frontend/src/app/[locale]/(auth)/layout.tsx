"use client";

import { NeatConfig, NeatGradient } from "@firecms/neat";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const lightConfig: NeatConfig = {
  colors: [
    {
      color: "#D2F4FB",
      enabled: true,
    },
    {
      color: "#AAE8F7",
      enabled: true,
    },
    {
      color: "#2FB9E1",
      enabled: true,
    },
    {
      color: "#97C8EC",
      enabled: true,
    },
    {
      color: "#a2d2ff",
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
  backgroundColor: "#003FFF",
  backgroundAlpha: 1,
  grainScale: 3,
  grainIntensity: 0.3,
  grainSpeed: 1,
  resolution: 1,
};

export const darkConfig: NeatConfig = {
  colors: [
    {
      color: "#554226",
      enabled: true,
    },
    {
      color: "#03162D",
      enabled: true,
    },
    {
      color: "#002027",
      enabled: true,
    },
    {
      color: "#020210",
      enabled: true,
    },
    {
      color: "#02152A",
      enabled: true,
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
  backgroundColor: "#003FFF",
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;
    const gradient = new NeatGradient({
      ref: canvasRef.current,
      ...(theme === "dark" ? darkConfig : lightConfig),
    });
    gradient.speed = 4;
    return () => gradient.destroy();
  }, [theme]);

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center bg-transparent">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 h-full w-full"
      />
      {children}
    </div>
  );
}
