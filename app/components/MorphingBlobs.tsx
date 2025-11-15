'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MorphingBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class Blob {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = color;
      }

      update(time: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < -this.radius || this.x > canvas!.width + this.radius) {
          this.speedX *= -1;
        }
        if (this.y < -this.radius || this.y > canvas!.height + this.radius) {
          this.speedY *= -1;
        }

        // Organic movement
        this.x += Math.sin(time * 0.001 + this.y * 0.01) * 0.3;
        this.y += Math.cos(time * 0.001 + this.x * 0.01) * 0.3;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        // Create morphing effect
        const points = 8;
        const variance = 0.3;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const radiusVariance =
            this.radius +
            Math.sin(time * 0.002 + i) * this.radius * variance +
            Math.cos(time * 0.003 + i * 2) * this.radius * variance * 0.5;

          const x = this.x + Math.cos(angle) * radiusVariance;
          const y = this.y + Math.sin(angle) * radiusVariance;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const blobs = [
      new Blob(canvas.width * 0.2, canvas.height * 0.3, 300, 'rgba(59, 130, 246, 0.15)'),
      new Blob(canvas.width * 0.7, canvas.height * 0.6, 250, 'rgba(139, 92, 246, 0.15)'),
      new Blob(canvas.width * 0.5, canvas.height * 0.5, 200, 'rgba(236, 72, 153, 0.15)'),
      new Blob(canvas.width * 0.8, canvas.height * 0.2, 280, 'rgba(34, 211, 238, 0.12)'),
    ];

    const animate = () => {
      time += 16;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add blur effect
      ctx.filter = 'blur(40px)';

      blobs.forEach((blob) => {
        blob.update(time);
        blob.draw(ctx, time);
      });

      ctx.filter = 'none';

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
