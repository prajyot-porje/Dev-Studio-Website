'use client';

import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import { m, useInView } from 'framer-motion';
import { useTheme } from '@/app/components/ThemeProvider';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SectionReveal from '@/components/ui/SectionReveal';

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
  externalInView?: boolean;
  premiumStatic?: boolean;
}

function BentoCard({ area, children, index, style, externalInView, premiumStatic }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hover, setHover] = useState(false);
  const { theme } = useTheme();

  /* ── Card Styling Constants (Sync with ServicesSection) ── */
  const SHELL_RADIUS = 36;
  const INNER_RADIUS = 28;

  // Shell Styles
  const shellBg = theme === 'dark' ? '#121316' : '#ECEDEF';
  const shellBorder = theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.07)';
  const shellShadow = theme === 'dark'
    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4), 0 24px 64px rgba(0, 0, 0, 0.3)'
    : 'inset 0 1px 0 rgba(255, 255, 255, 0.90), 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 32px rgba(0, 0, 0, 0.07), 0 40px 72px rgba(0, 0, 0, 0.09), 0 80px 120px rgba(0, 0, 0, 0.06)';

  // Inner Styles
  const innerBg = theme === 'dark'
    ? 'linear-gradient(165deg, #1a1c20 0%, #141518 20%, #101114 45%, #0c0d10 65%, #090a0c 85%, #060708 100%)'
    : 'linear-gradient(165deg, #ffffff 0%, #F7F8FA 60%, #F2F4F7 100%)';
  const innerBorder = theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(0, 0, 0, 0.055)';

  const innerShadowNormal = theme === 'dark'
    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.30), 0 4px 8px rgba(0, 0, 0, 0.12), 0 12px 28px rgba(0, 0, 0, 0.18), 0 28px 56px rgba(0, 0, 0, 0.16), 0 48px 80px rgba(0, 0, 0, 0.10)'
    : 'inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)';

  const innerShadowHover = theme === 'dark'
    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.30), 0 8px 16px rgba(0, 0, 0, 0.20), 0 16px 36px rgba(0, 0, 0, 0.24), 0 36px 72px rgba(0, 0, 0, 0.20), 0 64px 120px rgba(0, 0, 0, 0.15)'
    : 'inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 0 rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.06), 0 32px 56px rgba(0, 0, 0, 0.06)';

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
        borderRadius: SHELL_RADIUS,
        padding: 8,
        background: shellBg,
        border: shellBorder,
        boxShadow: shellShadow,
        overflow: 'visible',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        transition: 'transform 800ms var(--ease-spring), box-shadow 400ms var(--ease-out)',
        ...style,
      }}
    >
      <div
        className="bento-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: INNER_RADIUS,
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          background: innerBg,
          border: innerBorder,
          boxShadow: hover ? innerShadowHover : innerShadowNormal,
          transition: `box-shadow 350ms ${EASE_CSS}, background 400ms ${EASE_CSS}, border-color 400ms ${EASE_CSS}`,
          zIndex: 1,
        }}
      >
        {/* Top highlight line (Sync with ServicesSection) */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 28,
            right: 28,
            height: 1,
            background: theme === 'dark'
              ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 30%, rgba(255, 255, 255, 0.12) 70%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.4) 70%, transparent 100%)',
            borderRadius: '0 0 4px 4px',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {children}
        </div>
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
        fontSize: '1.2rem',
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
        fontSize: '0.80rem',
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
function CardUniqueDesign({ externalInView }: { externalInView?: boolean }) {
  const { theme } = useTheme();
  return (
    <BentoCard area="hero" index={0} externalInView={externalInView}>
      {/* Dynamic UI mockup instead of hexagons */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 240, height: 240, background: 'radial-gradient(circle, rgba(100,50,255,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, padding: '20px 0' }}>
        <m.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-40px' }}
          style={{
            width: '85%', height: '140px', background: 'var(--bg-primary)', borderRadius: '16px',
            border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), #6C63FF)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ width: '40%', height: '8px', background: 'var(--text-tertiary)', borderRadius: '4px', opacity: 0.5, marginBottom: '6px' }} />
              <div style={{ width: '25%', height: '6px', background: 'var(--text-tertiary)', borderRadius: '3px', opacity: 0.3 }} />
            </div>
          </div>
          {/* Body */}
          <div style={{ display: 'flex', gap: '12px', flex: 1, marginTop: '4px' }}>
            <div style={{ width: '60%', height: '100%', background: 'var(--text-tertiary)', borderRadius: '8px', opacity: 0.1 }} />
            <div style={{ width: '40%', height: '100%', background: 'var(--text-tertiary)', borderRadius: '8px', opacity: 0.1 }} />
          </div>
        </m.div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <CardTitle>Unique Design</CardTitle>
        <CardDesc>
          Transform your vision into reality with a bespoke design tailored
          specifically for your product.
        </CardDesc>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 2 — FUTURE-READY TECHNOLOGY (1 col)
   Layout: Text → Marquee (reversed per spec)
   Marquee: 2 rows, alternating direction, SVG logos from /public/icons
   ═══════════════════════════════════════════════════════════════ */
function CardFutureTech({ externalInView }: { externalInView?: boolean }) {
  const { theme } = useTheme();

  const icons = [
    { name: 'Figma', file: '/icons/Figma.svg' },
    { name: 'Next.js', file: '/icons/Next.js.svg', invertAlways: true },
    { name: 'React', file: '/icons/React.svg' },
    { name: 'Tailwind CSS', file: '/icons/Tailwind CSS.svg', invertAlways: false },
    { name: 'TypeScript', file: '/icons/TypeScript.svg' },
    { name: 'Claude', file: '/icons/claude-color.svg' },
    { name: 'Gemini', file: '/icons/gemini-color.svg' },
    { name: 'Google Search Console', file: '/icons/google-search-console-icon.svg' },
    { name: 'OpenAI', file: '/icons/openai.svg', invertAlways: true },
    { name: 'WordPress', file: '/icons/wordpress-logo-svgrepo-com.svg', invertAlways: true },
  ];

  const logoShadow = theme === 'dark'
    ? 'drop-shadow(0 20px 40px rgba(0,0,0,1)) drop-shadow(0 10px 16px rgba(0,0,0,0.8))'
    : 'drop-shadow(0 20px 40px rgba(0,0,0,0.35)) drop-shadow(0 10px 16px rgba(0,0,0,0.22))';

  return (
    <BentoCard area="tech" index={1} externalInView={externalInView}>
      {/* Text at top */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: sp(4) }}>
        <CardTitle>Future-Ready Technology</CardTitle>
        <CardDesc>From AI automation to modern web frameworks, we build with the latest tech to keep you ahead.</CardDesc>
      </div>

      {/* Tech Grid (Static) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', transform: 'translateX(-13px)' }}>
          {icons.slice(0, 5).map((icon, i) => (
            <div key={`r1-${i}`} title={icon.name} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src={icon.file}
                alt={icon.name}
                width={32}
                height={32}
                style={{
                  filter: `
                    ${(icon as any).invertAlways && theme === 'dark' ? 'invert(1)' : ''}
                    ${logoShadow}
                  `,
                  objectFit: 'contain',
                  borderRadius: icon.name === 'TypeScript' ? '8px' : '0px'
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '17px', transform: 'translateX(17px)' }}>
          {icons.slice(5, 10).map((icon, i) => (
            <div key={`r2-${i}`} title={icon.name} style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src={icon.file}
                alt={icon.name}
                width={32}
                height={32}
                style={{
                  filter: `
                    ${(icon as any).invertAlways && theme === 'dark' ? 'invert(1)' : ''}
                    ${logoShadow}
                  `,
                  objectFit: 'contain',
                  borderRadius: icon.name === 'TypeScript' ? '8px' : '0px'
                }}
              />
            </div>
          ))}
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
function CardInternational({ externalInView }: { externalInView?: boolean }) {
  const { theme } = useTheme();

  return (
    <BentoCard area="globe" index={2} externalInView={externalInView}>
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
function CardPerformance({ externalInView }: { externalInView?: boolean }) {
  const { theme } = useTheme();

  return (
    <BentoCard area="perf" index={3} externalInView={externalInView}>
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>

        {/* Thunder Image Background/Underlay */}
        <style>{`
          .perf-thunder-wrap {
            position: absolute;
            right: -12%;
            bottom: -15%;
            width: 190px;
            height: 190px;
            z-index: 0;
          }
          @media (max-width: 899px) {
            .perf-thunder-wrap {
              right: -15%;
              bottom: -80%;
              width: 160px;
              height: 160px;
            }
          }
        `}</style>
        <div className="perf-thunder-wrap">
          <Image
            src="/thunder.png"
            alt="Performance Thunder illustration"
            width={190}
            height={190}
            style={{
              objectFit: 'contain',
              filter: theme === 'dark'
                ? 'drop-shadow(0 24px 32px rgba(0, 0, 0, 0.7)) drop-shadow(0 8px 12px rgba(0, 0, 0, 0.5))'
                : 'drop-shadow(0 24px 32px rgba(0, 0, 0, 0.35)) drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15))',
              transform: 'rotate(-8deg)'
            }}
          />
        </div>

        {/* Text overlaid above */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 'auto' }}>
          <CardTitle>Performance-First</CardTitle>
          <CardDesc>Every decision optimized for speed, <br />SEO, and real-world performance.</CardDesc>
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
function CardOneContact({ externalInView }: { externalInView?: boolean }) {
  const { theme } = useTheme();

  return (
    <BentoCard area="contact" index={4} externalInView={externalInView} premiumStatic={true}>
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
      <style>{`
        .wcu-contact-diagram {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 899px) {
          .wcu-contact-diagram {
            padding-bottom: 20px; /* Prevent label clipping on mobile */
            margin-top: -15px;    /* Rebalance vertical alignment */
          }
        }
      `}</style>
      <div className="wcu-contact-diagram">
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
                border: '1px solid var(--border-color)', // Border updated
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="person-grad-1" x1="0" y1="1" x2="0" y2="0">
                    <stop stopColor="#888" offset="0%" />
                    <stop stopColor="#fff" offset="100%" />
                  </linearGradient>
                </defs>
                <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="url(#person-grad-1)" />
                <path d="M18 21c0-3.31-2.69-6-6-6s-6 2.69-6 6" stroke="url(#person-grad-1)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{
              position: 'absolute',
              zIndex: 1,
              top: 'calc(100% + 20px)',
              fontSize: '0.625rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontFamily: FONT,
              background: 'var(--bg-secondary)',
              padding: '3px 10px',
              borderRadius: 999,
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)', // Label shadow
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
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
            <div style={{ width: 84, height: 84, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))' }}>
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Fill */}
                <path d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z" fill="url(#ds-fill-v2)" />
                {/* Static gradient border */}
                <defs>
                  <linearGradient id="ds-fill-v2" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1c1c1c" />
                    <stop offset="1" stopColor="#080808" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Person icon */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', zIndex: 1, opacity: 0.9 }}>
                <defs>
                  <linearGradient id="person-grad-2" x1="0" y1="1" x2="0" y2="0">
                    <stop stopColor="#999" offset="0%" />
                    <stop stopColor="#fff" offset="100%" />
                  </linearGradient>
                </defs>
                <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="none" stroke="url(#person-grad-2)" strokeWidth="1.5" />
                <path d="M18 21c0-3.31-2.69-6-6-6s-6 2.69-6 6" stroke="url(#person-grad-2)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {/* Blue underglow */}
              <div style={{ position: 'absolute', inset: -12, background: 'radial-gradient(circle, rgba(40,80,255,0.18) 0%, transparent 65%)', filter: 'blur(12px)', zIndex: -1 }} />
            </div>
            {/* Dev Studio label */}
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              fontSize: '0.625rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontFamily: FONT,
              background: 'var(--bg-secondary)',
              padding: '3px 10px',
              borderRadius: 999,
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)', // Label shadow
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
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
            <div style={{ width: 64, height: 64, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))' }}>
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                <path d="M 92.64 37.07 Q 98.00 50.00 92.64 62.93 L 89.30 71.01 Q 83.94 83.94 71.01 89.30 L 62.93 92.64 Q 50.00 98.00 37.07 92.64 L 28.99 89.30 Q 16.06 83.94 10.70 71.01 L 7.36 62.93 Q 2.00 50.00 7.36 37.07 L 10.70 28.99 Q 16.06 16.06 28.99 10.70 L 37.07 7.36 Q 50.00 2.00 62.93 7.36 L 71.01 10.70 Q 83.94 16.06 89.30 28.99 Z" fill="url(#prod-fill-v2)" />
                <defs>
                  <linearGradient id="prod-fill-v2" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#141828" />
                    <stop offset="1" stopColor="#070a14" />
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
              top: 'calc(100% + 20px)',
              fontSize: '0.625rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontFamily: FONT,
              background: 'var(--bg-secondary)',
              padding: '3px 10px',
              borderRadius: 999,
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)', // Label shadow
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
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
function CardLongRun({ externalInView }: { externalInView?: boolean }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const localChartInView = useInView(chartRef, { once: true, margin: '-40px' });
  const isInView = externalInView ?? localChartInView;

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

      <SectionReveal>
        {(sectionInView) => (
          <div className="section-container" style={{ maxWidth: 1200 }}>
            {/* Section Heading */}
            <m.div
              initial={{ opacity: 0, y: 28 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
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
        )}
      </SectionReveal>
    </section>
  );
}