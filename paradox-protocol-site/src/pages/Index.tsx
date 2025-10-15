import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import StorylineSection from "@/components/StorylineSection";
import TimelineSection from "@/components/TimelineSection";
import RulesSection from "@/components/RulesSection";
import ReportSection from "@/components/ReportSection";
import CoordinatorsSection from "@/components/CoordinatorsSection";
import FooterSection from "@/components/FooterSection";
import SectionDivider from "@/components/SectionDivider";
import LoadingScreen from "@/components/LoadingScreen";

import divider1 from "@/assets/section-divider-1.jpg";
import divider2 from "@/assets/section-divider-2.jpg";
import divider3 from "@/assets/section-divider-3.jpg";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StorylineSection />
      
      <SectionDivider imageSrc={divider1} alt="Circuit board divider" />
      
      <TimelineSection />
      
      <SectionDivider imageSrc={divider2} alt="Time mechanism divider" />
      
      <RulesSection />
      <ReportSection />
      
      <SectionDivider imageSrc={divider3} alt="Holographic interface divider" />
      
      <CoordinatorsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
