'use client';

import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
  splineReady: boolean;
}

export function PageLoader({ onComplete, splineReady }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 0% -> 40%: immediate on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(40);

    const checkFonts = async () => {
      if (document.fonts) {
        await document.fonts.ready;
        setProgress((prev) => Math.max(prev, 75));
      } else {
        setProgress((prev) => Math.max(prev, 75));
      }
    };

    checkFonts();

    const handleLoad = () => {
      setProgress((prev) => Math.max(prev, 95));
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (splineReady) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(100);
    }
  }, [splineReady]);

  useEffect(() => {
    if (progress === 100) {
      const waitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 400);
      return () => clearTimeout(waitTimer);
    }
  }, [progress]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only trigger on the main container's transform transition
    if (e.target === e.currentTarget && e.propertyName === 'transform') {
      onComplete();
    }
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          color: 'var(--text-tertiary)',
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Loading
      </div>
      <div
        style={{
          width: '120px',
          height: '1px',
          backgroundColor: 'var(--border-color)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#0052FF',
            transition: 'width 0.4s ease-out',
          }}
        />
      </div>
    </div>
  );
}
