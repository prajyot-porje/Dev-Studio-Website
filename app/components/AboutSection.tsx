'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const stats = [
  { value: '3', label: 'Clients' },
  { value: '2', label: 'Countries' },
  { value: '6 weeks', label: 'Avg delivery' },
  { value: '100%', label: 'On-time rate' },
];

export default function AboutSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'var(--bg-secondary)',
        position: 'relative',
      }}
    >
      <div className="section-container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div
          style={{
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
            About Us
          </p>
          <h2 className="section-heading" style={{ marginBottom: '40px' }}>
            A development studio that
            <br />
            moves at your speed.
          </h2>
        </div>

        {/* Paragraphs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '56px',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Dev Studio is a web development and digital presence agency
            based in Pune, India — working with clients across the US,
            India, and beyond. We build fast, modern websites, integrate
            AI into products, and help growing businesses stay visible
            online.
          </p>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            We work with two kinds of people: startup founders who need
            a technical partner that ships without slowing them down, and
            business owners — clinics, consultants, service companies —
            who need a professional online presence without the cost of
            a large agency.
          </p>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--text-primary)',
              lineHeight: 1.8,
              fontWeight: 500,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            No bloated teams. No unnecessary meetings. Just clean work,
            direct communication, and delivery you can depend on.
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            padding: '40px 0',
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '48px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
          className="about-stats-grid"
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-tertiary)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Closing line + CTA */}
        <div
          style={{
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              marginBottom: '24px',
            }}
          >
            Based in Pune. Working globally.
          </p>
          <a href="#contact" className="btn-primary">
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
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
