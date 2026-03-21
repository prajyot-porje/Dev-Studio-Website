'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const projects = [
  {
    client: 'NAMRL',
    fullName: 'North American Medical Research & Learning Center',
    industry: 'Clinical Research & Training',
    region: 'US Client',
    period: 'Jun – Jul 2025',
    oneLiner: 'High-performance website for a global medical research and training platform.',
    description:
      'Built a component-driven frontend for a US-based clinical research training platform — with Framer Motion animations, accessibility improvements, and full deployment on cPanel for a fast, global-ready experience.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
    link: 'https://namrl.com',
    color: '#0f3460',
    accent: '#16c79a',
  },
  {
    client: 'Kiyomi Facilities',
    fullName: 'Kiyomi Facilities',
    industry: 'Industrial & Residential Facility Management',
    region: 'India Client',
    period: 'Aug – Sep 2025',
    oneLiner: 'Scalable, fully responsive website for a B2B facility management company.',
    description:
      'Designed and built a reusable component architecture for a facility management company serving both industrial and residential clients — fully responsive, cross-browser compatible, and production deployed.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
    link: 'https://kiyomifacilities.in',
    color: '#1a1a2e',
    accent: '#e94560',
  },
  {
    client: 'Cresults Consulting',
    fullName: 'Cresults Consulting',
    industry: 'Quality Consulting',
    region: 'US Client',
    period: 'Ongoing',
    status: 'Active Retainer since Jan 2026',
    oneLiner: 'Managing 4 WordPress sites and full LinkedIn presence for a US quality consulting firm.',
    description:
      'Monthly retainer covering WordPress maintenance across 4 properties, SEO fixes, content updates, LinkedIn post design, and LinkedIn ad campaign management — all ongoing.',
    sites: ['cresultsconsulting.com', 'smart-qc.com', 'smart-qa.com', 'fdaaware.com'],
    stack: ['WordPress', 'LinkedIn Ads', 'SEO', 'Content Management'],
    color: '#2d1b69',
    accent: '#b388ff',
  },
];

export default function WorkSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="work"
      ref={ref}
      style={{
        background: 'var(--bg-primary)',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '64px',
            flexWrap: 'wrap',
            gap: '20px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div>
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
              Selected Work
            </p>
            <h2 className="section-heading">
              Real projects. Real clients.
              <br />
              Real results.
            </h2>
          </div>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.client}
              className="glass-card"
              style={{
                overflow: 'hidden',
                cursor: 'default',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${200 + i * 120}ms`,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              {/* Left — Project image area */}
              <div
                style={{
                  width: '100%',
                  minHeight: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="project-preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${project.color} 0%, ${project.accent}33 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    style={{
                      width: '60%',
                      height: '60%',
                      borderRadius: 'var(--radius-lg)',
                      border: `1px solid ${project.accent}44`,
                      background: `${project.accent}11`,
                      backdropFilter: 'blur(20px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 700,
                        color: project.accent,
                        letterSpacing: '-0.03em',
                        opacity: 0.9,
                      }}
                    >
                      {project.client.split(' ')[0]}
                    </span>
                    {project.link && (
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: project.accent,
                          opacity: 0.6,
                        }}
                      >
                        {project.link.replace('https://', '')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right — Project details */}
              <div
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {/* Client + badge row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '4px',
                    flexWrap: 'wrap',
                  }}
                >
                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {project.client}
                  </h3>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {project.region}
                  </span>
                  {project.status && (
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: '#34c759',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(52, 199, 89, 0.3)',
                        background: 'rgba(52, 199, 89, 0.08)',
                        whiteSpace: 'nowrap',
                        fontWeight: 500,
                      }}
                    >
                      ● {project.status}
                    </span>
                  )}
                </div>

                {/* Industry and period */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {project.industry}
                  </span>
                  <span style={{ color: 'var(--border-color)' }}>·</span>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {project.period}
                  </span>
                </div>

                {/* One-liner */}
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                    marginBottom: '12px',
                  }}
                >
                  {project.oneLiner}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {project.description}
                </p>

                {/* Sites list (Cresults only) */}
                {project.sites && (
                  <div style={{ marginBottom: '16px' }}>
                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        marginBottom: '6px',
                        fontWeight: 500,
                      }}
                    >
                      Sites managed:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {project.sites.map((site) => (
                        <span
                          key={site}
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--accent-blue)',
                            padding: '2px 10px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--accent-blue-subtle)',
                          }}
                        >
                          {site}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech stack tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-color)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--accent-blue)',
                      textDecoration: 'none',
                      marginTop: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.7';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    Visit site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '48px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-tertiary)',
              fontWeight: 500,
            }}
          >
            All projects delivered on time · 2 international clients · 1 active US retainer
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .glass-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
