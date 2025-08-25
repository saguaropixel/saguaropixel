// src/components/effects/PixelRainFromCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

type PixelRainFromCursorProps = {
  colors?: string[]; // brand palette
  blockSize?: number; // square size in CSS px (e.g., 10–16)
  cap?: number; // max on-screen particles
  gravity?: number; // px per ms^2 (tweak fall feel)
  speed?: { min: number; max: number }; // initial downward speed (px per ms)
  spawnOnMove?: { min: number; max: number }; // how many per mouse move
  spawnOnWheel?: number; // extra when scrolling (flare)
  snapToGrid?: boolean; // snap x/y to block grid
  respectReducedMotion?: boolean;
};

type Drop = {
  x: number; // css px
  y: number; // css px
  vy: number; // css px per ms
  size: number;
  color: string;
  life: number; // ms since spawn
};

export default function PixelRainFromCursor({
  colors = ['#F62972', '#19DEC8', '#272523', '#F0F4F7', '#08B7C9'],
  blockSize = 20,
  cap = 500,
  gravity = 0.0028, // gentle acceleration
  speed = { min: 0.08, max: 0.14 }, // initial fall speed
  spawnOnMove = { min: 4, max: 10 },
  spawnOnWheel = 8,
  snapToGrid = true,
  respectReducedMotion = true,
}: PixelRainFromCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dropsRef = useRef<Drop[]>([]);
  const dprRef = useRef(1);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  // if (document.body?.dataset.noTrail === 'true') return;
  useEffect(() => {
    const prefersReduced =
      respectReducedMotion &&
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // canvas overlay
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

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    const roundTo = (n: number, step: number) => Math.round(n / step) * step;

    const spawn = (x: number, y: number, count: number) => {
      const size = blockSize;
      const arr = dropsRef.current;
      const step = snapToGrid ? blockSize : 1;

      for (let i = 0; i < count; i++) {
        const jitterX = snapToGrid ? 0 : rand(-1.5, 1.5); // tiny wiggle if not snapping
        const startX = snapToGrid ? roundTo(x, step) : x + jitterX;
        const startY = snapToGrid ? roundTo(y, step) : y;

        arr.push({
          x: startX,
          y: startY,
          vy: rand(speed.min, speed.max),
          size,
          color: pick(colors),
          life: 0,
        });
      }
      if (arr.length > cap) arr.splice(0, arr.length - cap);
    };

    const onMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      const count = Math.floor(rand(spawnOnMove.min, spawnOnMove.max + 1));
      spawn(e.clientX, e.clientY, count);
    };

    const onWheel = () => {
      const pos = lastPosRef.current;
      if (pos) spawn(pos.x, pos.y, spawnOnWheel);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });

    // animation
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(50, t - last); // clamp to avoid huge jumps
      last = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dprNow = dprRef.current;
      const grid = blockSize;

      // draw each drop
      const arr = dropsRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const d = arr[i];

        d.life += dt;
        d.vy += gravity * dt; // accelerate
        d.y += d.vy * dt; // move

        // snap to grid for tetris feel (only on draw)
        const drawX = snapToGrid ? Math.round(d.x / grid) * grid : d.x;
        const drawY = snapToGrid ? Math.round(d.y / grid) * grid : d.y;

        // very subtle fade near the bottom edge so they don't pop
        const bottomFadePx = 120;
        const distToBottom = canvas.height / dprNow - drawY;
        const alpha =
          distToBottom < bottomFadePx
            ? Math.max(0, distToBottom / bottomFadePx)
            : 1;

        // crisp square
        const s = Math.round(d.size * dprNow);
        const px = Math.round(drawX * dprNow);
        const py = Math.round(drawY * dprNow);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = d.color;
        ctx.fillRect(px, py, s, s);
        ctx.globalAlpha = 1;

        // off-screen cleanup
        if (py > canvas.height + s) {
          arr.splice(i, 1);
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
      dropsRef.current = [];
    };
  }, [
    blockSize,
    cap,
    colors,
    gravity,
    respectReducedMotion,
    snapToGrid,
    spawnOnWheel,
    spawnOnMove.max,
    spawnOnMove.min,
    speed.max,
    speed.min,
  ]);

  return null;
}
