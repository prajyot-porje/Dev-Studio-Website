'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Close menu on resize if switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        overflow: isMenuOpen ? 'visible' : 'hidden', // Conditional overflow
      }}
      className={`glass-navbar backdrop-blur-2xl bg-white/60 dark:bg-black/60 border border-white/10 dark:border-white/5 ${
        scrolled || isMenuOpen
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

      {/* Center Column: Nav Links perfectly centered (Desktop) */}
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

      {/* Right Column: Toggle + CTA Button + Hamburger */}
      <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
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

        {/* CTA Button (Desktop only) */}
        <RippleElement
          as="a"
          href="#contact"
          className="hidden md:flex transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
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
            alignItems: 'center',
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

        {/* Hamburger Menu Toggle (Mobile only) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center transition-all duration-300 active:scale-95"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: isMenuOpen ? 'var(--border-color)' : 'transparent',
            color: isMenuOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            zIndex: 1001,
          }}
        >
          <motion.div
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            className="flex flex-col gap-1.5 items-center justify-center h-full w-full"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 3.5 }, // Centered cross
              }}
              style={{ width: '20px', height: '2px', background: 'currentColor', borderRadius: '1px' }}
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              style={{ width: '20px', height: '2px', background: 'currentColor', borderRadius: '1px' }}
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -3.5 }, // Centered cross
              }}
              style={{ width: '20px', height: '2px', background: 'currentColor', borderRadius: '1px' }}
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Pop-over Capsule */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'absolute',
              top: '68px',
              left: '0',
              right: '0',
              padding: '16px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 999,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid var(--border-color)',
            }}
            className="glass-navbar backdrop-blur-2xl bg-white/80 dark:bg-black/80"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  transition: 'background 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--border-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.label}
                <span style={{ opacity: 0.5 }}>→</span>
              </motion.a>
            ))}
            
            <div style={{ marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <RippleElement
                as="a"
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: 'var(--cta-bg)',
                  color: 'var(--cta-text)',
                  padding: '14px 20px', // Corrected padding
                  borderRadius: '12px',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                Get in Touch
              </RippleElement>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .glass-navbar {
            /* // PERF: Keep backdrop-blur for mobile capsule but respect the original morphism */
            backdrop-filter: blur(20px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          }
        }
      `}</style>
    </nav>
  );
}
