import React, { Suspense, lazy, useState } from 'react';
import { MetaTags } from './MetaTags';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { LoadingScreen } from './LoadingScreen';
import { HeroSection } from './HeroSection';
import { ScrollToTop } from './ScrollToTop';
import { PaymentSuccessBanner } from './PaymentSuccessBanner';
import type { CTARequest, SchedulePrefill } from './ctaTypes';

const RecognizeSection = lazy(() =>
  import('./RecognizeSection').then((module) => ({ default: module.RecognizeSection })),
);
const AgePrograms = lazy(() =>
  import('./AgePrograms').then((module) => ({ default: module.AgePrograms })),
);
const UniqueMethod = lazy(() =>
  import('./UniqueMethod').then((module) => ({ default: module.UniqueMethod })),
);
const TransformationJourney = lazy(() =>
  import('./TransformationJourney').then((module) => ({ default: module.TransformationJourney })),
);
const PricingSection = lazy(() =>
  import('./PricingSection').then((module) => ({ default: module.PricingSection })),
);
const FinalCTA = lazy(() =>
  import('./FinalCTA').then((module) => ({ default: module.FinalCTA })),
);
const Footer = lazy(() =>
  import('./Footer').then((module) => ({ default: module.Footer })),
);

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
        <Suspense fallback={null}>
          <RecognizeSection />
        </Suspense>
      </div>
      <div id="programs">
        <Suspense fallback={null}>
          <AgePrograms onCTAClick={scrollToFinalCTA} />
        </Suspense>
      </div>
      <div id="method">
        <Suspense fallback={null}>
          <UniqueMethod />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <TransformationJourney />
      </Suspense>
      <div id="pricing">
        <Suspense fallback={null}>
          <PricingSection onCTAClick={scrollToFinalCTA} />
        </Suspense>
      </div>
      <div id="cta">
        <Suspense fallback={<div className="min-h-[640px]" aria-hidden="true" />}>
          <FinalCTA selectedPlan={selectedPlan} selectedSchedule={selectedSchedule} />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};
