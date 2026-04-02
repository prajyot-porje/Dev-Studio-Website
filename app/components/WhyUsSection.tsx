'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { m, useInView } from 'framer-motion';
import { useTheme } from '@/app/components/ThemeProvider';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('@/components/globe'), { ssr: false });

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS  — Perfect Fourth type scale (1.333) + 8pt grid
   ═══════════════════════════════════════════════════════════════ */
const TX = {
  xs:  '0.625rem',    // 10px  — ALL-CAPS labels
  sm:  '0.8125rem',   // 13px  — body / description
  md:  '1.125rem',    // 18px  — card titles
  lg:  '1.5rem',      // 24px
  xl:  '2rem',        // 32px
  '2xl': 'clamp(2.25rem, 5vw, 3.25rem)', // section display
};

/** 4-pt grid helper: sp(6) = 24px */
const sp = (n: number): string => `${n * 4}px`;

// Named easing — no CSS keyword defaults
const EO   = [0.16, 1, 0.3, 1]      as [number, number, number, number]; // ease-out
const ES   = [0.34, 1.56, 0.64, 1]  as [number, number, number, number]; // spring
const EO_C  = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EOS_C = 'cubic-bezier(0, 0.55, 0.45, 1)';

const FONT_H = "'Poppins', 'Inter', system-ui, sans-serif";
const FONT_B = "'Inter', system-ui, sans-serif";

/* ═══════════════════════════════════════════════════════════════
   BENTO CARD WRAPPER
   ═══════════════════════════════════════════════════════════════ */
interface BentoCardProps {
  gridArea: string;
  children: ReactNode;
  index: number;
}

function BentoCard({ gridArea, children, index }: BentoCardProps) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hover, setHover] = useState(false);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.72, ease: EO, delay: index * 0.07 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridArea,
        position:      'relative',
        display:       'flex',
        flexDirection: 'column',
        background:    'var(--card-bg)',
        borderRadius:  20,
        border:        `1px solid ${hover ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow:     hover
          ? '0 24px 56px -10px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)'
          : '0 4px 14px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.04)',
        transition:    `border-color 300ms ${EO_C}, box-shadow 400ms ${EO_C}`,
        overflow:      'hidden',
        padding:       sp(6),
      }}
    >
      {/* Top-edge specular highlight */}
      <div
        aria-hidden
        style={{
          position:   'absolute',
          top: 0, left: 0, right: 0,
          height:     1,
          background: 'linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.08) 35%,rgba(255,255,255,0.08) 65%,transparent 95%)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHARED TYPOGRAPHY PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */
function CardLabel({ text }: { text: string }) {
  return (
    <p style={{
      margin:         `0 0 ${sp(3)}`,
      fontSize:       TX.xs,
      fontWeight:     600,
      color:          'var(--text-tertiary)',
      textTransform:  'uppercase',
      letterSpacing:  '0.1em',
      lineHeight:     1.3,
      fontFamily:     FONT_H,
    }}>{text}</p>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 style={{
      margin:        0,
      fontSize:      TX.md,
      fontWeight:    600,
      color:         'var(--text-primary)',
      letterSpacing: '-0.02em',
      lineHeight:    1.2,
      fontFamily:    FONT_H,
    }}>{children}</h3>
  );
}

function CardDesc({ children }: { children: ReactNode }) {
  return (
    <p style={{
      margin:     `${sp(2)} 0 0`,
      fontSize:   TX.sm,
      fontWeight: 400,
      color:      'var(--text-secondary)',
      lineHeight: 1.6,
      fontFamily: FONT_B,
    }}>{children}</p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 1 — UNIQUE DESIGN  (hero, 2 columns wide)
   ═══════════════════════════════════════════════════════════════ */
function CardDesign() {
  return (
    <BentoCard gridArea="c-design" index={0}>
      {/* Hexagonal tiling background */}
      <div
        aria-hidden
        style={{
          position:            'absolute',
          inset:               0,
          backgroundImage:     `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='64' viewBox='0 0 56 64'%3E%3Cpath d='M28 2L54 17v30L28 62 2 47V17z' fill='none' stroke='rgba(255,255,255,0.055)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundRepeat:    'repeat',
          pointerEvents:       'none',
          zIndex:              0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardLabel text="Unique Design" />

        {/* Floating 3-D Cube */}
        <div style={{
          flex:            1,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          position:        'relative',
          marginBottom:    sp(5),
        }}>
          {/* Ambient glow */}
          <div aria-hidden style={{
            position:     'absolute',
            width:        260,
            height:       220,
            borderRadius: '50%',
            background:   'radial-gradient(ellipse,rgba(0,82,255,0.17) 0%,transparent 65%)',
            filter:       'blur(28px)',
            pointerEvents:'none',
          }} />

          <m.div
            animate={{ y: [0, -18, 0], rotateX: [8, 16, 8], rotateY: [15, 30, 15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 96, height: 96, position: 'relative', transformStyle: 'preserve-3d' }}
          >
            {/* Front face */}
            <div style={{
              position:     'absolute', inset: 0,
              transform:    'translateZ(48px)',
              background:   'linear-gradient(145deg,#2563ff,#0041cc)',
              borderRadius: 16,
              border:       '1px solid rgba(120,172,255,0.4)',
              boxShadow:    '0 0 90px rgba(0,82,255,0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Right face */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: 'rotateY(90deg) translateZ(48px)',
              background: 'linear-gradient(180deg,#0041cc,#002fa3)',
              borderRadius: 16,
              border: '1px solid rgba(0,82,255,0.3)',
            }} />
            {/* Top face */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: 'rotateX(-90deg) translateZ(48px)',
              background: 'linear-gradient(180deg,#3380ff,#1a5fff)',
              borderRadius: 16,
              border: '1px solid rgba(120,172,255,0.45)',
            }} />
            {/* Left face */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: 'rotateY(-90deg) translateZ(48px)',
              background: '#002fa3',
              borderRadius: 16,
              border: '1px solid rgba(0,82,255,0.2)',
            }} />
          </m.div>
        </div>

        <div>
          <CardTitle>Unique Design</CardTitle>
          <CardDesc>Transform your vision into reality with a bespoke design tailored specifically for your product.</CardDesc>
        </div>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 2 — FUTURE-READY TECHNOLOGY  (1 column)
   ═══════════════════════════════════════════════════════════════ */
