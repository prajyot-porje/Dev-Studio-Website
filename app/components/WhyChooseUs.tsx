'use client';

import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import { m, useInView } from 'framer-motion';
import { useTheme } from '@/app/components/ThemeProvider';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Globe = dynamic(() => import('@/components/globe'), { ssr: false });
import { HexagonBackground } from '@/components/hexagon';
import { ShineBorder } from '@/components/ui/shine-border';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Strict Poppins hierarchy + 4pt grid
   ═══════════════════════════════════════════════════════════════ */
const FONT = "'Poppins', system-ui, -apple-system, sans-serif";
const sp = (n: number) => `${n * 4}px`;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';

/* ═══════════════════════════════════════════════════════════════
   BENTO CARD WRAPPER — premium shadow system
   ═══════════════════════════════════════════════════════════════ */
interface BentoCardProps {
  area: string;
  children: ReactNode;
  index: number;
  style?: CSSProperties;
}

function BentoCard({ area, children, index, style }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hover, setHover] = useState(false);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.72, ease: EASE, delay: index * 0.07 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridArea: area,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 18,
        overflow: 'hidden',
        /* // PERF: promotes backdrop-filter elements to GPU layer — reduces repaint cost */
        willChange: 'transform, backdrop-filter',
        transform: 'translateZ(0)',
        ...style,
      }}
    >
      {/* Layer 1: Shadow — soft, diffused, premium */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 18,
          boxShadow: hover
            ? '0 8px 32px -8px rgba(0,0,0,0.18), 0 24px 56px -12px rgba(0,0,0,0.14), 0 0 0 1px var(--accent-blue-glow)'
            : '0 2px 8px -2px rgba(0,0,0,0.1), 0 8px 28px -6px rgba(0,0,0,0.08), 0 0 0 1px var(--border-color)',
          transition: `box-shadow 350ms ${EASE_CSS}`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Layer 2: Background + Border */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 18,
          background: 'var(--card-bg)',
          border: `1px solid ${hover ? 'var(--accent-blue-glow)' : 'var(--border-color)'}`,
          transition: `all 400ms ${EASE_CSS}`,
          zIndex: 1,
        }}
      />

      {/* Layer 3: Top specular highlight */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent 5%, var(--glass-highlight) 35%, var(--glass-highlight) 65%, transparent 95%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 4: Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: sp(4),
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          borderRadius: 18,
        }}
      >
        {children}
      </div>
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TYPOGRAPHY PRIMITIVES — Strict system
   ═══════════════════════════════════════════════════════════════ */
function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        margin: 0,
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        lineHeight: 1.25,
        fontFamily: FONT,
      }}
    >
      {children}
    </h3>
  );
}

function CardDesc({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: `${sp(1)} 0 0`,
        fontSize: '0.75rem',
        fontWeight: 400,
        color: 'var(--text-secondary)',
        lineHeight: 1.4,
        fontFamily: FONT,
      }}
    >
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 1 — UNIQUE DESIGN (Hero — largest visual weight, 2 cols)
   Layout: Visual → Text (unchanged per specification)
   ═══════════════════════════════════════════════════════════════ */
