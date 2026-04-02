'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '@/lib/utils';

interface EarthProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
}

const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 16000,
  mapBrightness = 6,
  baseColor = [0.3, 0.3, 0.3],
  markerColor = [0.1, 0.8, 1],
  glowColor = [0.1, 0.1, 0.1],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const animationRef = useRef<number>(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let isVisible = true;
    let observer: IntersectionObserver | null = null;

    const animate = () => {
      if (!isVisible || !globeRef.current) {
        animationRef.current = 0;
        return;
      }

      phiRef.current += 0.005;
      globeRef.current.update({ phi: phiRef.current });
      animationRef.current = requestAnimationFrame(animate);
    };

    const initGlobe = () => {
      if (!canvasRef.current) return;

      const currentWidth = canvasRef.current.offsetWidth;
      if (currentWidth === 0) {
        requestAnimationFrame(initGlobe);
        return;
      }

      // Destroy existing globe if re-creating on prop change
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }

      // Create the globe with cobe v2 API (no onRender)
      const globe = createGlobe(canvasRef.current!, {
        devicePixelRatio: 2,
        width: currentWidth * 2,
        height: currentWidth * 2,
        phi: phiRef.current,
        theta,
        dark,
        scale,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        opacity: 1,
        offset: [0, 0] as [number, number],
        markers: [],
      });

      globeRef.current = globe;
      animationRef.current = requestAnimationFrame(animate);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting;

        if (nextVisible && !isVisible) {
          isVisible = true;
          if (!animationRef.current && globeRef.current) {
            animationRef.current = requestAnimationFrame(animate);
          }
        }

        if (!nextVisible && isVisible) {
          isVisible = false;
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = 0;
          }
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(canvasRef.current);
    requestAnimationFrame(initGlobe);

    return () => {
      observer?.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness,
      baseColor[0], baseColor[1], baseColor[2],
      markerColor[0], markerColor[1], markerColor[2],
      glowColor[0], glowColor[1], glowColor[2]]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !globeRef.current) return;
      const w = canvasRef.current.offsetWidth;
      if (w > 0) {
        globeRef.current.update({
          width: w * 2,
          height: w * 2,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={cn(className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
        }}
      />
    </div>
  );
};

export default Earth;