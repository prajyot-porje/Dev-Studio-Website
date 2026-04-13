'use client';

import { useRef, type CSSProperties } from 'react';
import { m, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Matching WhyChooseUs / WorkSection
   ═══════════════════════════════════════════════════════════════ */
const FONT = "'Poppins', system-ui, -apple-system, sans-serif";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════════════
   SERVICE DATA
   ═══════════════════════════════════════════════════════════════ */
const services = [
  {
    titleTop: 'SEO & AEO',
    titleBottom: 'Optimization',
    description: 'Data-driven search engine & AI optimisation, putting your business where buyers look.',
    image: '/magnifying-glass.png',
    imagePos: { bottom: '-2%', right: '-2%', width: '55%', height: '55%' },
    imageScale: 1.35,
    link: '#contact'
  },
  {
    titleTop: 'Premium web',
    titleBottom: 'development',
    description: 'Fast, modern websites built with Next.js and TypeScript. Clean, production-ready code.',
    image: '/macbook.png',
    imagePos: { bottom: '-5%', right: '-7%', width: '68%', height: '60%' },
    imageScale: 1.0,
    link: '#contact'
  },
  {
    titleTop: 'Intelligent AI',
    titleBottom: 'integrations',
    description: 'Automate workflows & scale effortlessly with custom LLM pipelines and smart agents.',
    image: '/robot.png',
    imagePos: { bottom: '0%', right: '0%', width: '55%', height: '55%' },
    imageScale: 1.0,
    link: '#contact'
  },
];

/* ═══════════════════════════════════════════════════════════════
   CARD INITIAL POSITIONS (stacked deck / fan)
   ═══════════════════════════════════════════════════════════════ */
interface CardPosition {
  x: string;
  y: string;
  rotate: string;
  zIndex: number;
}

const STACKED: CardPosition[] = [
  { x: '-6%', y: '12px', rotate: '-8deg', zIndex: 2 },  // Left (behind)
  { x: '0%', y: '0px', rotate: '0deg', zIndex: 3 },  // Center (top)
  { x: '6%', y: '12px', rotate: '8deg', zIndex: 1 },  // Right (behind)
];

const SPREAD: CardPosition[] = [
  { x: 'calc(-100% - 16px)', y: '0px', rotate: '0deg', zIndex: 2 },
  { x: '0%', y: '0px', rotate: '0deg', zIndex: 3 },
  { x: 'calc(100% + 16px)', y: '0px', rotate: '0deg', zIndex: 1 },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  /* Use useInView WITHOUT once: true so it re-triggers on scroll out/in */
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    margin: '-80px',
    amount: 0.4,
  });

  /* Cards spread when in view, re-stack when out of view */
  const hasSpread = inView;

  return (
    <section
      id="services"
      className="services-section"
      ref={sectionRef}
    >
      {/* ── Inline styles (scoped via JSX) ── */}
      <style jsx>{`
        .services-section {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .services-inner {
          width: 100%;
          max-width: var(--container-max);
          padding: 0 var(--container-padding);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(2.5rem, 5vh, 4rem);
        }

        /* ── Card arena ── */
        .services-cards-arena {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Height = card height + breathing room */
          height: clamp(300px, 38vh, 420px);
        }

        /* ── Individual card shell ── */
        .service-card-shell {
          position: absolute;
          width: min(370px, 33vw);
          height: clamp(340px, 40vh, 440px);
          border-radius: 36px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          cursor: default;
          transition:
            transform 800ms var(--ease-spring),
            box-shadow 400ms var(--ease-out);
          will-change: transform;
        }

        .service-card-shell:nth-child(1) { transition-delay: 60ms; }
        .service-card-shell:nth-child(2) { transition-delay: 0ms; }
        .service-card-shell:nth-child(3) { transition-delay: 120ms; }

        /* ── Outer Shell background — light mode ── */
        .service-card-shell {
          background: #ECEDEF;
          border: 1px solid rgba(0, 0, 0, 0.07);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.90),
            0 1px 2px  rgba(0, 0, 0, 0.04),
            0 4px 8px  rgba(0, 0, 0, 0.04),
            0 16px 32px rgba(0, 0, 0, 0.07),
            0 40px 72px rgba(0, 0, 0, 0.09),
            0 80px 120px rgba(0, 0, 0, 0.06);
        }

        /* ── Outer Shell background — dark mode ── */
        :global([data-theme="dark"]) .service-card-shell,
        :global(.dark) .service-card-shell {
          background: #121316;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 24px 64px rgba(0, 0, 0, 0.3);
        }

        /* ── Inner layer ── */
        .service-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(165deg, #ffffff 0%, #F7F8FA 60%, #F2F4F7 100%);
          border: 1px solid rgba(0, 0, 0, 0.055);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.04),
            0 1px 3px rgba(0, 0, 0, 0.04),
            0 4px 12px rgba(0, 0, 0, 0.04);
          transition: box-shadow 300ms var(--ease-out);
          overflow: hidden;
        }

        :global([data-theme="dark"]) .service-card-inner,
        :global(.dark) .service-card-inner {
          background: linear-gradient(165deg, #1a1c20 0%, #141518 20%, #101114 45%, #0c0d10 65%, #090a0c 85%, #060708 100%);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(0, 0, 0, 0.30),
            0 4px 8px rgba(0, 0, 0, 0.12),
            0 12px 28px rgba(0, 0, 0, 0.18),
            0 28px 56px rgba(0, 0, 0, 0.16),
            0 48px 80px rgba(0, 0, 0, 0.10);
        }

        /* ── Hover ── */
        .service-card-shell:hover .service-card-inner {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.04),
            0 8px 16px rgba(0, 0, 0, 0.06),
            0 16px 32px rgba(0, 0, 0, 0.06),
            0 32px 56px rgba(0, 0, 0, 0.06);
        }

        :global([data-theme="dark"]) .service-card-shell:hover .service-card-inner,
        :global(.dark) .service-card-shell:hover .service-card-inner {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(0, 0, 0, 0.30),
            0 8px 16px rgba(0, 0, 0, 0.20),
            0 16px 36px rgba(0, 0, 0, 0.24),
            0 36px 72px rgba(0, 0, 0, 0.20),
            0 64px 120px rgba(0, 0, 0, 0.15);
        }

        .service-image-wrapper {
          position: absolute;
          z-index: 1;
          pointer-events: none;
        }

        .service-image {
          object-fit: contain !important;
          object-position: center !important;
          filter: drop-shadow(0 35px 35px rgba(0,0,0,0.5)) drop-shadow(0 15px 15px rgba(0,0,0,0.3));
          transition: filter 0.4s var(--ease-out), transform 0.8s var(--ease-spring);
          will-change: transform, filter;
        }

        :global([data-theme="dark"]) .service-image,
        :global(.dark) .service-image {
          filter: drop-shadow(0 40px 40px rgba(0,0,0,0.95)) drop-shadow(0 20px 20px rgba(0,0,0,0.8));
        }

        .service-card-shell:hover .service-image {
          transform: scale(1.06) translateY(-4px);
        }
        
        .learn-more-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .learn-more-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--text-primary);
          color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
        }

        .service-card-shell:hover .learn-more-icon {
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        :global([data-theme="dark"]) .service-card-shell:hover .learn-more-icon,
        :global(.dark) .service-card-shell:hover .learn-more-icon {
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        .learn-more-text {
          font-size: 0.75rem;
          font-weight: 650;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        /* ── Mobile graceful degradation ── */
        @media (max-width: 768px) {
          .services-section {
            height: auto;
            min-height: 0;
            padding: var(--section-padding) 0;
          }

          .services-cards-arena {
            position: relative;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .service-card-shell {
            position: relative !important;
            width: 100% !important;
            max-width: 360px;
            height: auto !important;
            min-height: 240px;
            transform: none !important;
            opacity: 0;
            transition:
              opacity 700ms var(--ease-out),
              transform 700ms var(--ease-out) !important;
          }

          .service-card-shell.mobile-visible {
            opacity: 1;
            transform: translateY(0) !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .service-card-shell {
            width: min(320px, 30vw);
            height: clamp(300px, 36vh, 380px);
          }
        }
      `}</style>

      <div className="services-inner">
        {/* ═══ Heading Block ═══ */}
        <m.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.72, ease: EASE }}
          style={{
            textAlign: 'center',
            maxWidth: 560,
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontSize: '0.625rem',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: FONT,
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              fontFamily: FONT,
            }}
          >
            Our Expertise.
            <br />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
              Built for your business growth.
            </span>
          </h2>
        </m.div>

        {/* ═══ Cards Arena ═══ */}
        <div className="services-cards-arena">
          {services.map((service, i) => {
            const pos = hasSpread ? SPREAD[i] : STACKED[i];

            // Build transform string for desktop
            const desktopTransform = `translateX(${pos.x}) translateY(${pos.y}) rotate(${pos.rotate})`;

            return (
              <div
                key={service.titleTop}
                className={`service-card-shell${hasSpread ? ' mobile-visible' : ''}`}
                style={{
                  zIndex: pos.zIndex,
                  transform: desktopTransform,
                } as CSSProperties}
              >
                <div className="service-card-inner">
                  {/* Top highlight line */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 28,
                      right: 28,
                      height: 1,
                      background:
                        'linear-gradient(90deg, transparent 0%, var(--glass-highlight) 30%, var(--glass-highlight) 70%, transparent 100%)',
                      borderRadius: '0 0 4px 4px',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Text Content Layer */}
                  <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>

                    {/* Two-part Heading */}
                    <h3
                      style={{
                        margin: '0 0 16px',
                        fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        fontFamily: FONT,
                      }}
                    >
                      <span style={{ color: 'var(--text-primary)', display: 'block' }}>{service.titleTop}</span>
                      <span style={{ color: 'var(--text-tertiary)', display: 'block' }}>{service.titleBottom}</span>
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        margin: '0 0 32px',
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        fontFamily: FONT,
                        maxWidth: '90%',
                      }}
                    >
                      {service.description}
                    </p>

                    {/* Learn More Button */}
                    <a href={service.link} className="learn-more-btn" style={{ textDecoration: 'none' }}>
                      <div className="learn-more-icon">
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                      </div>
                      <span className="learn-more-text">
                        Learn More
                      </span>
                    </a>
                  </div>

                  {/* Large Icon Image Layer */}
                  <div className="service-image-wrapper" style={{
                    ...(service.imagePos || {}),
                    transform: `scale(${service.imageScale || 1})`
                  }}>
                    <Image
                      src={service.image}
                      alt={service.titleTop}
                      fill
                      className="service-image"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'contain', objectPosition: 'center' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
