'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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

const hoverTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
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

export default function ProjectCard({
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
    <motion.article
      whileHover={{ y: -6 }}
      transition={hoverTransition}
      className={styles.root}
    >
      <div className={styles.inner}>
        <div className={styles.lightPanel}>
          <div className={styles.previewGlow} />

          <div className={styles.previewHeader}>
            <p className={styles.previewEyebrow}>Project Preview</p>
            <p className={styles.previewText}>
              A cleaner, faster presentation layer with clearer hierarchy and stronger visual
              trust.
            </p>
          </div>

          <div className={styles.previewStage}>
            {resolvedImage ? (
              <motion.div
                whileHover={{ y: -8, rotate: -1 }}
                transition={hoverTransition}
                className={styles.mockupWrap}
                style={{ transformOrigin: '50% 80%' }}
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
              </motion.div>
            ) : (
              <FallbackMockup clientName={clientName} />
            )}
          </div>

          <div className={styles.previewFooter}>
            <p className={styles.previewFooterLabel}>{outcomesHeading}</p>
            <p className={styles.previewFooterValue}>
              {metrics[0]?.value ? `${metrics[0].value} ${metrics[0].label}` : ''}
            </p>
          </div>
        </div>

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
              <div key={`${metric.label}-${metric.value}`} className={styles.metricCard}>
                <p className={styles.metricValue}>{metric.value}</p>
                <p className={styles.metricLabel}>{metric.label}</p>
              </div>
            ))}
          </div>

          <div className={styles.stackList}>
            {techStack.slice(0, 4).map((tech) => (
              <span key={tech} className={styles.stackPill}>
                {tech}
              </span>
            ))}
          </div>

          <motion.a
            href={ctaHref}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noreferrer noopener' : undefined}
            whileHover={{ x: 2, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={hoverTransition}
            className={styles.cta}
          >
            <span>View Case Study</span>
            <ArrowUpRight className={styles.ctaIcon} strokeWidth={2.2} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
