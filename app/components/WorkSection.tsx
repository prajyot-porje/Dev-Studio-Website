'use client';

import { type CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard, { type ProjectCardProps } from './ProjectCard';

const projects: ProjectCardProps[] = [
  {
    clientName: 'NAMRL',
    projectTitle: 'Clinical Learning Platform',
    description:
      'High-performance website for a North American medical research and training center, focused on clarity, accessibility, and a polished launch experience for global learners.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    outcomesHeading: 'Key Outcomes',
    outcomes: [
      'Shipped a component-driven marketing platform with smooth motion and a sharper information hierarchy.',
      'Improved accessibility and content discoverability for clinical training programs and career pathways.',
      'Delivered a launch-ready frontend with a fast production deployment pipeline.',
    ],
    metrics: [
      { label: 'FCP', value: '0.3s' },
      { label: 'SEO', value: '100/100' },
      { label: 'TBT', value: '0s' },
      { label: 'Learners', value: '10K+' },
    ],
    href: 'https://namrl.com',
    imageSrc: '/namrl.png',
  },
  {
    clientName: 'Kiyomi Facilities',
    projectTitle: 'Service-Led B2B Website',
    description:
      'Responsive corporate website for an industrial and residential facilities company, designed to present multiple service lines cleanly across desktop and mobile.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    outcomesHeading: 'Project Highlights',
    outcomes: [
      'Created a scalable content layout that speaks to both industrial and residential buyer journeys.',
      'Built reusable sections for service storytelling, trust signals, and lead-focused calls to action.',
      'Production deployment delivered with strong responsiveness across browsers and screen sizes.',
    ],
    metrics: [
      { label: 'Perf', value: '98/100' },
      { label: 'SEO', value: '100/100' },
      { label: 'LCP', value: '0.6s' },
      { label: 'Projects', value: '500+' },
    ],
    href: 'https://kiyomifacilities.in',
    imageSrc: '/kiyomi.png',
  },
  {
    clientName: 'Cresults Consulting',
    projectTitle: 'Retainer Web Operations',
    description:
      'Ongoing digital support for a US quality consulting firm, covering WordPress maintenance, SEO fixes, content updates, and LinkedIn campaign execution across multiple properties.',
    techStack: ['WordPress', 'SEO', 'LinkedIn Ads', 'Content Ops'],
    outcomesHeading: 'Key Outcomes',
    outcomes: [
      'Centralized monthly support across four sites without slowing down content or campaign execution.',
      'Handled recurring maintenance, SEO corrections, and marketing updates through a single retainer workflow.',
      'Extended the engagement into LinkedIn design and ad operations for consistent outbound visibility.',
    ],
    metrics: [
      { label: 'Sites', value: '4' },
      { label: 'Retainer', value: 'Active' },
      { label: 'SEO', value: 'Monthly' },
      { label: 'Channels', value: '2' },
    ],
    href: '#contact',
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackStyle = {
    '--work-card-count': projects.length,
  } as CSSProperties;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    /* // PERF: limitCallbacks reduces scroll event frequency, normalizeScroll smooths mobile */
    ScrollTrigger.config({ limitCallbacks: true });
    ScrollTrigger.normalizeScroll(true);

    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;

    if (!section || !container || !track) {
      return;
    }

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add('(min-width: 900px)', () => {
        const getDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        // Calculate scroll distance for horizontal scrolling
        const updateSpacerHeight = () => {
          const dist = getDistance();
          /* // PERF: direct DOM mutation replaces React state re-render on every refresh */
          if (containerRef.current) containerRef.current.style.height = `${dist}px`;
        };

        let resizeFrame = 0;
        const scheduleUpdateSpacer = () => {
          if (resizeFrame) return;
          resizeFrame = requestAnimationFrame(() => {
            updateSpacerHeight();
            resizeFrame = 0;
          });
        };

        updateSpacerHeight();

        const resizeObserver = new ResizeObserver(scheduleUpdateSpacer);
        resizeObserver.observe(track);
        resizeObserver.observe(container);

        gsap.set(track, { x: 0 });

        const animation = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          force3D: true,
          overwrite: 'auto',
          scrollTrigger: {
            trigger: container,
            // Start scrolling exactly when the spacer starts entering from bottom
            // or when the sticky section is fully in place.
            // Since section is 100vh and sticky at top:0, we start when container (spacer) reaches top:100vh? 
            // Better: start: 'top 100%' means when spacer enters viewport.
            // But we want it to stick first.
            start: 'top 100%',
            end: 'bottom 100%',
            scrub: 0.55,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onRefresh: () => updateSpacerHeight(),
            onEnter: () => gsap.set(track, { willChange: 'transform' }),
            onLeave: () => gsap.set(track, { willChange: 'auto' }),
            onEnterBack: () => gsap.set(track, { willChange: 'transform' }),
            onLeaveBack: () => gsap.set(track, { willChange: 'auto' }),
            snap:
              projects.length > 1
                ? {
                  snapTo: 1 / (projects.length - 1),
                  delay: 0,
                  duration: { min: 0.16, max: 0.34 },
                  ease: 'power3.out',
                }
                : undefined,
          },
        });

        return () => {
          resizeObserver.disconnect();
          if (resizeFrame) cancelAnimationFrame(resizeFrame);
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      });

      mm.add('(max-width: 899px)', () => {
        gsap.set(track, { clearProps: 'transform,width' });
        if (containerRef.current) containerRef.current.style.height = '0px';
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="work-section"
      >
        <div className="work-visible-wrapper">
          <div className="work-shell-container">
            <div className="work-header">
              <m.div
                className="work-header-content"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={{
                  margin: '0 0 8px',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: "'Poppins', system-ui, -apple-system, sans-serif",
                }}>
                  Proven Impact
                </p>
                <h2 style={{
                  margin: 0,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  fontFamily: "'Poppins', system-ui, -apple-system, sans-serif",
                }}>
                  Engineered for growth.
                  <br />
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                    Designed to convert.
                  </span>
                </h2>
              </m.div>
            </div>
          </div>

          <div className="work-stage">
            <div className="work-viewport">
              <div ref={trackRef} className="work-track" style={trackStyle}>
                {projects.map((project) => (
                  <div
                    key={`${project.clientName}-${project.projectTitle}`}
                    className="work-page"
                    data-work-card
                  >
                    <div className="work-card-shell">
                      <ProjectCard {...project} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        .work-section {
          position: sticky;
          top: 0;
          z-index: 1;
          background: var(--bg-primary);
        }

        .work-visible-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: clamp(3.75rem, 6vh, 5.5rem);
          padding-bottom: clamp(2rem, 5vh, 4rem);
          box-sizing: border-box;
          overflow: visible;
        }

        .work-shell-container {
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .work-header {
          position: relative;
          z-index: 2;
          margin-bottom: clamp(1.5rem, 4vh, 3rem);
        }

        .work-header-content {
          max-width: 800px;
        }

        .work-label {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }

        .work-title {
          margin: 0;
          line-height: 1.1;
        }

        .work-stage {
          flex: 1;
          display: flex;
          align-items: stretch;
          padding-top: 0.5rem;
        }

        .work-viewport {
          width: 100%;
          overflow: clip;
          overflow-y: visible;
          padding: 3rem 0;
          margin: -3rem 0;
          display: flex;
          align-items: stretch;
        }

        .work-track {
          display: flex;
          align-items: stretch;
          width: calc(var(--work-card-count) * 100vw);
          transform: translate3d(0, 0, 0);
        }

        .work-page {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 100vw;
          width: 100vw;
          padding: 0 var(--container-padding);
          box-sizing: border-box;
        }

        .work-card-shell {
          width: min(
            calc(100vw - (2 * var(--container-padding))),
            1060px
          );
          margin: 0 auto;
        }

        @media (max-width: 899px) {
          .work-section {
            position: relative;
            top: 0;
            height: auto !important;
            margin-bottom: 0 !important;
          }

          .work-visible-wrapper {
            height: auto;
            padding: var(--section-padding) 0;
            gap: 2rem;
          }

          .work-header {
            margin-bottom: 0;
          }

          .work-stage {
            min-height: auto;
          }

          .work-viewport {
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding: 0;
            margin: 0;
          }

          .work-viewport::-webkit-scrollbar {
            display: none;
          }

          .work-track {
            width: max-content !important;
          }

          .work-page {
            scroll-snap-align: start;
            width: calc(100vw - var(--container-padding));
            min-width: calc(100vw - var(--container-padding));
            padding-right: 0;
          }

          .work-card-shell {
            width: 100%;
          }
        }
      `}</style>
      </section>
      <div
        aria-hidden="true"
        ref={containerRef}
        className="work-scroll-spacer"
        style={{ width: '100%', pointerEvents: 'none' }}
      />
    </>
  );
}

