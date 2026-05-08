import React, { useRef } from 'react';
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

export const AppContent: React.FC = () => {
  const scrollToFinalCTA = () => {
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
      <FinalCTA />
      <Footer />
    </div>
  );
};