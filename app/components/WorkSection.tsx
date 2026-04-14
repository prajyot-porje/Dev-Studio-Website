'use client';

import { type CSSProperties, useRef, useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
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

const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    y: 0,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    y: 0,
    opacity: 0,
  }),
};

export default function WorkSection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndex = ((page % projects.length) + projects.length) % projects.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 899);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page, isHovered]);

  // Swipe handling
  const dragStartX = useRef(0);
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      paginate(diff > 0 ? 1 : -1);
    }
  };

  return (
    <section
      id="work"
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

        <div
          className="work-stage"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div className="work-carousel">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.55 },
                  opacity: { duration: 0.35 },
                }}
                className="work-slide"
              >
                <div className="work-card-shell">
                  <ProjectCard {...projects[activeIndex]} />
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="work-indicators">
            {projects.map((_, i) => (
              <button
                key={`ind-${i}`}
                onClick={() => setPage([i, i > activeIndex ? 1 : -1])}
                className={`work-indicator ${activeIndex === i ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-section {
          position: sticky;
          top: 0;
          z-index: 1;
          background: var(--bg-primary);
          height: 150vh;
        }

        .work-visible-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: clamp(3.75rem, 6vh, 5.5rem);
          padding-bottom: clamp(1.5rem, 3vh, 2.5rem);
          box-sizing: border-box;
          overflow: visible;
        }

        .work-shell-container {
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          flex-shrink: 0;
        }

        .work-header {
          position: relative;
          z-index: 2;
          margin-bottom: clamp(1rem, 2vh, 2rem);
        }

        .work-header-content {
          max-width: 800px;
        }

        .work-stage {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-height: 0;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
        }

        .work-stage:active {
          cursor: grabbing;
        }

        .work-carousel {
          flex: 1;
          padding: 20px;
          width: 100%;
          position: relative;
          overflow-x: clip;
          overflow-y: visible;
          min-height: 0;
        }

        .work-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 var(--container-padding);
        }

        .work-card-shell {
          width: 100%;
          max-width: 1060px;
          margin: 0 auto;
          pointer-events: auto;
        }

        .work-indicators {
          display: flex;
          gap: 12px;
          padding: clamp(0.75rem, 2vh, 1.5rem) 0;
          justify-content: center;
          z-index: 10;
          flex-shrink: 0;
        }

        .work-indicator {
          width: 32px;
          height: 4px;
          border-radius: 2px;
          background: var(--text-tertiary);
          border: none;
          cursor: pointer;
          opacity: 0.3;
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .work-indicator.active {
          opacity: 1;
          background: var(--text-primary);
        }

        @media (max-width: 899px) {
          .work-section {
            height: 150vh;
          }

          .work-visible-wrapper {
            height: 100vh;
            padding-top: clamp(4rem, 8vh, 6rem);
            padding-bottom: 2rem;
          }

          .work-header {
            margin-bottom: clamp(0.5rem, 1.5vh, 1rem);
          }

          .work-indicators {
            gap: 8px;
            padding-top: 1.5rem;
            padding-bottom: 0;
          }

          .work-indicator {
            width: 24px;
            height: 3px;
          }
        }
      `}</style>
    </section>
  );
}