function CardUniqueDesign() {
  return (
    <BentoCard area="hero" index={0}>
      {/* Hex grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.75 }}>
          <HexagonBackground hexagonSize={72} hexagonMargin={3} className="!bg-transparent dark:!bg-transparent" />
        </div>

        {/* Fade overlays */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '55%', height: '40%', background: 'radial-gradient(ellipse at top left, var(--card-bg) 35%, transparent 75%)' }} />
          <div style={{ position: 'absolute', bottom: -5, left: 0, right: 0, height: '42%', background: 'linear-gradient(to bottom, transparent, var(--card-bg) 60%, var(--card-bg) 100%)' }} />
        </div>
      </div>

      

      {/* <div style={{ position: 'relative', zIndex: 2 }}>
        <CardTitle>Unique Design</CardTitle>
        <CardDesc>
          Transform your vision into reality with a bespoke design tailored
          specifically for your product.
        </CardDesc>
      </div> */}
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 2 — FUTURE-READY TECHNOLOGY (1 col)
   Layout: Text → Marquee (reversed per spec)
   Marquee: 2 rows, alternating direction, SVG logos from /public/icons
   ═══════════════════════════════════════════════════════════════ */
function CardFutureTech() {
  const { theme } = useTheme();

  const icons = [
    { name: 'Figma', file: '/icons/Figma.svg', invertInLight: false },
    { name: 'Next.js', file: '/icons/Next.js.svg', invertInLight: false, invertInDark: true },
    { name: 'React', file: '/icons/React.svg', invertInLight: false },
    { name: 'Tailwind CSS', file: '/icons/Tailwind CSS.svg', invertInLight: false },
    { name: 'TypeScript', file: '/icons/TypeScript.svg', invertInLight: false },
    { name: 'Vercel', file: '/icons/Vercel.svg', invertInLight: false, invertInDark: true },
    { name: 'Claude', file: '/icons/claude-color.svg', invertInLight: false },
    { name: 'Gemini', file: '/icons/gemini-color.svg', invertInLight: false },
    { name: 'OpenAI', file: '/icons/openai.svg', invertInLight: false, invertInDark: true },
  ];

  // Duplicate for seamless loop
  const row1 = [...icons, ...icons];
  const row2 = [...icons, ...icons];

  const iconBg = theme === 'dark'
    ? 'linear-gradient(145deg, #1a1a2e, #0d0d1a)'
    : 'linear-gradient(145deg, #f0f0f5, #e8e8f0)';

  const iconBorder = theme === 'dark'
    ? '1px solid rgba(255,255,255,0.08)'
    : '1px solid rgba(0,0,0,0.08)';

  return (
    <BentoCard area="tech" index={1}>
      {/* Text at top */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: sp(4) }}>
        <CardTitle>Future-Ready Technology</CardTitle>
        <CardDesc>From AI automation to Web3, we build with the latest tech to keep you ahead.</CardDesc>
      </div>

      {/* Marquee area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: sp(2),
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fade masks left/right */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'linear-gradient(to right, var(--card-bg) 0%, transparent 18%, transparent 82%, var(--card-bg) 100%)',
        }} />

        {/* Row 1 — scrolls LEFT */}
        <div style={{ display: 'flex', gap: sp(2), position: 'relative', zIndex: 1 }}>
          <div
            className="wcu-marquee-left"
            style={{ display: 'flex', gap: sp(2), flexShrink: 0 }}
          >
            {row1.map((icon, i) => (
              <div
                key={`r1-${i}`}
                title={icon.name}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: iconBorder,
                  boxShadow: theme === 'dark'
                    ? 'inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.5)'
                    : 'inset 0 1px 1px rgba(255,255,255,0.9), 0 4px 16px rgba(0,0,0,0.08)',
                  cursor: 'default',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={icon.file}
                  alt={icon.name}
                  width={24}
                  height={24}
                  style={{
                    filter: (icon as any).invertInDark && theme === 'dark' ? 'invert(1)' : 'none',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls RIGHT */}
        <div style={{ display: 'flex', gap: sp(2), position: 'relative', zIndex: 1 }}>
          <div
            className="wcu-marquee-right"
            style={{ display: 'flex', gap: sp(2), flexShrink: 0 }}
          >
            {row2.map((icon, i) => (
              <div
                key={`r2-${i}`}
                title={icon.name}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: iconBorder,
                  boxShadow: theme === 'dark'
                    ? 'inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.5)'
                    : 'inset 0 1px 1px rgba(255,255,255,0.9), 0 4px 16px rgba(0,0,0,0.08)',
                  cursor: 'default',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={icon.file}
                  alt={icon.name}
                  width={24}
                  height={24}
                  style={{
                    filter: (icon as any).invertInDark && theme === 'dark' ? 'invert(1)' : 'none',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 3 — INTERNATIONAL FROM DAY ONE (tall, spans 2 rows)
   Layout: Visual → Text (unchanged per spec)
   Additions: DotPattern bg + neon globe glow (dark mode only)
   ═══════════════════════════════════════════════════════════════ */
function CardInternational() {
  const { theme } = useTheme();

  return (
    <BentoCard area="globe" index={2}>
      {/* Dot pattern background */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] opacity-40"
        )}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Globe area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: 180,
          marginBottom: sp(3),
          zIndex: 1,
        }}
      >
        {/* Glow halo behind globe */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme === 'dark'
              ? 'rgba(59,123,255,0.1)'
              : 'rgba(0,82,255,0.06)'
              } 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Globe container with neon border (dark mode only) */}
        <div
          style={{
            width: 210,
            height: 210,
            borderRadius: '50%',
            position: 'relative',
            boxShadow: theme === 'dark'
              ? '0 0 0 1.5px rgba(60,140,255,0.5), 0 0 20px rgba(60,140,255,0.3), 0 0 60px rgba(60,140,255,0.12)'
              : 'none',
            transition: 'box-shadow 400ms ease',
          }}
        >
          <div style={{ width: '100%', height: '100%', transform: 'scale(1.15)' }}>
            <Globe
              dark={theme === 'dark' ? 1 : 0}
              scale={1.15}
              diffuse={theme === 'dark' ? 1.2 : 3}
              mapSamples={16000}
              mapBrightness={6}
              baseColor={theme === 'dark' ? [0.3, 0.3, 0.3] : [0.93, 0.93, 0.93]}
              markerColor={theme === 'dark' ? [0.1, 0.8, 1] : [0.1, 0.1, 0.1]}
              glowColor={theme === 'dark' ? [0.05, 0.05, 0.12] : [1, 1, 1]}
            />
          </div>
        </div>

        {/* Depth fade at bottom */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            background: 'linear-gradient(to top, var(--card-bg), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <CardTitle>International from day one</CardTitle>
        <CardDesc>Remote-first, timezone-flexible, built for US &amp; EU businesses.</CardDesc>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 4 — PERFORMANCE-FIRST (1 col)
   Layout: Text → Orbital (reversed per spec)
   ═══════════════════════════════════════════════════════════════ */
function CardPerformance() {
  const orbitLabels = ['LCP', 'SEO', 'Speed', 'A11y', 'CWV', 'Best Practices'];

  return (
    <BentoCard area="perf" index={3}>
      {/* Text at top */}
      <div style={{ marginBottom: sp(3) }}>
        <CardTitle>Performance-First</CardTitle>
        <CardDesc>Every decision optimized for speed, SEO, and real-world performance.</CardDesc>
      </div>

      {/* Orbital system */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Orbit track rings */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: '1px solid var(--border-subtle)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 110,
            height: 110,
            borderRadius: '50%',
            border: '1px dashed var(--border-subtle)',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        {/* Rotating container */}
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          /* // PERF: keeps rotating element on dedicated compositor layer permanently */
          style={{ width: 160, height: 160, position: 'relative', willChange: 'transform' }}
        >
          {orbitLabels.map((label, i) => {
            const angle = (i / orbitLabels.length) * 360;
            return (
              <div
                key={label}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translate(72px) rotate(${-angle}deg)`,
                }}
              >
                <m.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    style={{
                      padding: '3px 8px',
                      background: 'var(--glass-bg)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      borderRadius: 999,
                      border: '1px solid var(--border-color)',
                      fontSize: '0.5625rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      fontFamily: FONT,
                      boxShadow: '0 0 10px var(--accent-blue-subtle)',
                    }}
                  >
                    {label}
                  </div>
                </m.div>
              </div>
            );
          })}
        </m.div>

        {/* Center engine */}
        <div
          style={{
            position: 'absolute',
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid var(--accent-blue-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 28px var(--accent-blue-glow), inset 0 0 16px var(--accent-blue-subtle)`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 10V3L4 14h7v7l9-11h-7z"
              stroke="var(--accent-blue)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 5 — ONE CONTACT. FULL DELIVERY. (wide, 2 cols)
   Layout: Text → Diagram (reversed per spec)
   Additions: DotPattern bg, hexagon SVG shine animation
   Dark mode fix: nodes use same colors as light mode
   ═══════════════════════════════════════════════════════════════ */
function CardOneContact() {
  const { theme } = useTheme();

  return (
    <BentoCard area="contact" index={4}>
      {/* Dot pattern background */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] opacity-40"
        )}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Text at top */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: sp(4) }}>
        <CardTitle>One contact. Full delivery.</CardTitle>
        <CardDesc>The person you talk to builds your product. No handoffs, no lost context.</CardDesc>
      </div>

      {/* Node connectivity diagram */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <style>{`
          @keyframes wcu-beam-orange {
            0%   { transform: translateX(-110%); opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translateX(210%); opacity: 0; }
          }
          @keyframes wcu-beam-blue {
            0%   { transform: translateX(-110%); opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translateX(210%); opacity: 0; }
          }
          @keyframes wcu-hex-shine {
            0%   { stroke-dashoffset: 400; opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .wcu-beam { animation: none !important; }
            .wcu-hex-shine-path { animation: none !important; }
          }
        `}</style>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 480, gap: 0 }}>

          {/* Node 1: You (Squircle) */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            {/* Warm glow */}
            <div style={{ position: 'absolute', right: -24, top: 32, transform: 'translateY(-50%)', width: 48, height: 48, background: 'radial-gradient(circle, rgba(255,100,30,0.3) 0%, transparent 70%)', filter: 'blur(8px)', pointerEvents: 'none', zIndex: 0 }} />

            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 17,
                /* Same in both modes: light bg / dark bg mirrored to light */
                background: 'linear-gradient(180deg, #1c1c1c, #080808)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(255,80,20,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <ShineBorder borderWidth={2} shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="white" fillOpacity={0.9} />
                <path d="M18 21c0-3.31-2.69-6-6-6s-6 2.69-6 6" stroke="white" strokeOpacity={0.9} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{
              position: 'absolute',
              zIndex: 1,
              top: 'calc(100% + 15px)',
              fontSize: '0.625rem',
              color: 'var(--text-primary)',
              fontWeight: 500,
              fontFamily: FONT,
              background: 'var(--bg-secondary)',
              padding: '3px 10px',
              borderRadius: 999,
              border: '1px solid var(--border-color)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
              <ShineBorder borderWidth={1.5} duration={10} shineColor={theme === "dark" ? "white" : "black"} />
              <div>You</div>
            </div>
          </div>

          {/* Connection 1 — Orange beam */}
          <div style={{ flex: 1, position: 'relative', height: 52, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 -2px' }}>
            <div style={{ position: 'relative', height: 16, width: '100%', background: 'rgba(255,80,20,0.12)', overflow: 'hidden', borderRadius: 4 }}>
              <div
                className="wcu-beam"
                style={{
                  position: 'absolute', top: 0, left: 0, height: '100%', width: '50%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,120,60,0.9) 50%, rgba(255,160,80,1) 75%, transparent 100%)',
                  filter: 'drop-shadow(0 0 4px rgba(255,100,30,0.8))',
                  animation: 'wcu-beam-orange 2.2s cubic-bezier(0.4,0,0.6,1) infinite',
                  animationDelay: '0s',
                }}
              />
            </div>
            <div style={{ position: 'absolute', top: '51%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', zIndex: 2 }}>
              <span style={{ fontSize: '0.55rem', color: 'var(--text-primary)', fontFamily: FONT, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Direct Contact</span>
            </div>
          </div>

          {/* Node 2: Dev Studio (Hexagon with SVG shine) */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 84, height: 84, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 24px rgba(40,100,255,0.15))' }}>
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Fill */}
                <path d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z" fill="url(#ds-fill-v2)" />
                {/* Static border */}
                <path d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                {/* Animated shine stroke tracing hexagon perimeter */}
                <path
                  className="wcu-hex-shine-path"
                  d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z"
                  fill="none"
                  stroke="url(#ds-shine-grad)"
                  strokeWidth="2.5"
                  strokeDasharray="80 400"
                  strokeLinecap="round"
                  style={{
                    animation: 'wcu-hex-shine 3s linear infinite',
                  }}
                />
                <defs>
                  <linearGradient id="ds-fill-v2" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1c1c1c" />
                    <stop offset="1" stopColor="#080808" />
                  </linearGradient>
                  <linearGradient id="ds-shine-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A07CFE" />
                    <stop offset="0.5" stopColor="#FE8FB5" />
                    <stop offset="1" stopColor="#FFBE7B" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Person icon */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', zIndex: 1, opacity: 0.9 }}>
                <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
                <path d="M18 21c0-3.31-2.69-6-6-6s-6 2.69-6 6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {/* Blue underglow */}
              <div style={{ position: 'absolute', inset: -12, background: 'radial-gradient(circle, rgba(40,80,255,0.18) 0%, transparent 65%)', filter: 'blur(12px)', zIndex: -1 }} />
            </div>
            {/* Dev Studio label */}
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 5px)',
              fontSize: '0.625rem',
              color: 'var(--text-primary)',
              fontWeight: 500,
              fontFamily: FONT,
              background: 'var(--bg-secondary)',
              padding: '3px 10px',
              borderRadius: 999,
              border: '1px solid var(--border-color)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
              <ShineBorder borderWidth={1.5} duration={10} shineColor={theme === "dark" ? "white" : "black"} />
              <div>Dev Studio</div>
            </div>
          </div>

          {/* Connection 2 — Blue beam */}
          <div style={{ flex: 1, position: 'relative', height: 52, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 -2px' }}>
            <div style={{ position: 'relative', height: 16, width: '100%', background: 'rgba(0,82,255,0.12)', overflow: 'hidden', borderRadius: 4 }}>
              <div
                className="wcu-beam"
                style={{
                  position: 'absolute', top: 0, left: 0, height: '100%', width: '50%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(30,100,255,0.85) 40%, rgba(80,160,255,1) 70%, transparent 100%)',
                  filter: 'drop-shadow(0 0 4px rgba(0,100,255,0.9))',
                  animation: 'wcu-beam-blue 2.2s cubic-bezier(0.4,0,0.6,1) infinite',
                  animationDelay: '1.1s',
                }}
              />
            </div>
            <div style={{ position: 'absolute', top: '51%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', zIndex: 2 }}>
              <span style={{ fontSize: '0.55rem', color: 'var(--text-primary)', fontFamily: FONT, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Full Delivery</span>
            </div>
          </div>

          {/* Node 3: Product (Hexagon with SVG shine) */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 64, height: 64, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 24px rgba(40,100,255,0.15))' }}>
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                <path d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z" fill="url(#prod-fill-v2)" />
                {/* Static border */}
                <path d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z" fill="none" stroke="rgba(60,120,255,0.4)" strokeWidth="2.5" />
                {/* Animated shine stroke */}
                <path
                  className="wcu-hex-shine-path"
                  d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z"
                  fill="none"
                  stroke="url(#prod-shine-grad)"
                  strokeWidth="2.5"
                  strokeDasharray="80 400"
                  strokeLinecap="round"
                  style={{
                    animation: 'wcu-hex-shine 3s linear infinite',
                    animationDelay: '1.5s',
                  }}
                />
                <defs>
                  <linearGradient id="prod-fill-v2" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#141828" />
                    <stop offset="1" stopColor="#070a14" />
                  </linearGradient>
                  <linearGradient id="prod-shine-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa" />
                    <stop offset="0.5" stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Product icon — dot cluster, always light */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', zIndex: 1 }}>
                <circle cx="12" cy="12" r="3" fill="white" fillOpacity={0.85} />
                <circle cx="12" cy="4.5" r="1.8" fill="white" fillOpacity={0.5} />
                <circle cx="12" cy="19.5" r="1.8" fill="white" fillOpacity={0.5} />
                <circle cx="5" cy="8" r="1.8" fill="white" fillOpacity={0.5} />
                <circle cx="19" cy="8" r="1.8" fill="white" fillOpacity={0.5} />
                <circle cx="5" cy="16" r="1.8" fill="white" fillOpacity={0.5} />
                <circle cx="19" cy="16" r="1.8" fill="white" fillOpacity={0.5} />
                <path d="M12 7.5v2M12 14.5v2M8.5 10l2 1.2M15.5 10l-2 1.2M8.5 14l2-1.2M15.5 14l-2-1.2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
              </svg>
              {/* Blue bloom glow */}
              <div style={{ position: 'absolute', inset: -16, background: 'radial-gradient(circle, rgba(0,100,255,0.25) 0%, transparent 60%)', filter: 'blur(12px)', zIndex: -1 }} />
            </div>
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 15px)',
              fontSize: '0.625rem',
              color: 'var(--text-primary)',
              fontWeight: 500,
              fontFamily: FONT,
              background: 'var(--bg-secondary)',
              padding: '3px 10px',
              borderRadius: 999,
              border: '1px solid var(--border-color)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
              <ShineBorder borderWidth={1.5} duration={10} shineColor={theme === "dark" ? "white" : "black"} />
              <div>Product</div>
            </div>
          </div>

        </div>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 6 — WE BUILD FOR THE LONG RUN (1 col)
   Layout: Text → Chart (reversed per spec)
   Removed: floating dots, arrow tip
   ═══════════════════════════════════════════════════════════════ */
function CardLongRun() {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: '-40px' });

  const points = [
    { x: 35, y: 120 },
    { x: 100, y: 114 },
    { x: 190, y: 58 },
    { x: 275, y: 38 },
    { x: 355, y: 16 },
  ];

  const pathD = `M${points.map((p) => `${p.x},${p.y}`).join(' L')}`;
  const areaD = `M${points[0].x},135 L${points.map((p) => `${p.x},${p.y}`).join(' L')} L${points[points.length - 1].x},135 Z`;
  const LENGTH = 420;

  const labels = ['Brief', 'Build', 'Launch', '+6mo', '+1yr'];

  return (
    <BentoCard area="longrun" index={5}>
      {/* Text at top */}
      <div style={{ marginBottom: sp(3) }}>
        <CardTitle>We build for the long run</CardTitle>
        <CardDesc>We don't disappear after launch. We're the team you keep.</CardDesc>
      </div>

      {/* Growth chart */}
      <div
        ref={chartRef}
        style={{
          flex: 1,
          position: 'relative',
          minHeight: 110,
        }}
      >
        <svg viewBox="0 0 390 150" fill="none" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="wcu-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wcu-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent-blue)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[135, 100, 65, 30].map((y) => (
            <line key={y} x1="28" y1={y} x2="370" y2={y} stroke="var(--border-subtle)" strokeWidth="1" />
          ))}

          {/* Launch divider */}
          <line x1="190" y1="10" x2="190" y2="135" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Area fill */}
          <path d={areaD} fill="url(#wcu-area-grad)" />

          {/* Glow blur layer */}
          <path
            d={pathD}
            stroke="url(#wcu-glow-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              strokeDasharray: LENGTH,
              strokeDashoffset: isInView ? 0 : LENGTH,
              transition: `stroke-dashoffset 2s ${EASE_CSS}`,
              filter: 'blur(3px)',
            }}
          />

          {/* Main line */}
          <path
            d={pathD}
            stroke="var(--accent-blue)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: LENGTH,
              strokeDashoffset: isInView ? 0 : LENGTH,
              transition: `stroke-dashoffset 1.8s ${EASE_CSS}`,
              filter: 'drop-shadow(0 0 6px var(--accent-blue-glow))',
            }}
          />

          {/* Data dots */}
          {points.map((p, i) => (
            <m.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="var(--bg-primary)"
              stroke="var(--accent-blue)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.45 + i * 0.14, duration: 0.3 }}
              style={{ filter: 'drop-shadow(0 0 4px var(--accent-blue-glow))' }}
            />
          ))}

          {/* Axis labels */}
          {labels.map((label, i) => (
            <text
              key={label}
              x={points[i].x}
              y="148"
              fill="var(--text-tertiary)"
              fontSize="7.5"
              textAnchor="middle"
              fontWeight="500"
              fontFamily={FONT}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION EXPORT
   ═══════════════════════════════════════════════════════════════ */
export default function WhyChooseUsSection() {
  return (
    <section
      id="why-us"
      style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Global keyframes & marquee animation */}
      <style>{`
        @keyframes wcu-marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wcu-marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .wcu-marquee-left {
          animation: wcu-marquee-left 28s linear infinite;
          will-change: transform;
        }
        .wcu-marquee-right {
          animation: wcu-marquee-right 28s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .wcu-marquee-left,
          .wcu-marquee-right { animation: none !important; }
        }

        /* Tablet (2-col) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .wcu-bento-grid {
            grid-template-areas:
              "hero   hero"
              "tech   perf"
              "globe  globe"
              "contact contact"
              "longrun longrun" !important;
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
        }
        /* Mobile (1-col) */
        @media (max-width: 768px) {
          .wcu-bento-grid {
            grid-template-areas:
              "hero"
              "tech"
              "globe"
              "perf"
              "contact"
              "longrun" !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
        }
      `}</style>

      <div className="section-container" style={{ maxWidth: 1200 }}>
        {/* Section Heading */}
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: EASE }}
          style={{ maxWidth: 560, marginBottom: sp(8) }}
        >
          <p
            style={{
              margin: `0 0 ${sp(2)}`,
              fontSize: '0.625rem',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: FONT,
            }}
          >
            Why choose us
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              fontFamily: FONT,
            }}
          >
            Built different.
            <br />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
              Delivered right.
            </span>
          </h2>
        </m.div>

        {/* Bento Grid */}
        <div
          className="wcu-bento-grid"
          style={{
            display: 'grid',
            gridTemplateAreas: `
              "hero     hero    globe"
              "tech     perf    globe"
              "contact  contact longrun"
            `,
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: 'minmax(200px, auto) minmax(200px, auto) minmax(170px, auto)',
            gap: sp(2),
            isolation: 'isolate',
          }}
        >
          <CardUniqueDesign />
          <CardFutureTech />
          <CardInternational />
          <CardPerformance />
          <CardOneContact />
          <CardLongRun />
        </div>
      </div>
    </section>
  );
}