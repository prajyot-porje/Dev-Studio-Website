'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function CtaBannerSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '80px 40px',
            borderRadius: 'var(--radius-2xl)',
            background: 'var(--bg-tertiary)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--container-shadow)',
          }}
        >
          {/* Accent glow */}
          <div
            style={{
              position: 'absolute',
              top: '-80px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '200px',
              borderRadius: '50%',
              background: 'var(--accent-blue-glow)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                marginBottom: '16px',
              }}
            >
              Got a project in mind?
            </h2>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                marginBottom: '36px',
                lineHeight: 1.6,
              }}
            >
              Let&apos;s build something great together.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a href="#contact" className="btn-primary">
                Start a Project
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
              </a>
              <a href="#work" className="btn-secondary">
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
