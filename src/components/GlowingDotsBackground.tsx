import React, { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  radius: number;
  color: string;
  baseOpacity: number;
  vx: number;
  vy: number;
  pulsePhase: number;
  pulseSpeed: number;
}

// Lume dust: tiny matte specks in dial ivory and gold, drifting slowly. No glow;
// only the orb emits light on this page.
const COLORS = ['#efdfb0', '#c9a24c', '#f2efe8'];
const EDGE_BUFFER = 10;

export const GlowingDotsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let dots: Dot[] = [];

    const createDots = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 768 ? 22 : 40;

      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.7 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        baseOpacity: Math.random() * 0.18 + 0.08,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.004,
      }));
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < -EDGE_BUFFER) dot.x = width + EDGE_BUFFER;
        if (dot.x > width + EDGE_BUFFER) dot.x = -EDGE_BUFFER;
        if (dot.y < -EDGE_BUFFER) dot.y = height + EDGE_BUFFER;
        if (dot.y > height + EDGE_BUFFER) dot.y = -EDGE_BUFFER;

        dot.pulsePhase += dot.pulseSpeed;
        ctx.globalAlpha = Math.max(0, dot.baseOpacity + Math.sin(dot.pulsePhase) * 0.06);
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      drawFrame();
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      const shouldRun = document.visibilityState === 'visible' && !reducedMotion.matches;
      if (shouldRun && !frame) frame = requestAnimationFrame(tick);
      if (!shouldRun && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const handleResize = () => {
      createDots();
      drawFrame();
    };

    createDots();
    drawFrame();
    sync();
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -5 }} aria-hidden="true">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
};
