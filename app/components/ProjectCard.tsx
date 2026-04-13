'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { memo } from 'react';
import { RippleElement } from '@/components/ui/ripple-element';
import styles from './ProjectCard.module.css';

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectCardProps = {
  clientName: string;
  projectTitle: string;
  description: string;
  techStack: string[];
  outcomes: string[];
  metrics: ProjectMetric[];
  href?: string;
  imageSrc?: string;
  outcomesHeading?: 'Key Outcomes' | 'Project Highlights';
};

const imageMap: Record<string, string> = {
  namrl: '/namrl.png',
  kiyomifacilities: '/kiyomi.png',
  kiyomi: '/kiyomi.png',
};

/**
 * Spring-tuned easing — matches the reference's snappy-yet-smooth feel.
 * Using a tight custom cubic-bezier that overshoots slightly on y lift.
 */
const hoverTransition = {
  duration: 0.40,
  ease: [0.23, 1.0, 0.32, 1.0] as const,
};

const mockupTransition = {
  duration: 0.45,
  ease: [0.16, 1.0, 0.30, 1.0] as const,
};

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getInitials(value: string) {
  return value
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function FallbackMockup({ clientName }: { clientName: string }) {
  return (
    <div className={styles.fallbackWrap}>
      <div className={styles.fallbackShadow} />
      <div className={styles.fallbackShell}>
        <div className={styles.fallbackPanel}>
          <div className={styles.fallbackBadge}>{getInitials(clientName)}</div>
          <p className={styles.fallbackLabel}>Project Mockup</p>
        </div>
      </div>
    </div>
  );
}

export default memo(function ProjectCard({
  clientName,
  projectTitle,
  description,
  techStack,
  outcomes,
  metrics,
  href,
  imageSrc,
  outcomesHeading = 'Project Highlights',
}: ProjectCardProps) {
  const resolvedImage =
    imageSrc ??
    imageMap[normalizeKey(clientName)] ??
    imageMap[normalizeKey(projectTitle)];

  const ctaHref = href ?? '#contact';
  const isExternalLink = /^https?:\/\//.test(ctaHref);
  const supportingText = outcomes[0] ?? description;

  return (
    <m.article
      whileHover={{ y: -8, scale: 1.004 }}
      transition={hoverTransition}
      className={styles.root}
    >
      <div className={styles.inner}>

        {/* ── Left: Preview panel ─────────────────────────────────────────── */}
        <div className={styles.lightPanel}>
          <div className={styles.previewGlow} />

          <div className={styles.previewHeader}>
            <p className={styles.previewEyebrow}>Project Preview</p>
            <p className={styles.previewText}>
              A cleaner, faster presentation layer with clearer hierarchy and
              stronger visual trust signals.
            </p>
          </div>

          <div className={styles.previewStage}>
            {resolvedImage ? (
              <m.div
                whileHover={{ y: -10, rotate: -1.2, scale: 1.02 }}
                transition={mockupTransition}
                className={styles.mockupWrap}
                style={{ transformOrigin: '50% 85%' }}
              >
                <div className={styles.mockupShadow} />
                <div className={styles.mockupMedia}>
                  <Image
                    src={resolvedImage}
                    alt={`${clientName} project mockup`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 28vw"
                    className={styles.mockupImage}
                  />
                </div>
              </m.div>
            ) : (
              <FallbackMockup clientName={clientName} />
            )}
          </div>

          <div className={styles.previewFooter}>
            <p className={styles.previewFooterLabel}>{outcomesHeading}</p>
            <p className={styles.previewFooterValue}>
              {metrics[0]?.value
                ? `${metrics[0].value} ${metrics[0].label}`
                : '—'}
            </p>
          </div>
        </div>

        {/* ── Right: Content panel ────────────────────────────────────────── */}
        <div className={styles.darkPanel}>
          <div className={styles.contentHeader}>
            <p className={styles.eyebrow}>{clientName}</p>
            <h3 className={styles.title}>{projectTitle}</h3>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.supportCard}>
            <p className={styles.supportLabel}>{outcomesHeading}</p>
            <p className={styles.supportText}>{supportingText}</p>
          </div>

          <div className={styles.metricGrid}>
            {metrics.slice(0, 4).map((metric) => (
              <div
                key={`${metric.label}-${metric.value}`}
                className={styles.metricCard}
              >
                <p className={styles.metricValue}>{metric.value}</p>
                <p className={styles.metricLabel}>{metric.label}</p>
              </div>
            ))}
          </div>

          <div className={styles.stackList}>
            {techStack.slice(0, 5).map((tech) => (
              <span key={tech} className={styles.stackPill}>
                {tech}
              </span>
            ))}
          </div>

          <RippleElement
            as="a"
            href={ctaHref}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noreferrer noopener' : undefined}
            className={styles.cta}
          >
            <span>View Case Study</span>
            <ArrowUpRight className={styles.ctaIcon} strokeWidth={2.4} />
          </RippleElement>
        </div>

      </div>
    </m.article>
  );
});