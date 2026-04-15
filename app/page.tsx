import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';

const WhyChooseUsSection = dynamic(() => import('./components/WhyChooseUs'));
const ProcessSection = dynamic(() => import('./components/ProcessSection'));
const WorkSection = dynamic(() => import('./components/WorkSection'));
const TestimonialsSection = dynamic(() => import('./components/TestimonialsSection'));
const AboutSection = dynamic(() => import('./components/AboutSection'));
const ContactSection = dynamic(() => import('./components/ContactSection'));

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <AboutSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
