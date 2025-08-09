'use client';

import { Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

interface PixelProps {
  startPosition: [number, number, number];
  targetPosition: [number, number, number];
}

export function InteractiveCactus2() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: [0, 10, 15], fov: 55 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Pixel({ startPosition, targetPosition }: PixelProps) {
  const ref = useRef<THREE.Mesh>(null);
  const fallSpeed = useRef(Math.random() * 0.05 + 0.05);

  useFrame(() => {
    if (ref.current && ref.current.position.y > targetPosition[1]) {
      ref.current.position.y -= fallSpeed.current;
      if (ref.current.position.y < targetPosition[1]) {
        ref.current.position.y = targetPosition[1];
      }
    }
  });

  return (
    <mesh ref={ref} position={startPosition}>
      <boxGeometry args={[0.75, 0.75, 0.75]} />
      <meshStandardMaterial color="#2ecc71" />
    </mesh>
  );
}

function Scene() {
  const cactusHeight = 20;
  const armHeight = 12;
  const pixelSize = 0.1;

  return (
    <group>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Main trunk */}
      {Array.from({ length: cactusHeight }, (_, y) => {
        const width = Math.max(1, 3 - y * 0.1);
        const xCount = Math.floor(width / pixelSize) * 2 + 1;
        const zCount = Math.floor(width / pixelSize) * 2 + 1;

        return Array.from({ length: xCount }, (_, xIdx) => {
          const x = -width + xIdx * pixelSize;
          return Array.from({ length: zCount }, (_, zIdx) => {
            const z = -width + zIdx * pixelSize;
            if (Math.random() > 0.3) {
              const startY = cactusHeight * 2;
              const uniqueKey = `trunk-${y}-${xIdx}-${zIdx}`;
              return (
                <Pixel
                  key={uniqueKey}
                  startPosition={[x, startY, z]}
                  targetPosition={[x, y * pixelSize, z]}
                />
              );
            }
            return null;
          });
        });
      })}

      {/* Left arm */}
      {Array.from({ length: 5 }, (_, y) => {
        const actualY = armHeight + y;
        const xCount = Math.floor(2 / pixelSize) + 1;
        const zCount = Math.floor(2 / pixelSize) + 1;

        return Array.from({ length: xCount }, (_, xIdx) => {
          const x = -4 + xIdx * pixelSize;
          if (x > -2) return null;
          return Array.from({ length: zCount }, (_, zIdx) => {
            const z = -1 + zIdx * pixelSize;
            if (Math.random() > 0.3) {
              const startY = cactusHeight * 2;
              const uniqueKey = `left-${actualY}-${xIdx}-${zIdx}`;
              return (
                <Pixel
                  key={uniqueKey}
                  startPosition={[x, startY, z]}
                  targetPosition={[x, actualY * pixelSize, z]}
                />
              );
            }
            return null;
          });
        });
      })}

      {/* Right arm */}
      {Array.from({ length: 5 }, (_, y) => {
        const actualY = armHeight + y;
        const xCount = Math.floor(2 / pixelSize) + 1;
        const zCount = Math.floor(2 / pixelSize) + 1;

        return Array.from({ length: xCount }, (_, xIdx) => {
          const x = 2 + xIdx * pixelSize;
          if (x > 4) return null;
          return Array.from({ length: zCount }, (_, zIdx) => {
            const z = -1 + zIdx * pixelSize;
            if (Math.random() > 0.3) {
              const startY = cactusHeight * 2;
              const uniqueKey = `right-${actualY}-${xIdx}-${zIdx}`;
              return (
                <Pixel
                  key={uniqueKey}
                  startPosition={[x, startY, z]}
                  targetPosition={[x, actualY * pixelSize, z]}
                />
              );
            }
            return null;
          });
        });
      })}
    </group>
  );
}
