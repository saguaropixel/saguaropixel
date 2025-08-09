'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CactusAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    const currentMount = mountRef.current;
    if (currentMount) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      currentMount.appendChild(renderer.domElement);
    }

    // Pixel setup
    interface Pixel extends THREE.Mesh {
      targetY: number;
      fallSpeed: number;
    }

    const pixels: Pixel[] = [];
    const pixelSize: number = 0.1; // Smaller pixels
    const cactusHeight: number = 20;
    const armHeight: number = 12;

    const createPixel = (x: number, y: number, z: number): Pixel => {
      const geometry = new THREE.BoxGeometry(pixelSize, pixelSize, pixelSize);
      const material = new THREE.MeshBasicMaterial({ color: 0x2ecc71 });
      const pixel = new THREE.Mesh(geometry, material) as unknown as Pixel; // works, but meh
      pixel.position.set(x, y, z);
      pixel.targetY = y;
      pixel.fallSpeed = Math.random() * 0.05 + 0.05; // Random speed between 0.05 and 0.1
      scene.add(pixel);
      return pixel;
    };

    const generateCactusShape = (): void => {
      // Main trunk
      for (let y = 0; y < cactusHeight; y++) {
        const width = Math.max(1, 3 - y * 0.1);
        for (let x = -width; x <= width; x += pixelSize) {
          for (let z = -width; z <= width; z += pixelSize) {
            if (Math.random() > 0.3) {
              // Slightly less dense
              const startY = cactusHeight * 2; // Start well above final position
              const pixel = createPixel(x, startY, z);
              pixel.targetY = y * pixelSize;
              pixels.push(pixel);
            }
          }
        }
      }
      // Left arm
      for (let y = armHeight; y < armHeight + 5; y++) {
        for (let x = -4; x <= -2; x += pixelSize) {
          for (let z = -1; z <= 1; z += pixelSize) {
            if (Math.random() > 0.3) {
              const startY = cactusHeight * 2;
              const pixel = createPixel(x, startY, z);
              pixel.targetY = y * pixelSize;
              pixels.push(pixel);
            }
          }
        }
      }
      // Right arm
      for (let y = armHeight; y < armHeight + 5; y++) {
        for (let x = 2; x <= 4; x += pixelSize) {
          for (let z = -1; z <= 1; z += pixelSize) {
            if (Math.random() > 0.3) {
              const startY = cactusHeight * 2;
              const pixel = createPixel(x, startY, z);
              pixel.targetY = y * pixelSize;
              pixels.push(pixel);
            }
          }
        }
      }
    };

    camera.position.z = 15;
    camera.position.y = 10;
    camera.lookAt(0, cactusHeight / 2, 0);

    // Animation
    const animate = (): void => {
      requestAnimationFrame(animate);
      pixels.forEach((pixel) => {
        if (pixel.position.y > pixel.targetY) {
          pixel.position.y -= pixel.fallSpeed;
          if (pixel.position.y < pixel.targetY) {
            pixel.position.y = pixel.targetY;
          }
        }
      });
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    generateCactusShape();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  );
};

export default CactusAnimation;
