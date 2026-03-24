'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    company: 'FINOVA',
    quote:
      'Dev Studio transformed our digital banking experience. Their attention to detail and understanding of fintech UX is unmatched. The platform they built increased our user engagement by 340%.',
    author: 'Sarah Chen',
    role: 'CPO, Finova Banking',
  },
  {
    company: 'MERIDIAN',
    quote:
      'Working with Dev Studio felt like having an extension of our own team. They delivered a healthcare platform that met every compliance requirement while still feeling incredibly modern and intuitive.',
    author: 'Dr. James Mitchell',
    role: 'CTO, Meridian Health',
  },
  {
    company: 'LUMIÈRE',
    quote:
      'The brand identity Dev Studio created for us perfectly captures our vision. Every touchpoint, from the logo to the website, exudes the luxury and sophistication we wanted. Absolutely world-class work.',
    author: 'Isabelle Moreau',
    role: 'Founder, Lumière Studio',
  },
  {
    company: 'NOVATECH',
    quote:
      'Our SaaS platform needed to handle enterprise-scale complexity while remaining simple. Dev Studio nailed it. Our customer satisfaction scores jumped to 96% post-launch.',
    author: 'Alex Rivera',
    role: 'CEO, NovaTech',
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const CARD_DURATION = 8; // seconds
  const LOOP_WAIT = 15; // seconds

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
    <motion.section
      id="testimonials"
      className="testimonials-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8, once: true }}
      onViewportEnter={() => setActiveIndex(0)}
      style={{
        background: 'var(--bg-secondary)', // Reverted to original dark background in dark mode, matches About Us in light mode
        position: 'sticky',
        top: 0,
        zIndex: 2,
        minHeight: '100vh',
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
        <motion.div
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
                   <motion.div
                     initial={{ width: '0%' }}
                     animate={{ width: '100%' }}
                     transition={{
                       duration: i === testimonials.length - 1 ? LOOP_WAIT : CARD_DURATION,
                       ease: 'linear'
                     }}
                     style={{
                       position: 'absolute',
                       top: 0,
                       left: 0,
                       height: '100%',
                       background: 'var(--text-primary)',
                     }}
                   />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right side — stacking cards */}
        <motion.div
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
              <motion.div
                key={i}
                onClick={() => {
                  if (isAhead) setActiveIndex(i);
                }}
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  visible: {
                    opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : isBehind ? 0.4 : 0.7,
                    y: isActive ? 0 : isBehind ? offset * 12 : offset * 16,
                    scale: isActive ? 1 : isBehind ? 1 + offset * 0.02 : 1 - offset * 0.03,
                    transition: { duration: 0.8, ease: "easeOut" }
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
                  padding: '48px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: isAhead ? 'pointer' : 'default',
                  zIndex: testimonials.length - Math.abs(offset),
                  filter: isActive ? 'none' : `blur(${Math.abs(offset) * 0.5}px)`,
                  pointerEvents: isActive || isAhead ? 'auto' : 'none',
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
                      fontSize: 'var(--text-lg)',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      color: isActive || isBehind
                        ? 'var(--bg-primary)'
                        : 'var(--text-primary)',
                      marginTop: '32px',
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div style={{ marginTop: '32px' }}>
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .testimonials-section {
            position: relative !important;
            padding: var(--section-padding) 0;
            min-height: auto !important;
          }

          .section-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .testimonials-right {
            height: 380px !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
