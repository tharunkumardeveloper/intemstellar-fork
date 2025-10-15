import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import heroApocalypse from "@/assets/hero-new-apocalypse.webp";
import RegistrationModal from "./RegistrationModal";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(titleRef.current, {
      y: 150,
      opacity: 0,
      duration: 1.4,
      delay: 0.2,
      scale: 0.8,
    })
    .from(titleRef.current, {
      filter: "blur(20px)",
      duration: 0.6,
    }, "-=1.2")
    .from(taglineRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      scale: 0.9,
    }, "-=0.8")
    .from(ctaRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scale: 0.95,
    }, "-=0.5");

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: scrolled * 0.5,
          opacity: 1 - scrolled / 600,
          duration: 0.3,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Advanced Parallax */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-300"
          style={{
            backgroundImage: `url(${heroApocalypse})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.1)',
          }}
        >
          {/* Layered Overlays for Depth - Increased darkness */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/99 via-background/90 to-background/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0" style={{ background: 'var(--gradient-spotlight)' }}></div>
        </div>

        {/* Scanlines Effect */}
        <div className="scanlines absolute inset-0 z-10 pointer-events-none opacity-30"></div>

        {/* Animated Spotlight */}
        <div 
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, hsl(0 85% 45% / 0.08) 0%, transparent 50%)',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 text-center">
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 text-chromatic tracking-tighter leading-none px-4"
            style={{ 
              textShadow: '0 0 60px hsl(var(--primary) / 0.8), 0 0 120px hsl(var(--primary) / 0.5), 0 10px 30px hsl(0 0% 0% / 0.9)',
              letterSpacing: '-0.03em'
            }}
          >
            BRAND-O-VATION
          </h1>
          <p 
            ref={taglineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 px-4"
            style={{
              textShadow: '0 0 20px hsl(var(--primary) / 0.4)',
              letterSpacing: '-0.01em'
            }}
          >
            The Last Ad-pocalypse
          </p>
          <div className="inline-block mb-8 md:mb-12 mx-4 px-4 md:px-6 py-2 md:py-3 bg-primary/10 border border-primary/30 rounded-md backdrop-blur-sm">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground font-bold tracking-wider">
              GO VIRAL OR GO DEAD!
            </p>
          </div>
          
          {/* CTA Button with Enhanced Animation */}
          <div ref={ctaRef} className="flex flex-col items-center gap-3 md:gap-4 px-4">
            <Button
              onClick={() => setModalOpen(true)}
              size="lg"
              className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg md:text-xl px-10 md:px-16 py-7 md:py-9 rounded-xl transition-all duration-500 hover:scale-105 uppercase tracking-wide overflow-hidden w-full sm:w-auto"
              style={{ boxShadow: '0 10px 30px hsl(var(--primary) / 0.4)' }}
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Limited slots • Early bird registration open</p>
          </div>
        </div>

        {/* Enhanced Vignette */}
        <div className="absolute inset-0 z-10 pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at center, transparent 20%, hsl(var(--background) / 0.7) 70%, hsl(var(--background)) 100%)'
          }}
        ></div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <RegistrationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default Hero;
