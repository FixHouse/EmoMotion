import React, { useState } from 'react';
import { MetaTags } from './MetaTags';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { LoadingScreen } from './LoadingScreen';
import { HeroSection } from './HeroSection';
import { RecognizeSection } from './RecognizeSection';
import { UniqueMethod } from './UniqueMethod';
import { AgePrograms } from './AgePrograms';
import { TransformationJourney } from './TransformationJourney';
import { PricingSection } from './PricingSection';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { PaymentSuccessBanner } from './PaymentSuccessBanner';
import type { CTARequest, SchedulePrefill } from './ctaTypes';

export const AppContent: React.FC = () => {
  // Which plan was clicked to bring the user to the form.
  // 'planTrialName' = trial lesson (150 Kc, card payment allowed via Stripe).
  // Any other key = paid package (cash only, no Stripe).
  const [selectedPlan, setSelectedPlan] = useState<string>('planTrialName');
  const [selectedSchedule, setSelectedSchedule] = useState<SchedulePrefill | null>(null);

  const scrollToFinalCTA = (request?: CTARequest) => {
    // Defensive: callers may forward a React event by accident (onClick={fn}).
    // Only accept actual string keys; everything else is treated as the trial.
    const nextPlan =
      typeof request === 'string'
        ? request
        : request && typeof request === 'object' && 'planKey' in request && typeof request.planKey === 'string'
          ? request.planKey
          : 'planTrialName';

    setSelectedPlan(nextPlan);

    if (request && typeof request === 'object' && 'schedule' in request && request.schedule) {
      setSelectedSchedule({ ...request.schedule });
    }

    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <MetaTags />
      <LoadingScreen />
      
      {/* Language Switcher */}
      <LanguageSwitcher />
      
      {/* Mobile Menu */}
      <MobileMenu />
      
      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Payment Success Banner (shown when returning from Stripe) */}
      <PaymentSuccessBanner />

      {/* All Sections */}
      <div id="hero">
        <HeroSection onCTAClick={scrollToFinalCTA} />
      </div>
      <div id="recognize">
        <RecognizeSection />
      </div>
      <div id="programs">
        <AgePrograms onCTAClick={scrollToFinalCTA} />
      </div>
      <div id="method">
        <UniqueMethod />
      </div>
      <TransformationJourney />
      <div id="pricing">
        <PricingSection onCTAClick={scrollToFinalCTA} />
      </div>
      <FinalCTA selectedPlan={selectedPlan} selectedSchedule={selectedSchedule} />
      <Footer />
    </div>
  );
};
