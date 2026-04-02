'use client';

import { useState, useEffect } from 'react';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { RippleElement } from '@/components/ui/ripple-element';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {

  const [expanded, setExpanded] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Trigger expansion after mount
    const expandTimer = setTimeout(() => setExpanded(true), 300);
    // Trigger links after expansion
    const linksTimer = setTimeout(() => setLinksVisible(true), 1100);
    // Trigger CTA after links
    const ctaTimer = setTimeout(() => setCtaVisible(true), 1400);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(linksTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setScrolled((current) => {
          const next = scrollY > 20;
          return current === next ? current : next;
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        borderRadius: 'var(--radius-full)',
        transition: `max-width 0.7s ease-out, 
                     padding 0.7s ease-out,
                     box-shadow 0.3s ease`,
        maxWidth: expanded ? '1400px' : '140px',
        width: '80vw',
        padding: expanded ? '0 12px 0 24px' : '0 20px',
        overflow: 'hidden',
      }}
      className={`glass-navbar backdrop-blur-2xl bg-white/60 dark:bg-black/60 border border-white/10 dark:border-white/5 ${
        scrolled
          ? 'shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : ''
      }`}
    >
      {/* Left Column: Logo */}
      <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-start' }}>
        <a
          href="#"
          style={{
            fontWeight: 600,
            fontSize: 'var(--text-lg)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
            flexShrink: 0,
            transition: 'color 0.3s ease',
          }}
        >
          Dev Studio
        </a>
      </div>

      {/* Center Column: Nav Links perfectly centered */}
      <div
        className="hidden md:flex"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'center',
          flex: '1 1 auto',
        }}
      >
        {navLinks.map((link, i) => (
          <RippleElement
            as="a"
            key={link.label}
            href={link.href}
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              transition: 'all 0.3s ease',
              opacity: linksVisible ? 1 : 0,
              transform: linksVisible ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: `${i * 70}ms`,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.background = 'var(--border-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {link.label}
          </RippleElement>
        ))}
      </div>

      {/* Right Column: Toggle + CTA Button */}
      <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
        {/* Theme Toggle */}
        <AnimatedThemeToggler
          className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            opacity: linksVisible ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        />

        {/* CTA Button */}
        <RippleElement
          as="a"
          href="#contact"
          className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          style={{
            background: 'var(--cta-bg)',
            color: 'var(--cta-text)',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            opacity: ctaVisible ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--cta-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--cta-bg)';
          }}
        >
          Get in Touch
        </RippleElement>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .glass-navbar {
            /* // PERF: removes backdrop-filter on mobile fixed navbar — biggest mobile scroll win */
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: rgba(13,13,13,0.92) !important;
          }
        }
      `}</style>
    </nav>
  );
}
