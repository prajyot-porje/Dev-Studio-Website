'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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

export default function ProcessSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="process"
      ref={ref}
      style={{
        background: 'var(--bg-primary)',
        position: 'relative',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}
          >
            Our Process
          </p>
          <h2 className="section-heading">
            How we work
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
          className="process-grid"
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${350 + i * 120}ms`,
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-blue-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: 'var(--accent-blue)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {step.number}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '12px',
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </p>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="process-connector"
                  style={{
                    position: 'absolute',
                    top: '24px',
                    left: 'calc(48px + 16px)',
                    right: '-16px',
                    height: '1px',
                    background: 'var(--border-color)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .process-connector {
            display: none !important;
          }
          .spline-wrapper {
            height: 400px !important;
          }
        }
        @media (max-width: 540px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
