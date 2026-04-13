'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* ═══════════════════════════════════════════════════════════════
   PROCESS STEPS DATA
   ═══════════════════════════════════════════════════════════════ */
const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We learn about your business, your goals, and what you need built. A quick call or a few messages — no lengthy forms.',
  },
  {
    number: '02',
    title: 'Proposal',
    description:
      'You get a clear scope, timeline, and fixed price within 48 hours. No vague estimates, no hidden costs.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We get to work. Weekly updates keep you in the loop without interrupting your day.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'Your project is delivered, deployed, and ready. We stay available for questions and offer ongoing support if needed.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ProcessSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="process"
      ref={ref}
      className="process-section"
    >
      <div className="process-container">
        {/* ── Header ── */}
        <div
          className="process-header"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="process-eyebrow">How It Works</p>
          <h2 className="process-headline">
            From idea
            <br />
            <span className="process-headline__thin">to launch.</span>
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div className="process-timeline">
          {/* Animated connecting line */}
          <div className="process-line-track">
            <div
              className="process-line-fill"
              style={{
                transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="process-step"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${350 + i * 150}ms`,
              }}
            >
              {/* Step number — left side */}
              <div className="process-step__number-col">
                <span className="process-step__number">{step.number}</span>
                {/* Glow dot on timeline */}
                <div className="process-step__dot">
                  <div
                    className="process-step__dot-pulse"
                    style={{
                      animationDelay: `${i * 200}ms`,
                    }}
                  />
                </div>
              </div>

              {/* Content — right side */}
              <div 
                className="process-step__content"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                }}
              >
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Scoped Styles ═══ */}
      <style jsx>{`
        .process-section {
          position: relative;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .process-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: var(--section-padding) var(--container-padding);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(48px, 6vw, 96px);
          align-items: start;
        }

        /* ── Header (left column) ── */
        .process-header {
          position: sticky;
          top: 30vh;
        }

        .process-eyebrow {
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 16px;
        }

        .process-headline {
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin: 0;
        }

        .process-headline__thin {
          font-weight: 500;
          color: var(--text-secondary);
        }

        /* ── Timeline (right column) ── */
        .process-timeline {
          position: relative;
          padding-left: 48px;
        }

        /* Connecting line track */
        .process-line-track {
          position: absolute;
          left: 17px;
          top: 12px;
          bottom: 12px;
          width: 2px;
          background: var(--border-color);
          border-radius: 1px;
          overflow: hidden;
        }

        .process-line-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, var(--accent-blue) 0%, rgba(108, 99, 255, 0.6) 50%, var(--accent-blue) 100%);
          background-size: 100% 200%;
          transform-origin: top center;
          border-radius: 1px;
          animation: processLineShimmer 4s ease infinite;
        }

        @keyframes processLineShimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }

        /* ── Individual step ── */
        .process-step {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          padding-bottom: clamp(48px, 6vh, 72px);
          position: relative;
        }

        .process-step:last-child {
          padding-bottom: 0;
        }

        /* Number column */
        .process-step__number-col {
          position: relative;
          flex-shrink: 0;
          width: 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .process-step__number {
          position: absolute;
          right: calc(100% + 32px);
          top: -4px;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: linear-gradient(135deg, var(--accent-blue) 0%, #6C63FF 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          opacity: 0.18;
          user-select: none;
        }

        /* Dot on timeline */
        .process-step__dot {
          position: absolute;
          left: -31px;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 4px var(--bg-primary), 0 0 12px var(--accent-blue-glow);
          z-index: 2;
        }

        .process-step__dot-pulse {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--accent-blue);
          animation: dotPulse 2.5s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        /* Content */
        .process-step__content {
          flex: 1;
          padding-top: 2px;
        }

        .process-step__title {
          font-size: clamp(1.15rem, 1.8vw, 1.4rem);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          margin: 0 0 10px;
          line-height: 1.2;
        }

        .process-step__description {
          font-size: clamp(0.85rem, 1vw, 0.95rem);
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
          max-width: 380px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .process-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .process-header {
            position: relative;
            top: auto;
          }

          .process-headline {
            font-size: clamp(2rem, 8vw, 3rem);
          }
        }

        @media (max-width: 540px) {
          .process-step__number {
            font-size: 2rem;
            right: calc(100% + 24px);
          }

          .process-timeline {
            padding-left: 40px;
          }

          .process-step {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
