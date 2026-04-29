'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { RippleElement } from '@/components/ui/ripple-element';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const stats = [
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: 'h', label: 'Support Response' },
  { value: 3, suffix: ' weeks', label: 'Avg delivery' },
  { value: 100, suffix: '%', label: 'On-time rate' },
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════════════════════════ */
function useCountUp(target: number, isActive: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isActive, target, duration]);

  return count;
}

/* ═══════════════════════════════════════════════════════════════
   STAT COUNTER COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function StatCounter({ value, suffix, label, isVisible, delay }: {
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const count = useCountUp(value, isVisible);
  
  return (
    <div
      className="about-stat"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div className="about-stat__value">
        {count}{suffix}
      </div>
      <div className="about-stat__label">
        {label}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function AboutSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.12 });

  return (
    <section
      id="about"
      ref={ref}
      className="about-section"
    >
      {/* Dot-grid texture */}
      <div className="about-texture" aria-hidden />

      <div className="about-container">
        {/* ── Eyebrow + Headline ── */}
        <div
          className="about-header"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="about-eyebrow">Who We Are</p>
          <h2 className="about-headline">
            A development studio
            <br />
            <span className="about-headline__light">that moves at your speed.</span>
          </h2>
        </div>

        {/* ── Two-Column Editorial ── */}
        <div className="about-editorial">
          <div
            className="about-editorial__left"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
            }}
          >
            <p className="about-mission">
              We build fast, modern websites, integrate AI into products, and help growing businesses stay visible online.
            </p>
          </div>
          <div
            className="about-editorial__right"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.22s',
            }}
          >
            <p className="about-description">
              Dev Studio is a web development and digital presence agency based in Pune, India — working with clients across the US, India, and beyond. We work with startup founders who need a technical partner that ships fast, and business owners who need a professional online presence without the cost of a large agency.
            </p>
          </div>
        </div>

        {/* ── Thin Divider ── */}
        <div
          className="about-divider"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        />

        {/* ── Stats Row ── */}
        <div className="about-stats">
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
              delay={400 + i * 100}
            />
          ))}
        </div>

        {/* ── Pull Quote + CTA ── */}
        <div
          className="about-closing"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          }}
        >
          <p className="about-pullquote">
            No bloated teams. No unnecessary meetings.<br />
            Just clean work, direct communication,<br />
            and delivery you can depend on.
          </p>
          <div className="about-cta-row">
            <span className="about-location">Based in Pune · Working globally</span>
            <RippleElement as="a" href="#contact" className="btn-primary">
              Work With Us
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </RippleElement>
          </div>
        </div>
      </div>

      {/* ═══ Scoped Styles ═══ */}
      <style jsx>{`
        .about-section {
          position: relative;
          background: var(--bg-secondary);
          overflow: hidden;
        }

        /* ── Dot-grid texture ── */
        .about-texture {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, var(--border-color) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.5;
          mask-image: radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%);
        }

        .about-container {
          position: relative;
          z-index: 1;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: var(--section-padding) var(--container-padding);
        }

        /* ── Header ── */
        .about-header {
          margin-bottom: clamp(48px, 6vh, 72px);
        }

        .about-eyebrow {
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 16px;
        }

        .about-headline {
          font-size: clamp(2.2rem, 5vw, 3.75rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.035em;
          line-height: 1.08;
          margin: 0;
        }

        .about-headline__light {
          font-weight: 400;
          color: var(--text-secondary);
        }

        /* ── Editorial two-column ── */
        .about-editorial {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 4vw, 64px);
          margin-bottom: clamp(48px, 6vh, 64px);
        }

        .about-mission {
          font-size: clamp(1.25rem, 2.5vw, 1.65rem);
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          line-height: 1.45;
          margin: 0;
        }

        .about-description {
          font-size: clamp(0.9rem, 1.1vw, 1rem);
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 0;
        }

        /* ── Divider ── */
        .about-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--border-color) 15%, var(--border-color) 85%, transparent 100%);
          margin-bottom: clamp(40px, 5vh, 56px);
          transform-origin: left center;
        }

        /* ── Stats ── */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-bottom: clamp(56px, 7vh, 80px);
        }

        .about-stat {
          text-align: center;
          padding: 0 16px;
          position: relative;
        }

        /* Vertical dividers between stats */
        .about-stat:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background: var(--border-color);
        }

        .about-stat__value {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }

        .about-stat__label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Closing ── */
        .about-closing {
          text-align: center;
        }

        .about-pullquote {
          font-size: clamp(1.15rem, 2vw, 1.5rem);
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.65;
          letter-spacing: -0.015em;
          margin: 0 auto 32px;
          max-width: 560px;
          font-style: italic;
          opacity: 0.85;
        }

        .about-cta-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .about-location {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .about-editorial {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .about-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 0;
          }

          .about-stat:nth-child(2)::after {
            display: none;
          }

          .about-stat:nth-child(1)::after,
          .about-stat:nth-child(3)::after {
            height: 80%;
          }

          .about-headline {
            font-size: clamp(1.75rem, 7vw, 2.5rem);
          }

          .about-pullquote br {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
