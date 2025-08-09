'use client';

import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

type Props = {};

export function InteractiveCactus({}: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: [1.5, 1, 1.4], fov: 55 }}
      >
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <group>
      <Environment files={'/hdr/warehouse-256.hdr'} />
      <mesh>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
    </group>
  );
}
