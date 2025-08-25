// src/components/effects/PixelTrailCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

type Mode = 'burst' | 'comet';

type PixelTrailCursorProps = {
  colors?: string[]; // brand palette
  mode?: Mode; // 'burst' | 'comet'
  blockSize?: number; // exact pixel block size (CSS px)
  comet: {
    length?: number;
    spacing?: number;
    fadeMs?: number;
    wheelBurst?: number;
  };
  burst?: {
    // (used in 'burst' mode)
    count?: number;
    cap?: number;
    sizeMin?: number;
    sizeMax?: number;
  };
  respectReducedMotion?: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
};

export default function PixelTrailCursor({
  colors = ['#F62972', '#19DEC8', '#272523', '#F0F4F7', '#08B7C9'],
  mode = 'comet',
  blockSize = 12, // <- chunky pixels ~ your example
  comet = { length: 18, spacing: 8, fadeMs: 600, wheelBurst: 10 },
  burst = { count: 12, cap: 350, sizeMin: 3, sizeMax: 6 },
  respectReducedMotion = true,
}: PixelTrailCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Shared state
  const dprRef = useRef(1);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Burst particles
  const particlesRef = useRef<Particle[]>([]);

  // Comet samples (trail stamps)
  const trailRef = useRef<
    { x: number; y: number; color: string; born: number }[]
  >([]);

  if (document.body?.dataset.noTrail === 'true') return;

  useEffect(() => {
    const prefersReduced =
      respectReducedMotion &&
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '40',
    } as CSSStyleDeclaration);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    dprRef.current = dpr;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Helpers
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    // Spawn for burst mode
    const spawnBurst = (x: number, y: number, count: number) => {
      const arr = particlesRef.current;
      for (let i = 0; i < count; i++) {
        const speed = rand(0.4, 1.2);
        const angle = rand(0, Math.PI * 2);
        arr.push({
          x: x * dpr,
          y: y * dpr,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          size: Math.floor(rand(burst.sizeMin!, burst.sizeMax!)) * dpr,
          life: rand(500, 1100),
          maxLife: 900,
          color: pick(colors),
        });
      }
      if (arr.length > burst.cap!) arr.splice(0, arr.length - burst.cap!);
    };

    // Comet stamping (stores positions; draw in render)
    let lastStamp = 0;
    const stampIfFarEnough = (x: number, y: number, now: number) => {
      const last = lastPosRef.current;
      const spacing = comet.spacing ?? 8;

      if (!last || Math.hypot(x - last.x, y - last.y) >= spacing) {
        trailRef.current.unshift({ x, y, color: pick(colors), born: now });

        const maxLen = comet.length ?? 18;
        if (trailRef.current.length > maxLen) {
          trailRef.current.length = maxLen;
        }

        lastPosRef.current = { x, y };
      }
    };

    // Listeners
    const onMove = (e: MouseEvent) => {
      if (mode === 'burst') {
        spawnBurst(e.clientX, e.clientY, burst.count!);
      } else {
        stampIfFarEnough(e.clientX, e.clientY, performance.now());
      }
    };

    const onWheel = () => {
      if (mode === 'burst') {
        const pos = lastPosRef.current;
        if (pos)
          spawnBurst(pos.x, pos.y, Math.max(8, Math.floor(burst.count! * 0.8)));
      } else {
        // add extra stamps at the current tip to accent the comet
        const pos = lastPosRef.current;
        if (!pos) return;
        const extra = comet.wheelBurst ?? 10;
        const now = performance.now();
        for (let i = 0; i < extra; i++) {
          trailRef.current.unshift({
            x: pos.x,
            y: pos.y,
            color: pick(colors),
            born: now - i * 12,
          });
        }
        const maxLen = comet.length ?? 18;
        if (trailRef.current.length > maxLen) trailRef.current.length = maxLen;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });

    // Animation
    let last = performance.now();
    const gravity = 0.015 * dpr;
    const drag = 0.985;

    const drawCrispSquare = (
      xCss: number,
      yCss: number,
      sizeCss: number,
      color: string,
      alpha = 1
    ) => {
      const s = Math.round(sizeCss * dpr);
      const px = Math.round(xCss * dpr);
      const py = Math.round(yCss * dpr);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fillRect(px, py, s, s);
      ctx.globalAlpha = 1;
    };

    const tick = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mode === 'burst') {
        const p = particlesRef.current;
        for (let i = p.length - 1; i >= 0; i--) {
          const a = p[i];
          a.life -= dt;
          if (a.life <= 0) {
            p.splice(i, 1);
            continue;
          }
          a.vx *= drag;
          a.vy = a.vy * drag + gravity;
          a.x += a.vx * dt;
          a.y += a.vy * dt;
          const alpha = Math.max(0, a.life / a.maxLife);
          drawCrispSquare(a.x / dpr, a.y / dpr, a.size / dpr, a.color, alpha);
        }
      } else {
        // COMET: draw from tail to head, shrinking & fading
        const size = blockSize;
        const fadeMs = comet.fadeMs ?? 600;
        const maxLen = comet.length ?? 18;

        // ensure spacing stamps even if the pointer pauses briefly
        const pos = lastPosRef.current;
        if (pos && t - lastStamp > 100) stampIfFarEnough(pos.x, pos.y, t);

        for (let i = trailRef.current.length - 1; i >= 0; i--) {
          const stamp = trailRef.current[i];
          const age = t - stamp.born;
          const k = i / Math.max(1, maxLen - 1); // 0 (tail) → 1 (head)
          // size tapers slightly toward tail
          const s = size * (0.7 + 0.3 * (1 - k));
          // alpha from both age + index (gives tight comet falloff)
          const alphaFromAge = Math.max(0, 1 - age / fadeMs);
          const alphaFromIndex = 0.25 + 0.75 * (1 - k);
          drawCrispSquare(
            stamp.x,
            stamp.y,
            s,
            stamp.color,
            alphaFromAge * alphaFromIndex
          );
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', resize);
      canvas.remove();
      particlesRef.current = [];
      trailRef.current = [];
      lastPosRef.current = null;
    };
  }, [
    burst.cap,
    burst.count,
    burst.sizeMax,
    burst.sizeMin,
    colors,
    mode,
    blockSize,
    comet.fadeMs,
    comet.length,
    comet.spacing,
    comet.wheelBurst,
    respectReducedMotion,
  ]);

  return null;
}
