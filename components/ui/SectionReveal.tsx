"use client";

import { ReactNode, useRef, CSSProperties, useEffect } from 'react';
import { m, useInView } from 'framer-motion';

interface SectionRevealProps {
  children: ReactNode | ((inView: boolean) => ReactNode);
  rootMargin?: string;
  threshold?: number | number[];
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  onChange?: (inView: boolean) => void;
}

export default function SectionReveal({ children, rootMargin = '-60px', threshold, stagger = 0.06, className, style, onChange }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: rootMargin as any, amount: threshold as any });

  useEffect(() => {
    if (typeof onChange === 'function') onChange(inView);
  }, [inView, onChange]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  } as const;

  return (
    <m.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={container} className={className} style={style}>
      {typeof children === 'function' ? (children as any)(inView) : children}
    </m.div>
  );
}
