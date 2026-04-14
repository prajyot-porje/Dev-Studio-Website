'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/components/ThemeProvider';
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
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const expandTimer = setTimeout(() => setExpanded(true), 300);
    const linksTimer = setTimeout(() => setLinksVisible(true), 1100);
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

  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: isMobile ? '12px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isMobile ? '50px' : '56px',
          borderRadius: 'var(--radius-full)',
          transition: `max-width 0.7s ease-out, 
                       padding 0.7s ease-out,
                       box-shadow 0.3s ease`,
          maxWidth: expanded ? '1400px' : '140px',
          width: isMobile ? '92vw' : '80vw',
          padding: expanded
            ? isMobile ? '0 10px 0 18px' : '0 12px 0 24px'
            : '0 20px',
          overflow: 'visible',
        }}
        className={`glass-navbar backdrop-blur-2xl bg-white/60 dark:bg-black/60 border border-white/10 dark:border-white/5 ${
          scrolled || isMenuOpen
            ? 'shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : ''
        }`}
      >
        {/* Logo */}
        <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-start' }}>
          <a
            href="#"
            style={{
              fontWeight: 600,
              fontSize: isMobile ? '1rem' : 'var(--text-lg)',
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

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div
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
        )}

        {/* Right Column */}
        <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
          {/* Theme Toggle — always visible */}
          <AnimatedThemeToggler
            className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
            style={{
              width: isMobile ? '32px' : '36px',
              height: isMobile ? '32px' : '36px',
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

          {/* CTA Button — Desktop only */}
          {!isMobile && (
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
                display: 'flex',
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
          )}

          {/* Hamburger — Mobile only */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: isMenuOpen ? 'var(--border-color)' : 'transparent',
                color: isMenuOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                zIndex: 1001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <motion.div
                initial={false}
                animate={isMenuOpen ? 'open' : 'closed'}
                style={{ position: 'relative', width: '20px', height: '14px' }}
              >
                <motion.span
                  variants={{
                    closed: { top: '0px', rotate: 0 },
                    open: { top: '6px', rotate: 45 },
                  }}
                  style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'currentColor', borderRadius: '1px' }}
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1, top: '6px' },
                    open: { opacity: 0, top: '6px' },
                  }}
                  style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'currentColor', borderRadius: '1px' }}
                />
                <motion.span
                  variants={{
                    closed: { top: '12px', rotate: 0 },
                    open: { top: '6px', rotate: -45 },
                  }}
                  style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'currentColor', borderRadius: '1px' }}
                />
              </motion.div>
            </button>
          )}
        </div>
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .glass-navbar {
            backdrop-filter: blur(20px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          }
        }
      `}</style>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '80px 32px 40px',
              background: 'var(--bg-primary)',
            }}
            className="backdrop-blur-3xl"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '18px 20px',
                    borderRadius: '16px',
                    transition: 'background 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    letterSpacing: '-0.02em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--border-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                  <span style={{ opacity: 0.3, fontSize: '1.25rem' }}>→</span>
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}
              >
                <RippleElement
                  as="a"
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: 'var(--cta-bg)',
                    color: 'var(--cta-text)',
                    padding: '18px',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  }}
                >
                  Get in Touch
                </RippleElement>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
