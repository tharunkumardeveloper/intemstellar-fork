import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimationProvider } from "@/contexts/AnimationContext";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventFlowSection from "@/components/EventFlowSection";
import EvaluationSection from "@/components/EvaluationSection";
import RulesSection from "@/components/RulesSection";
import ActivitySection from "@/components/ActivitySection";
import RequirementsSection from "@/components/RequirementsSection";
import CoordinatorsSection from "@/components/CoordinatorsSection";

import EndingSection from "@/components/EndingSection";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showLoading]);

  return (
    <AnimationProvider>
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen onComplete={() => setShowLoading(false)} />
        )}
      </AnimatePresence>
      
      {!showLoading && (
        <main className="bg-black space-y-0">
          <HeroSection />
          <AboutSection />
          <EventFlowSection />
          <EvaluationSection />
          <RulesSection />
          <ActivitySection />
          <RequirementsSection />
          <CoordinatorsSection />
          <EndingSection />
        </main>
      )}
    </AnimationProvider>
  );
};

export default Index;
