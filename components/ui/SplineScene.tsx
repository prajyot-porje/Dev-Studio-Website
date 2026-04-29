'use client';

import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLoading } from '@/components/LoadingContext';
import type { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

interface SplineSceneProps {
  scene: string;
  className?: string;
  onSceneLoad?: () => void;
}

export function SplineScene({ scene, className, onSceneLoad }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<Application | null>(null);
  const isVisibleRef = useRef(true);
  const { setSplineReady } = useLoading();

  const handleLoad = useCallback((app: Application) => {
    splineAppRef.current = app;
    setIsLoaded(true);
    setSplineReady(true);
    if (onSceneLoad) onSceneLoad();
  }, [setSplineReady, onSceneLoad]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const visible = entry.isIntersecting;
        if (visible === isVisibleRef.current) return;
        isVisibleRef.current = visible;

        if (splineAppRef.current) {
          if (visible) {
            splineAppRef.current.play();
          } else {
            splineAppRef.current.stop();
          }
        }
      },
      { threshold: 0, rootMargin: '200px 0px 200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className ?? ''}`}>
      <Spline
        scene={scene}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}