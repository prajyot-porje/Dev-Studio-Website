import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhyUsSection from './components/WhyUsSection';
import ProcessSection from './components/ProcessSection';
import WorkSection from './components/WorkSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <AboutSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
