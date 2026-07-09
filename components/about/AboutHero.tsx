'use client';

import { useEffect, useRef, useState } from 'react';

interface AboutHeroProps {
  title?: string;
  introText?: string;
}

export default function AboutHero({ title, introText }: AboutHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(0.5, '#2a2a2a');
      gradient.addColorStop(1, '#1a1a1a');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          const tex_x = u;
          const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y +
              Math.cos(3.0 * tex_x + 5.0 * tex_y) +
              0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity);

          const r = Math.floor(123 * intensity);
          const g = Math.floor(116 * intensity);
          const b = Math.floor(129 * intensity);

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      const overlayGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.45)');

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(1.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-hero-fade-1 { animation: aboutFadeUp 1s ease-out 0.1s forwards; }
        .about-hero-fade-2 { animation: aboutFadeUp 1s ease-out 0.3s forwards; }
        .about-hero-fade-3 { animation: aboutFadeUp 1s ease-out 0.55s forwards; }
        .about-hero-fade-4 { animation: aboutFadeUp 1s ease-out 0.75s forwards; }
      `}</style>

      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ height: 'calc(100vh - 68px)' }}
      >
        {/* Silk canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />

        {/* Gradient overlay — heavier at bottom for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/65" />

        {/* Centered content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6 md:px-10">

          {/* Eyebrow label */}
          <p
            className={`mb-6 text-xs tracking-[0.3em] uppercase text-white/45 opacity-0 ${isLoaded ? 'about-hero-fade-1' : ''}`}
          >
            About
          </p>

          {/* Main heading */}
          <h1
            className={`
              text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9rem]
              font-light tracking-[-0.04em] leading-none text-white opacity-0
              ${isLoaded ? 'about-hero-fade-2' : ''}
            `}
            style={{ textShadow: '0 0 60px rgba(255,255,255,0.06)' }}
          >
            {title ?? 'Credence Asia Group'}
          </h1>

          {/* Thin rule */}
          <div
            className={`mt-8 mb-7 w-10 h-px bg-white/25 opacity-0 ${isLoaded ? 'about-hero-fade-3' : ''}`}
          />

          {/* Intro paragraph */}
          <p
            className={`
              max-w-lg text-sm md:text-base font-light leading-relaxed tracking-wide
              text-white/55 opacity-0
              ${isLoaded ? 'about-hero-fade-4' : ''}
            `}
          >
            {introText ??
              'Proven, end-to-end apparel sourcing across Asia — linking European design knowledge with disciplined manufacturing and trusted long-term partnerships.'}
          </p>

          {/* Pill badges */}
          <div
            className={`mt-10 flex items-center gap-5 text-white/35 opacity-0 ${isLoaded ? 'about-hero-fade-4' : ''}`}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase">Design</span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] tracking-[0.25em] uppercase">Source</span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] tracking-[0.25em] uppercase">Deliver</span>
          </div>
        </div>

        {/* Corner year stamp */}
        <div className="absolute bottom-8 right-8 z-30 text-[10px] tracking-widest uppercase text-white/20">
          Est. 2016
        </div>
      </div>
    </>
  );
}
