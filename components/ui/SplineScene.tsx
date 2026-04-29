'use client';

import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { useLoading } from '@/components/LoadingContext';

interface SplineSceneProps {
  scene: string;
  className?: string;
  onSceneLoad?: () => void;
}

export function SplineScene({ scene, className, onSceneLoad }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setSplineReady } = useLoading();

  // PERF: Spline Lazy Load & PageLoader connection
  const handleLoad = () => {
    setIsLoaded(true);
    setSplineReady(true);
    if (onSceneLoad) onSceneLoad();
  };

  return (
    <div className={`relative w-full h-full ${className ?? ''}`}>
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
