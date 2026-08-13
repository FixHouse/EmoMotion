import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
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

const LazyOnVisible: React.FC<{
  children: React.ReactNode;
  minHeight?: number;
  idleDelay?: number;
  rootMargin?: string;
}> = ({ children, minHeight = 480, idleDelay = 2500, rootMargin = '900px 0px' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const node = containerRef.current;
    if (!node) return;

    let hasRendered = false;
    const observerRef: { current?: IntersectionObserver } = {};
    let timeoutId: number | undefined;
    let idleId: number | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const renderSection = () => {
      if (hasRendered) return;

      hasRendered = true;
      setShouldRender(true);
      observerRef.current?.disconnect();

      if (typeof idleId === 'number' && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }
    };

    if (!('IntersectionObserver' in window)) {
      renderSection();
      return undefined;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          renderSection();
        }
      },
      { rootMargin },
    );

    observerRef.current.observe(node);

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(renderSection, { timeout: idleDelay });
    } else {
      timeoutId = window.setTimeout(renderSection, idleDelay);
    }

    return () => {
      observerRef.current?.disconnect();
      if (typeof idleId === 'number' && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }
      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }
    };
  }, [idleDelay, rootMargin, shouldRender]);

  return (
    <div ref={containerRef} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
};

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
        <LazyOnVisible minHeight={760} rootMargin="1200px 0px">
          <Suspense fallback={null}>
            <RecognizeSection />
          </Suspense>
        </LazyOnVisible>
      </div>
      <div id="programs">
        <LazyOnVisible minHeight={760}>
          <Suspense fallback={null}>
            <AgePrograms onCTAClick={scrollToFinalCTA} />
          </Suspense>
        </LazyOnVisible>
      </div>
      <div id="method">
        <LazyOnVisible minHeight={760}>
          <Suspense fallback={null}>
            <UniqueMethod />
          </Suspense>
        </LazyOnVisible>
      </div>
      <LazyOnVisible minHeight={860}>
        <Suspense fallback={null}>
          <TransformationJourney />
        </Suspense>
      </LazyOnVisible>
      <div id="pricing">
        <LazyOnVisible minHeight={900}>
          <Suspense fallback={null}>
            <PricingSection onCTAClick={scrollToFinalCTA} />
          </Suspense>
        </LazyOnVisible>
      </div>
      <div id="cta">
        <LazyOnVisible minHeight={900}>
          <Suspense fallback={<div className="min-h-[640px]" aria-hidden="true" />}>
            <FinalCTA selectedPlan={selectedPlan} selectedSchedule={selectedSchedule} />
          </Suspense>
        </LazyOnVisible>
      </div>
      <LazyOnVisible minHeight={220}>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </LazyOnVisible>
    </div>
  );
};
