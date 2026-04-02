'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleElementProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  href?: string;
  color?: string;
  type?: string;
}

export const RippleElement = React.forwardRef<HTMLElement, RippleElementProps>(
  (
    {
      className,
      children,
      onClick,
      as: Tag = 'button',
      color = 'currentColor',
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      if (onClick) onClick(e);
    };

    useEffect(() => {
      if (ripples.length > 0) {
        const timeout = setTimeout(() => {
          setRipples((prev) => prev.slice(1));
        }, 600);
        return () => clearTimeout(timeout);
      }
    }, [ripples]);

    return (
      <Tag
        ref={ref as any}
        className={cn('relative overflow-hidden cursor-pointer', className)}
        onClick={handleClick}
        {...props}
      >
        <span style={{ position: 'relative', zIndex: 1, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'inherit', width: '100%', height: '100%' }}>
          {children}
        </span>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <m.span
              key={ripple.id}
              initial={{ top: ripple.y, left: ripple.x, scale: 0, opacity: 0.25 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                background: color,
                width: '100px',
                height: '100px',
                marginTop: '-50px',
                marginLeft: '-50px',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          ))}
        </AnimatePresence>
      </Tag>
    );
  }
);

RippleElement.displayName = 'RippleElement';
