"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  { color: [192, 148, 246] }, // lavender
  { color: [134, 220, 190] }, // mint
  { color: [255, 178, 140] }, // peach
  { color: [140, 205, 252] }, // sky
  { color: [252, 160, 190] }, // rose
  { color: [255, 228, 100] }, // lemon
  { color: [168, 230, 160] }, // sage
];

interface BlobState {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: number[];
}

export function BlobCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let blobs: BlobState[] = [];

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      blobs = BLOBS.map(({ color }) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 220 + Math.random() * 180,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        color,
      }));
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = w + b.r;
        else if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        else if (b.y > h + b.r) b.y = -b.r;

        const [r, g, bl] = b.color;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(${r},${g},${bl},0.55)`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
