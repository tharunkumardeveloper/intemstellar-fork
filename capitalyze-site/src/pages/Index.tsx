import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import EventDescription from '@/components/EventDescription';
import RulesSection from '@/components/RulesSection';
import RoundsTimeline from '@/components/RoundsTimeline';
import RegistrationCTA from '@/components/RegistrationCTA';
import CoordinatorsSection from '@/components/CoordinatorsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <main className="min-h-screen">
        <HeroSection />
        <EventDescription />
        <RulesSection />
        <RoundsTimeline />
        <RegistrationCTA />
        <CoordinatorsSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
