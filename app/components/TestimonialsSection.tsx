'use client';

import { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';

const testimonials = [
  {
    company: 'CRESULTS CONSULTING',
    quote:
      "Our WordPress sites were a mess until Dev Studio came in and cleaned everything up fast. SEO improved noticeably within months, and our LinkedIn presence finally looked professional. They just handle things without needing to be managed.",
    author: 'Rafi Maslaton',
    role: 'CEO, Cresults Consulting',
  },
  {
    company: 'CRESULTS CONSULTING',
    quote:
      "What I appreciated most was not having to explain things twice. WordPress issues got resolved without back-and-forth, SEO was consistent, and our LinkedIn content actually reflected our brand. Reliable, detail-oriented, and easy to work with.",
    author: 'Pratik',
    role: 'Director, Cresults Consulting',
  },
  {
    company: 'NAMRL',
    quote:
      "We needed a website that could represent a serious medical research platform — not a generic template. Dev Studio delivered something clean, professional, and fast. The whole process was smooth and the final product exceeded what we had in mind.",
    author: 'Abhijeet',
    role: 'CEO, NAMRL',
  },
  {
    company: 'KIYOMI FACILITIES',
    quote:
      "We wanted a landing page that felt premium without overcomplicating it. Dev Studio understood the brief immediately. The site launched on time, looked sharp, and our clients noticed. Would work with them again without hesitation.",
    author: 'CEO',
    role: 'Kiyomi Facilities',
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const CARD_DURATION = 8; // seconds
  const LOOP_WAIT = 15; // seconds
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (activeIndex === testimonials.length - 1) {
      timer = setTimeout(() => {
        setActiveIndex(0);
      }, LOOP_WAIT * 1000);
    } else {
      timer = setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
      }, CARD_DURATION * 1000);
    }

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <>
      <m.section
        id="testimonials"
        className="testimonials-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8, once: true }}
        onViewportEnter={() => setActiveIndex(0)}
        style={{
          background: 'var(--bg-secondary)', // Reverted to original dark background in dark mode, matches About Us in light mode
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          zIndex: 2,
          height: isMobile ? 'auto' : '100vh',
          padding: isMobile ? 'var(--section-padding) 0' : 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="section-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Left side */}
          <m.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="testimonials-left"
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
              Testimonials
            </p>
            <h2
              className="section-heading"
              style={{ marginBottom: '20px' }}
            >
              What our
              <br />
              customers think
            </h2>
            <p className="section-subtext" style={{ marginBottom: '48px' }}>
              We partner with ambitious brands to create digital experiences
              that drive real results. Here&apos;s what they have to say.
            </p>

            {/* Timeline */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                width: '100%',
                maxWidth: '320px',
              }}
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'var(--border-color)',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: 0,
                  }}
                >
                  {/* Filled portion for passed testimonials */}
                  {i < activeIndex && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'var(--text-primary)',
                      }}
                    />
                  )}
                  {/* Progress animation for current testimonial */}
                  {i === activeIndex && (
                    <m.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: i === testimonials.length - 1 ? LOOP_WAIT : CARD_DURATION,
                        ease: 'linear'
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        background: 'var(--text-primary)',
                        transformOrigin: 'left',
                        willChange: 'transform'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </m.div>

          {/* Right side — stacking cards */}
          <m.div
            style={{
              position: 'relative',
              height: '420px',
            }}
            className="testimonials-right"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
          >
            {testimonials.map((testimonial, i) => {
              const offset = i - activeIndex;
              const isActive = i === activeIndex;
              const isBehind = i < activeIndex;
              const isAhead = i > activeIndex;

              return (
                <m.div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onClick={() => {
                    if (isAhead) setActiveIndex(i);
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 80 },
                    visible: {
                      opacity: isActive ? 1 : isBehind ? 0.4 : 0.7 - (Math.abs(offset) * 0.15),
                      y: isActive ? 0 : isBehind ? offset * 12 : offset * 16,
                      scale: isActive ? 1 : isBehind ? 1 + offset * 0.02 : 1 - offset * 0.03,
                      transition: { duration: 0.8, ease: "easeOut" }
                    }
                  }}
                  onAnimationComplete={() => {
                    if (cardRefs.current[i]) {
                      cardRefs.current[i]!.style.willChange = 'auto';
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    borderRadius: 'var(--radius-xl)',
                    background: isActive
                      ? 'var(--text-primary)'
                      : isBehind
                        ? 'var(--text-primary)'
                        : 'var(--card-bg)',
                    border: isAhead
                      ? '1px solid var(--card-border)'
                      : 'none',
                    padding: isMobile ? '32px 24px' : '48px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: isAhead ? 'pointer' : 'default',
                    /* // PERF: replaced animated blur with opacity+scale — eliminates paint-storm on scroll */
                    zIndex: testimonials.length - Math.abs(offset),
                    pointerEvents: isActive || isAhead ? 'auto' : 'none',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 700,
                        color: isActive || isBehind
                          ? 'var(--bg-primary)'
                          : 'var(--text-primary)',
                        letterSpacing: '0.08em',
                        opacity: 0.7,
                      }}
                    >
                      {testimonial.company}
                    </span>
                    <p
                      style={{
                        fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                        color: isActive || isBehind
                          ? 'var(--bg-primary)'
                          : 'var(--text-primary)',
                        marginTop: isMobile ? '20px' : '32px',
                        opacity: isActive ? 1 : 0.6,
                      }}
                    >
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div style={{ marginTop: isMobile ? '24px' : '32px' }}>
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 600,
                        color: isActive || isBehind
                          ? 'var(--bg-primary)'
                          : 'var(--text-primary)',
                      }}
                    >
                      {testimonial.author}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: isActive || isBehind
                          ? 'var(--bg-primary)'
                          : 'var(--text-secondary)',
                        opacity: 0.7,
                        marginTop: '4px',
                      }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .testimonials-section {
              /* Inline styles now handle position and height to prevent override conflicts */
            }

            .testimonials-scroll-spacer {
              display: none !important;
            }

            .section-container {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
            .testimonials-right {
              height: 480px !important;
            }
          }
        `}</style>
      </m.section>
      {!isMobile && (
        <div
          aria-hidden="true"
          className="testimonials-scroll-spacer"
          style={{ height: '60vh', pointerEvents: 'none' }}
        />
      )}
    </>
  );
}
