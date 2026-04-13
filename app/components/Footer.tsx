'use client';

import { Linkedin, Instagram, Twitter } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'AI Integrations', href: '#services' },
    { label: 'Digital Presence', href: '#services' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Our Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  Connect: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/dev-studio-17/ ' },
    { label: 'Email Us', href: 'mailto:hello@devstudio.com' },
    { label: 'Instagram', href: 'https://www.instagram.com/the_dev.studio/' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Top section */}
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '80px var(--container-padding) 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '60px',
          alignItems: 'start',
        }}
        className="footer-top-grid"
      >
        {/* Left - tagline */}
        <div>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}
          >
            Based in Pune.
            <br />
            Working globally.
          </p>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            Web development, AI integrations, and
            <br />
            digital presence for growing businesses.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-6" style={{ color: 'var(--text-primary)' }}>
            <a href="https://www.linkedin.com/company/dev-studio-17/ " aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 hover:scale-110 transition-transform cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/the_dev.studio/" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:scale-110 transition-transform cursor-pointer" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:scale-110 transition-transform cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Right - link columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
          }}
        >
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: 'var(--text-sm)',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Giant brand text */}
      <div
        style={{
          maxWidth: '100%',
          overflow: 'hidden',
          padding: '20px var(--container-padding) 0',
        }}
      >
        <AnimatedText
          text="Dev Studio"
          className="w-full "
          textClassName="font-semibold tracking-wide"
          textStyle={{
            fontSize: 'var(--text-footer)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '24px var(--container-padding) 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
        }}
        className="footer-bottom-bar"
      >
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}
        >
          © {new Date().getFullYear()} Dev Studio. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-tertiary)';
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 60px 24px 30px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            gap: 16px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
