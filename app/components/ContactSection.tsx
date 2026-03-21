'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RippleElement } from '@/components/ui/ripple-element';

const steps = [
  {
    title: 'About You',
    fields: ['name', 'email'],
  },
  {
    title: 'Your Project',
    fields: ['service', 'budget'],
  },
  {
    title: 'Tell Us More',
    fields: ['message'],
  },
];

const serviceOptions = [
  'Web Development',
  'AI Integration',
  'Digital Presence',
  'Other',
];

const budgetOptions = [
  '$300 – $999',
  '$1k – $5k',
  '$5k+',
  'Ongoing / Retainer',
];

export default function ContactSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // In a real app, send data to API here
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontSize: 'var(--text-base)',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.7, once: true }}
      style={{
        background: 'var(--bg-primary)',
      }}
    >
      <div className="section-container" style={{ maxWidth: '720px' }}>
        {/* Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            marginBottom: '48px',
          }}
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
            Get Started
          </p>
          <h2 className="section-heading" style={{ marginBottom: '16px' }}>
            Contact Us
          </h2>
          <p className="section-subtext" style={{ margin: '0 auto' }}>
            Ready to bring your vision to life? Tell us about your project
            and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Form container */}
        <motion.div
          layout
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
            }
          }}
          // The layout transition runs smoothly when content height changes
          transition={{ duration: 0.4 }}
          className="shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          style={{
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border-color)',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(16px)',
            overflow: 'hidden',
          }}
        >
          {/* Step indicator */}
          {!isSubmitted ? (
            <>
              <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '24px 40px',
              borderBottom: '1px solid var(--border-color)',
              gap: '12px',
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flex: i < steps.length - 1 ? 1 : undefined,
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    flexShrink: 0,
                    transition: 'all 0.4s ease',
                    background:
                      i <= currentStep
                        ? 'var(--text-primary)'
                        : 'transparent',
                    color:
                      i <= currentStep
                        ? 'var(--bg-primary)'
                        : 'var(--text-tertiary)',
                    border:
                      i <= currentStep
                        ? 'none'
                        : '1px solid var(--border-color)',
                  }}
                >
                  {i < currentStep ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color:
                      i <= currentStep
                        ? 'var(--text-primary)'
                        : 'var(--text-tertiary)',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.title}
                </span>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '1px',
                      background: 'var(--border-color)',
                      marginLeft: '8px',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form content */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                transition:
                  'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: `translateX(-${currentStep * 100}%)`,
              }}
            >
              {/* Step 1: Name/Email */}
              <div
                style={{
                  minWidth: '100%',
                  padding: currentStep === 0 ? '40px' : '0 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  height: currentStep === 0 ? 'auto' : 0,
                  overflow: 'hidden',
                  opacity: currentStep === 0 ? 1 : 0,
                  visibility: currentStep === 0 ? 'visible' : 'hidden',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: '8px',
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                      e.currentTarget.style.boxShadow =
                        '0 0 0 3px var(--border-subtle)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: '8px',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                      e.currentTarget.style.boxShadow =
                        '0 0 0 3px var(--border-subtle)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Step 2: Service/Budget */}
              <div
                style={{
                  minWidth: '100%',
                  padding: currentStep === 1 ? '40px' : '0 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  height: currentStep === 1 ? 'auto' : 0,
                  overflow: 'hidden',
                  opacity: currentStep === 1 ? 1 : 0,
                  visibility: currentStep === 1 ? 'visible' : 'hidden',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: '12px',
                    }}
                  >
                    What do you need?
                  </label>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                    }}
                    className="service-options-grid"
                  >
                    {serviceOptions.map((option) => (
                      <RippleElement
                        key={option}
                        type="button"
                        onClick={() => updateField('service', option)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid',
                          borderColor:
                            formData.service === option
                              ? 'var(--text-primary)'
                              : 'var(--border-color)',
                          background:
                            formData.service === option
                              ? 'var(--text-primary)'
                              : 'transparent',
                          color:
                            formData.service === option
                              ? 'var(--bg-primary)'
                              : 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontFamily: 'inherit',
                        }}
                      >
                        {option}
                      </RippleElement>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: '12px',
                    }}
                  >
                    Budget range
                  </label>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                    }}
                  >
                    {budgetOptions.map((option) => (
                      <RippleElement
                        key={option}
                        type="button"
                        onClick={() => updateField('budget', option)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid',
                          borderColor:
                            formData.budget === option
                              ? 'var(--text-primary)'
                              : 'var(--border-color)',
                          background:
                            formData.budget === option
                              ? 'var(--text-primary)'
                              : 'transparent',
                          color:
                            formData.budget === option
                              ? 'var(--bg-primary)'
                              : 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontFamily: 'inherit',
                        }}
                      >
                        {option}
                      </RippleElement>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Message */}
              <div
                style={{
                  minWidth: '100%',
                  padding: currentStep === 2 ? '40px' : '0 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  height: currentStep === 2 ? 'auto' : 0,
                  overflow: 'hidden',
                  opacity: currentStep === 2 ? 1 : 0,
                  visibility: currentStep === 2 ? 'visible' : 'hidden',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      marginBottom: '8px',
                    }}
                  >
                    Project Details
                  </label>
                  <textarea
                    placeholder="Tell us about your project, goals, and timeline..."
                    value={formData.message}
                    onChange={(e) =>
                      updateField('message', e.target.value)
                    }
                    rows={6}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '160px',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                      e.currentTarget.style.boxShadow =
                        '0 0 0 3px var(--border-subtle)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation OR Success Message */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 40px 32px',
              }}
            >
              <RippleElement
                type="button"
                onClick={prevStep}
                style={{
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  visibility: currentStep > 0 ? 'visible' : 'hidden',
                  fontFamily: 'inherit',
                }}
              >
                Back
              </RippleElement>

              {/* Step dots */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {steps.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === currentStep ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background:
                        i === currentStep
                          ? 'var(--text-primary)'
                          : 'var(--border-color)',
                      transition: 'all 0.4s ease',
                    }}
                  />
                ))}
              </div>

              <RippleElement
                type="button"
                onClick={
                  currentStep === steps.length - 1 ? handleSubmit : nextStep
                }
                className="btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: 'var(--text-sm)',
                }}
              >
                {currentStep === steps.length - 1
                  ? isSubmitting ? 'Sending...' : 'Send Message'
                  : 'Continue'}
              </RippleElement>
            </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '64px 40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Message Received
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: 1.6 }}>
                Your response has been received. We will contact you soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .service-options-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
