import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import EventDescription from "@/components/EventDescription";
import Round1 from "@/components/Round1";
import Round2 from "@/components/Round2";

import Rules from "@/components/Rules";
import JudgingCriteria from "@/components/JudgingCriteria";
import Coordinators from "@/components/Coordinators";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prefers reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.add('prefers-reduced-motion');
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (loading) {
    return <LoadingScreen onLoadComplete={() => setLoading(false)} />;
  }

  return (
    <main className="relative">
      <Hero />
      <EventDescription />
      <Round1 />
      <Round2 />
      
      <Rules />
      <JudgingCriteria />
      <Coordinators />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