function CardTech() {
  const icons = [
    /* Row 1 */
    {
      name: 'Next.js',
      bg:   'radial-gradient(circle at 35% 30%,#222,#000)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 18L14 4" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M4 4h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 4v14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'React',
      bg:   'radial-gradient(circle at 35% 30%,#0b2340,#061525)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      bg:   'radial-gradient(circle at 35% 30%,#3178C6,#1d4ed8)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M7 11h7" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M10.5 11v6" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M15 13.8c0-1.55.82-2.3 1.85-2.3s1.85.75 1.85 2.3-.82 2.3-1.85 2.3-1.85-.75-1.85-2.3z" stroke="white" strokeWidth="1.6" fill="none" />
        </svg>
      ),
    },
    {
      name: 'Tailwind CSS',
      bg:   'radial-gradient(circle at 35% 30%,#0f2233,#071626)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 2.9-1.3.63.16 1.08.62 1.58 1.12C13.07 9.9 13.93 10.8 15.8 10.8c2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-2.9 1.3-.63-.16-1.08-.62-1.58-1.12C14.73 6.9 13.87 6 12 6zm-4.2 5.4c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 2.9-1.3.63.16 1.08.62 1.58 1.12.79.78 1.65 1.68 3.52 1.68 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-2.9 1.3-.63-.16-1.08-.62-1.58-1.12-.79-.78-1.65-1.68-3.52-1.68z" fill="#38BDF8" />
        </svg>
      ),
    },
    /* Row 2 */
    {
      name: 'OpenAI',
      bg:   'radial-gradient(circle at 35% 30%,#1a1a1a,#0a0a0a)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3a9 9 0 1 0 9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 3.5C17.8 4.5 20 7 20 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.5" fill="white" />
          <path d="M9 9l-2-2M15 9l2-2M12 7V4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Three.js',
      bg:   'radial-gradient(circle at 35% 30%,#1a1a1a,#0a0a0a)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L21 19H3L12 3z" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M12 8L18 18.5H6L12 8z" fill="white" fillOpacity="0.25" />
          <path d="M12 13L15 18.5H9L12 13z" fill="white" fillOpacity="0.7" />
        </svg>
      ),
    },
    {
      name: 'Framer Motion',
      bg:   'radial-gradient(circle at 35% 30%,#13133a,#0a0a20)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 4h14v7H5z" fill="white" fillOpacity="0.9" />
          <path d="M5 11h7l7 7.5H5z" fill="white" fillOpacity="0.55" />
          <path d="M5 18.5l7-7.5v7.5H5z" fill="white" fillOpacity="0.28" />
        </svg>
      ),
    },
    {
      name: 'Anthropic',
      bg:   'radial-gradient(circle at 35% 30%,#c47a5a,#a05038)',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 4L19.5 19H4.5L12 4z" fill="white" fillOpacity="0.92" />
          <path d="M9 14.5h6" stroke="rgba(160,80,56,0.8)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <BentoCard gridArea="c-tech" index={1}>
      <CardLabel text="Our Stack" />

      {/* 2 × 4 icon grid */}
      <div style={{
        flex:           1,
        display:        'flex',
        flexDirection:  'column',
        gap:            sp(3),
        justifyContent: 'center',
        position:       'relative',
        marginBottom:   sp(5),
      }}>
        {/* Subtle blue ambient */}
        <div aria-hidden style={{
          position:     'absolute', inset: 0,
          background:   'radial-gradient(ellipse at 50% 55%,rgba(0,82,255,0.07) 0%,transparent 72%)',
          pointerEvents:'none',
        }} />

        {[icons.slice(0, 4), icons.slice(4, 8)].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: sp(3), justifyContent: 'center', position: 'relative' }}>
            {row.map((icon) => (
              <m.div
                key={icon.name}
                title={icon.name}
                whileHover={{ scale: 1.12, y: -4 }}
                transition={{ duration: 0.18, ease: ES }}
                style={{
                  width:        52,
                  height:       52,
                  borderRadius: '50%',
                  background:   icon.bg,
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent:'center',
                  border:       '1px solid rgba(255,255,255,0.08)',
                  boxShadow:    'inset 0 1px 0 rgba(255,255,255,0.07),0 4px 16px rgba(0,0,0,0.45)',
                  cursor:       'default',
                  flexShrink:   0,
                }}
              >
                {icon.svg}
              </m.div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <CardTitle>Future-Ready Technology</CardTitle>
        <CardDesc>From AI automation to Web3, we build with the latest tech to keep you ahead.</CardDesc>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 3 — PERFORMANCE-FIRST  (1 column)
   ═══════════════════════════════════════════════════════════════ */
function CardPerf() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: '-40px' });

  const R   = 44;
  const CIR = 2 * Math.PI * R;

  const METRICS = ['Performance', 'Accessibility', 'Best Practices', 'SEO'];

  return (
    <BentoCard gridArea="c-perf" index={2}>
      <CardLabel text="Performance-First" />

      <div
        ref={wrapRef}
        style={{
          flex:           1,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            sp(4),
          marginBottom:   sp(5),
        }}
      >
        {/* Score ring */}
        <div style={{ position: 'relative', width: 104, height: 104 }}>
          <svg width="104" height="104" viewBox="0 0 104 104" style={{ transform: 'rotate(-90deg)' }}>
            {/* Track */}
            <circle cx="52" cy="52" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            {/* Fill */}
            <m.circle
              cx="52" cy="52" r={R}
              fill="none"
              stroke="#22c55e"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIR}
              initial={{ strokeDashoffset: CIR }}
              animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: CIR }}
              transition={{ duration: 1.5, ease: EO, delay: 0.3 }}
              style={{ filter: 'drop-shadow(0 0 7px rgba(34,197,94,0.55))' }}
            />
          </svg>

          {/* Center label */}
          <div style={{
            position:       'absolute', inset: 0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            <m.span
              initial={{ opacity: 0, scale: 0.65 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.65 }}
              transition={{ duration: 0.5, ease: ES, delay: 0.55 }}
              style={{
                fontSize:      '1.875rem',
                fontWeight:    700,
                color:         'var(--text-primary)',
                lineHeight:    1,
                letterSpacing: '-0.04em',
                fontFamily:    FONT_H,
              }}
            >
              100
            </m.span>
            <span style={{
              fontSize:      '0.5625rem',
              fontWeight:    500,
              color:         'var(--text-tertiary)',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginTop:     2,
            }}>Score</span>
          </div>
        </div>

        {/* Metric chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(2), justifyContent: 'center' }}>
          {METRICS.map((metric, i) => (
            <m.div
              key={metric}
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.35, ease: EO, delay: 0.7 + i * 0.08 }}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         sp(1),
                padding:     `${sp(1)} ${sp(2)}`,
                borderRadius:999,
                background:  'rgba(34,197,94,0.07)',
                border:      '1px solid rgba(34,197,94,0.2)',
              }}
            >
              <div style={{
                width:     5, height: 5,
                borderRadius: '50%',
                background:   '#22c55e',
                boxShadow:    '0 0 6px rgba(34,197,94,0.6)',
                flexShrink:   0,
              }} />
              <span style={{
                fontSize:   '0.5625rem',
                fontWeight: 500,
                color:      'rgba(255,255,255,0.68)',
                whiteSpace: 'nowrap',
              }}>{metric}</span>
            </m.div>
          ))}
        </div>
      </div>

      <div>
        <CardTitle>Performance-First</CardTitle>
        <CardDesc>Every decision optimized for speed, SEO, and real-world performance.</CardDesc>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 4 — INTERNATIONAL FROM DAY ONE  (tall, spans 2 rows)
   Globe kept EXACTLY as original.
   ═══════════════════════════════════════════════════════════════ */
function CardGlobe() {
  const { theme } = useTheme();

  return (
    <BentoCard gridArea="c-globe" index={3}>
      <CardLabel text="Global Reach" />

      {/* Globe — unchanged from original */}
      <div style={{
        flex:            1,
        position:        'relative',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        overflow:        'hidden',
        minHeight:        200,
        marginBottom:    sp(5),
      }}>
        <div style={{ width: 200, height: 200, transform: 'scale(1.2)' }}>
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
        {/* Fade vignette at bottom */}
        <div
          aria-hidden
          style={{
            position:      'absolute',
            bottom: 0, left: 0, right: 0,
            height:        36,
            background:    'linear-gradient(to top,var(--card-bg),transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div>
        <CardTitle>International from day one</CardTitle>
        <CardDesc>Remote-first, timezone-flexible, built for US & EU businesses.</CardDesc>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 5 — ONE CONTACT. FULL DELIVERY.  (2 columns wide)
   ═══════════════════════════════════════════════════════════════ */
function CardContact() {
  return (
    <BentoCard gridArea="c-contact" index={4}>
      <CardLabel text="Communication" />

      {/* 3-Node flow diagram */}
      <div style={{
        flex:           1,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        marginBottom:   sp(5),
        position:       'relative',
      }}>
        {/* Ambient glows — orange left, blue right */}
        <div aria-hidden style={{
          position:     'absolute',
          width:        140, height: 140,
          left:         '8%', top: '50%',
          transform:    'translateY(-50%)',
          borderRadius: '50%',
          background:   'radial-gradient(circle,rgba(200,100,50,0.22) 0%,transparent 72%)',
          filter:       'blur(22px)',
          pointerEvents:'none',
        }} />
        <div aria-hidden style={{
          position:     'absolute',
          width:        140, height: 140,
          right:        '8%', top: '50%',
          transform:    'translateY(-50%)',
          borderRadius: '50%',
          background:   'radial-gradient(circle,rgba(0,82,255,0.22) 0%,transparent 72%)',
          filter:       'blur(22px)',
          pointerEvents:'none',
        }} />

        {/* Inner row: [You] [connector] [Dev Studio] [connector] [Delivered] */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 380, position: 'relative' }}>

          {/* Node: You */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: sp(2), flexShrink: 0 }}>
            <div style={{
              width:       60, height: 60,
              borderRadius:14,
              background:  'rgba(255,255,255,0.04)',
              border:      '1px solid rgba(255,255,255,0.1)',
              display:     'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow:   '0 4px 16px rgba(0,0,0,0.3)',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: 'var(--text-secondary)', fontFamily: FONT_B }}>You</span>
          </div>

          {/* Connector 1 */}
          <div style={{
            flex:        1,
            height:      2,
            background:  'rgba(255,255,255,0.07)',
            margin:      '0 12px',
            marginBottom:sp(5), // offset for the label below
            borderRadius:999,
            position:    'relative',
            overflow:    'hidden',
          }}>
            <div className="wcu-particle-orange" style={{
              position:   'absolute', inset: 0,
              background: 'linear-gradient(90deg,transparent,rgba(200,110,60,0.85),transparent)',
            }} />
          </div>

          {/* Node: Dev Studio (highlighted) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: sp(2), flexShrink: 0, position: 'relative' }}>
            {/* Pulse ring */}
            <m.div
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position:     'absolute',
                top:          -6, left: -6, right: -6, bottom: -6,
                borderRadius: 24,
                border:       '1px solid rgba(0,82,255,0.45)',
                pointerEvents:'none',
              }}
            />
            <div style={{
              width:       72, height: 72,
              borderRadius:18,
              background:  'rgba(0,82,255,0.1)',
              border:      '1.5px solid rgba(0,82,255,0.5)',
              display:     'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow:   '0 0 36px rgba(0,82,255,0.3), 0 4px 16px rgba(0,0,0,0.3)',
              position:    'relative', zIndex: 1,
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{
              fontSize:   '0.6875rem',
              fontWeight: 600,
              color:      'var(--text-primary)',
              fontFamily: FONT_H,
              whiteSpace: 'nowrap',
            }}>Dev Studio</span>
          </div>

          {/* Connector 2 */}
          <div style={{
            flex:        1,
            height:      2,
            background:  'rgba(255,255,255,0.07)',
            margin:      '0 12px',
            marginBottom:sp(5),
            borderRadius:999,
            position:    'relative',
            overflow:    'hidden',
          }}>
            <div className="wcu-particle-blue" style={{
              position:   'absolute', inset: 0,
              background: 'linear-gradient(90deg,transparent,rgba(0,82,255,0.9),transparent)',
            }} />
          </div>

          {/* Node: Delivered */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: sp(2), flexShrink: 0 }}>
            <div style={{
              width:       60, height: 60,
              borderRadius:14,
              background:  'rgba(34,197,94,0.06)',
              border:      '1px solid rgba(34,197,94,0.22)',
              display:     'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow:   '0 4px 16px rgba(0,0,0,0.3)',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="rgba(34,197,94,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: 'var(--text-secondary)', fontFamily: FONT_B }}>Delivered</span>
          </div>
        </div>
      </div>

      <div>
        <CardTitle>One contact. Full delivery.</CardTitle>
        <CardDesc>The person you talk to builds your product. No handoffs, no lost context.</CardDesc>
      </div>
    </BentoCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD 6 — WE BUILD FOR THE LONG RUN  (1 column)
   ═══════════════════════════════════════════════════════════════ */
function CardLongRun() {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: '-40px' });

  const points = [
    { x: 40,  y: 118 },
    { x: 110, y: 112 },
    { x: 200, y: 60  },
    { x: 285, y: 38  },
    { x: 370, y: 18  },
  ];

  const pathD  = `M${points.map((p) => `${p.x},${p.y}`).join(' L')}`;
  const areaD  = `M${points[0].x},138 L${points.map((p) => `${p.x},${p.y}`).join(' L')} L${points[points.length - 1].x},138 Z`;
  const LENGTH = 400;

  return (
    <BentoCard gridArea="c-longrun" index={5}>
      <CardLabel text="Long-Term Value" />

      {/* Growth chart */}
      <div
        ref={chartRef}
        style={{ flex: 1, position: 'relative', marginBottom: sp(5), minHeight: 120 }}
      >
        <svg
          viewBox="0 0 410 150"
          fill="none"
          style={{ width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lr-area" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#0052FF" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#0052FF" stopOpacity="0"    />
            </linearGradient>
            <linearGradient id="lr-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#0052FF" stopOpacity="0"   />
              <stop offset="50%"  stopColor="#0052FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0052FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[138, 100, 60, 22].map((y) => (
            <line key={y} x1="32" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}

          {/* Launch divider */}
          <line x1="200" y1="12" x2="200" y2="138" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="200" y="148" fill="rgba(255,255,255,0.28)" fontSize="8.5" textAnchor="middle" fontWeight="500">Launch</text>

          {/* Area fill */}
          <path d={areaD} fill="url(#lr-area)" />

          {/* Glow blur layer */}
          <path
            d={pathD}
            stroke="url(#lr-glow)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              strokeDasharray:  LENGTH,
              strokeDashoffset: isInView ? 0 : LENGTH,
              transition:       'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1)',
              filter:           'blur(3px)',
            }}
          />

          {/* Main line */}
          <path
            d={pathD}
            stroke="#0052FF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray:  LENGTH,
              strokeDashoffset: isInView ? 0 : LENGTH,
              transition:       'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)',
              filter:           'drop-shadow(0 0 7px rgba(0,82,255,0.65))',
            }}
          />

          {/* Data dots */}
          {points.map((p, i) => (
            <m.circle
              key={i}
              cx={p.x} cy={p.y} r="4.5"
              fill="var(--card-bg,#0d0d0d)"
              stroke="#0052FF"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.45 + i * 0.14, duration: 0.3 }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(0,82,255,0.55))' }}
            />
          ))}

          {/* Axis labels */}
          <text x="40"  y="148" fill="rgba(255,255,255,0.28)" fontSize="8.5" textAnchor="middle">Brief</text>
          <text x="370" y="148" fill="rgba(255,255,255,0.28)" fontSize="8.5" textAnchor="end">+1yr</text>

          {/* Arrow tip */}
          <m.path
            d="M367 14 L375 8 L375 20Z"
            fill="#0052FF"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1.4, duration: 0.35 }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,82,255,0.7))', transformOrigin: '371px 14px' }}
          />
        </svg>
      </div>

      <div>
        <CardTitle>We build for the long run</CardTitle>
        <CardDesc>We don't disappear after launch. We're the team you keep.</CardDesc>
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
      style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}
    >
      {/* ─── Global keyframes + reduced-motion + responsive grid ─── */}
      <style>{`
        @keyframes wcu-flow-orange {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%);  }
        }
        @keyframes wcu-flow-blue {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%);  }
        }
        .wcu-particle-orange {
          animation: wcu-flow-orange 1.6s linear infinite;
        }
        .wcu-particle-blue {
          animation: wcu-flow-blue 1.6s linear infinite 0.8s;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .wcu-particle-orange,
          .wcu-particle-blue { animation: none !important; }
        }

        /* Tablet */
        @media (max-width: 1024px) and (min-width: 769px) {
          .wcu-bento {
            grid-template-areas:
              "c-design c-design"
              "c-tech   c-perf"
              "c-globe  c-globe"
              "c-contact c-contact"
              "c-longrun c-longrun" !important;
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .wcu-bento {
            grid-template-areas:
              "c-design"
              "c-tech"
              "c-perf"
              "c-globe"
              "c-contact"
              "c-longrun" !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
        }
      `}</style>

      <div className="section-container" style={{ maxWidth: 1200 }}>

        {/* ── Section heading ── */}
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: EO }}
          style={{ maxWidth: 580, marginBottom: sp(10) }}
        >
          <p style={{
            margin:        `0 0 ${sp(3)}`,
            fontSize:      TX.xs,
            fontWeight:    600,
            color:         'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily:    FONT_H,
          }}>
            Why choose us
          </p>

          <h2 style={{
            margin:        0,
            fontSize:      TX['2xl'],
            fontWeight:    700,
            color:         'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight:    1.07,
            fontFamily:    FONT_H,
          }}>
            Built different.{' '}
            <br />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
              Delivered right.
            </span>
          </h2>
        </m.div>

        {/* ── Bento grid ── */}
        <div
          className="wcu-bento"
          style={{
            display:             'grid',
            gridTemplateAreas:   `
              "c-design  c-design  c-globe"
              "c-tech    c-perf    c-globe"
              "c-contact c-contact c-longrun"
            `,
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows:    'minmax(264px,auto) minmax(264px,auto) minmax(216px,auto)',
            gap:                 sp(3),
            isolation:           'isolate',
          }}
        >
          <CardDesign  />
          <CardTech    />
          <CardPerf    />
          <CardGlobe   />
          <CardContact />
          <CardLongRun />
        </div>
      </div>
    </section>
  );
}