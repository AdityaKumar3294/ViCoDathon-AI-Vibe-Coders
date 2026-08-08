import React from 'react';
import { LandingHero } from '../components/landing/LandingHero';
import { BenefitsSection } from '../components/landing/BenefitsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { CurriculumTimeline } from '../components/landing/CurriculumTimeline';
import { SuccessStatsSection } from '../components/landing/SuccessStatsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FAQSection } from '../components/landing/FAQSection';
import { CTASection } from '../components/landing/CTASection';
import { LandingMobile } from '../components/landing/LandingMobile';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Dedicated Mobile Landing Experience (390px / 430px) */}
      <div className="md:hidden">
        <LandingMobile />
      </div>

      {/* 2. Desktop & Tablet Rich Landing Layout (768px, 1024px, 1280px+) */}
      <div className="hidden md:flex flex-col">
        <LandingHero />
        <BenefitsSection />
        <HowItWorksSection />
        <CurriculumTimeline />
        <SuccessStatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
};
