'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type HexagonBackgroundProps = React.ComponentProps<'div'> & {
  hexagonProps?: React.ComponentProps<'div'>;
  hexagonSize?: number; // value greater than 50
  hexagonMargin?: number;
};

function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 75,
  hexagonMargin = 3,
  ...props
}: HexagonBackgroundProps) {
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.1;
  const rowSpacing = hexagonSize * 0.8;
  const baseMarginTop = -36 - 0.275 * (hexagonSize - 100);
  const computedMarginTop = baseMarginTop + hexagonMargin;
  const oddRowMarginLeft = -(hexagonSize / 2);
  const evenRowMarginLeft = hexagonMargin / 2;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  });

  const updateGridDimensions = React.useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const rows = Math.max(1, Math.ceil(rect.height / rowSpacing));
    const columns = Math.max(1, Math.ceil(rect.width / hexagonWidth) + 1);

    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  React.useEffect(() => {
    updateGridDimensions();

    const observer = new ResizeObserver(() => {
      updateGridDimensions();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', updateGridDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateGridDimensions);
    };
  }, [updateGridDimensions]);

  return (
    <div
      ref={containerRef}
      data-slot="hexagon-background"
      className={cn(
        'relative size-full overflow-hidden dark:bg-neutral-900 bg-neutral-100',
        className,
      )}
      {...props}
    >
      <style>{`:root { --hexagon-margin: ${hexagonMargin}px; }`}</style>
      <div className="absolute top-0 -left-0 size-full overflow-hidden">
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => {
          const centerRow = Math.floor(gridDimensions.rows / 2);
          const centerCol = Math.floor(gridDimensions.columns / 2);
          const highlightRow = Math.max(0, centerRow - 1);
          const isCenterRow = rowIndex === highlightRow;
          return (
            <div
              key={`row-${rowIndex}`}
              style={{
                marginTop: computedMarginTop,
                marginLeft:
                  ((rowIndex + 1) % 2 === 0
                    ? evenRowMarginLeft
                    : oddRowMarginLeft) - 10,
              }}
              className="inline-flex"
            >
              {Array.from({ length: gridDimensions.columns }).map(
                (_, colIndex) => {
                  const centerCol = Math.floor(gridDimensions.columns / 2);
                  const isCenterCol = colIndex === centerCol;
                  const isHighlightCube = isCenterRow && isCenterCol;

                  return (
                    <div
                      key={`hexagon-${rowIndex}-${colIndex}`}
                      {...hexagonProps}
                      style={{
                        width: hexagonWidth,
                        height: hexagonHeight,
                        marginLeft: hexagonMargin,
                        boxShadow: isHighlightCube
                          ? '0 0 18px rgba(108, 210, 255, 0.9), inset 0 0 10px rgba(108, 210, 255, 0.45)'
                          : undefined,
                        zIndex: isHighlightCube ? 2 : 1,
                        ...hexagonProps?.style,
                      }}
                      className={cn(
                        'relative',
                        '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                        "before:content-[''] before:absolute before:inset-0 before:bg-[var(--border-subtle)] before:transition-all before:duration-1000",
                        "after:content-[''] after:absolute after:inset-[var(--hexagon-margin)] after:bg-[var(--card-bg)]",
                        'after:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                        'hover:before:bg-neutral-200 dark:hover:before:bg-neutral-800 hover:before:opacity-100 hover:before:duration-0 dark:hover:after:bg-neutral-900 hover:after:bg-neutral-100 hover:after:opacity-100 hover:after:duration-0',
                        isHighlightCube && 'before:bg-[rgba(108,210,255,0.35)] after:bg-[rgba(131,229,255,0.24)]',
                        hexagonProps?.className,
                      )}
                    >
                      {isHighlightCube && (
                        <div
                          aria-hidden
                          style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 3,
                          }}
                        >
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 42 V10" stroke="#5ad2ff" strokeWidth="3" strokeLinecap="round" />
                            <path d="M24 10 L10 24" stroke="#5ad2ff" strokeWidth="3" strokeLinecap="round" />
                            <path d="M24 10 L38 24" stroke="#5ad2ff" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}

export { HexagonBackground, type HexagonBackgroundProps };  