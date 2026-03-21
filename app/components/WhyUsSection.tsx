'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Zap, Globe, Users, TrendingUp } from 'lucide-react';

const differentiators = [
  {
    icon: <Zap className="w-7 h-7" strokeWidth={1.5} />,
    title: 'Built fast, built right',
    description: 'We use AI-assisted tools to deliver in weeks, not months — without cutting corners on code quality.',
    gradient: 'from-[#0052FF]/20 to-transparent',
    iconColor: 'text-[#0052FF]',
  },
  {
    icon: <Globe className="w-7 h-7" strokeWidth={1.5} />,
    title: 'International from day one',
    description: 'We established global operations from the start. Remote-first, timezone-flexible, perfectly synced.',
    gradient: 'from-[#8B5CF6]/20 to-transparent',
    iconColor: 'text-[#8B5CF6]',
  },
  {
    icon: <Users className="w-7 h-7" strokeWidth={1.5} />,
    title: 'One contact. Full delivery.',
    description: 'No handoffs. No middlemen. The person you talk to is the person actively building your product.',
    gradient: 'from-[#EC4899]/20 to-transparent',
    iconColor: 'text-[#EC4899]',
  },
  {
    icon: <TrendingUp className="w-7 h-7" strokeWidth={1.5} />,
    title: 'Built to grow with you',
    description: 'We value long-term partnerships over one-time projects. Your scaling success is our success.',
    gradient: 'from-[#10B981]/20 to-transparent',
    iconColor: 'text-[#10B981]',
  },
];

export default function WhyUsSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="why-us"
      ref={ref}
      style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        padding: '120px 0',
        overflow: 'hidden',
      }}
    >
      {/* Background glow perfectly centered */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, var(--border-color) 0%, transparent 60%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <div className="section-container relative z-10">
        
        {/* Perfectly Balanced Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 80px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div 
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            The Dev Studio Advantage
          </div>
          
          <h2 
            style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: '24px'
            }}
          >
            Why choose{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-tertiary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Dev Studio?
            </span>
          </h2>
          
          <p 
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            We combine the sheer speed of AI tools with the precision of senior engineering to deliver flawless software that scales.
          </p>
        </div>

        {/* Symmetrical 2x2 Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className="glass-card group relative overflow-hidden"
              style={{
                padding: '48px 40px',
                cursor: 'default',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${150 + i * 100}ms`,
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Dynamic hover gradient for premium feel */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />

              {/* Icon Container */}
              <div 
                className="mb-8 p-4 inline-flex rounded-2xl bg-[var(--bg-primary)] shadow-sm border border-[var(--border-subtle)] relative"
              >
                <div className={item.iconColor}>
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

