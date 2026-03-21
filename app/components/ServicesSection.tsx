'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const services = [
  {
    number: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Web Development',
    description:
      'Fast, modern websites and web apps built with Next.js and TypeScript. From marketing sites to full-stack applications — clean code, production-ready, and delivered on time.',
    tags: ['Next.js', 'TypeScript', 'WordPress', 'Tailwind CSS', 'Framer Motion'],
    price: 'Starting from $999',
  },
  {
    number: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'AI Integrations & Automation',
    description:
      'Add intelligent features to your product or automate repetitive workflows — chatbots, document processing, API connections, and custom automation pipelines using modern AI tools.',
    tags: ['OpenAI API', 'Zapier', 'Make.com', 'Custom Automation'],
    price: 'Starting from $500',
  },
  {
    number: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Digital Presence Management',
    description:
      'Ongoing LinkedIn management, content updates, and website maintenance. Keep your digital presence consistent and professional — without hiring in-house.',
    tags: ['LinkedIn', 'Content', 'WordPress', 'SEO Fixes'],
    price: 'Starting from $300/month',
  },
];

export default function ServicesSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: 'var(--bg-secondary)',
        position: 'relative',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '64px',
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
            What We Do
          </p>
          <h2 className="section-heading" style={{ marginBottom: '20px' }}>
            Services built for businesses
            <br />
            that mean business.
          </h2>
        </div>

        {/* Service cards - vertical stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className="glass-card"
              style={{
                padding: '40px 36px',
                cursor: 'default',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${150 + i * 120}ms`,
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: '28px',
                alignItems: 'start',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-blue-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-blue)',
                  flexShrink: 0,
                }}
              >
                {service.icon}
              </div>

              {/* Content */}
              <div>
                {/* Number + Title */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {service.number}
                  </span>
                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                    maxWidth: '600px',
                  }}
                >
                  {service.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-color)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {service.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '56px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}
          >
            Not sure which service fits your need? Let&apos;s figure it out together.
          </p>
          <a href="#contact" className="btn-primary">
            Start a Conversation
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
    </section>
  );
}
