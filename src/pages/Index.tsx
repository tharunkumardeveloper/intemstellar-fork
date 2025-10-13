import { Suspense, lazy } from "react";
import Header3D from "@/components/3d/Header3D";
import Hero3D, { Hero3DScene } from "@/components/3d/Hero3D";
import Events3D from "@/components/3d/Events3D";
import AnimatedSection from "@/components/3d/AnimatedSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Scene3D from "@/components/3d/Scene3D";

// Lazy load Contact component for better performance
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Global 3D Scene with Hero 3D content - Reduced particle count for better performance */}
      <Scene3D enableParticles={true} particleCount={200} showStats={false}>
        {/* Hero 3D Scene with all complex 3D elements */}
        <Hero3DScene />
      </Scene3D>
      
      {/* Page Content */}
      <Header3D />
      <Hero3D />
      <AnimatedSection animationType="slide" intensity="medium">
        <Events3D />
      </AnimatedSection>
      <AnimatedSection animationType="morph" intensity="light">
        <About />
      </AnimatedSection>
      <AnimatedSection animationType="scale" intensity="light">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
          <Contact />
        </Suspense>
      </AnimatedSection>
      <Footer />
    </div>
  );
};

export default Index;
