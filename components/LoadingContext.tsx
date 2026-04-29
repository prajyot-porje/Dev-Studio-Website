'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PageLoader } from './ui/PageLoader';
import { LazyMotion, domAnimation } from 'framer-motion';

export const LoadingContext = createContext<{
  setSplineReady: (ready: boolean) => void;
}>({
  setSplineReady: (_ready: boolean) => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [splineReady, setSplineReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ setSplineReady }}>
      <LazyMotion features={domAnimation}>
        {showLoader && (
          <PageLoader
            splineReady={splineReady}
            onComplete={() => setShowLoader(false)}
          />
        )}
        {children}
      </LazyMotion>
    </LoadingContext.Provider>
  );
}
