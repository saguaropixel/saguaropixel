// src/app/Providers.tsx
'use client';

import PixelRainFromCursor from '@/components/effects/PixelRainFromCursor';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* <PixelTrailCursor
        mode="comet"
        blockSize={12}
        colors={['#F62972', '#19DEC8', '#272523', '#F0F4F7', '#08B7C9']}
        comet={{
          length: 50,
          spacing: 24,
          fadeMs: 700,
          wheelBurst: 4,
        }}
        respectReducedMotion
      /> */}
      <PixelRainFromCursor
        colors={['#F62972', '#19DEC8', '#272523', '#F0F4F7', '#08B7C9']}
        blockSize={20} // match your pixel size
        spawnOnMove={{ min: 4, max: 10 }}
        spawnOnWheel={2}
        gravity={0.0028}
        speed={{ min: 0.08, max: 0.14 }}
        snapToGrid
      />
    </>
  );
}
