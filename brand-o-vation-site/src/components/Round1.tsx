import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import darkZombie from "@/assets/dark-zombie.jpg";

gsap.registerPlugin(ScrollTrigger);

const Round1 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    const content = sectionRef.current?.querySelector('.round-content');
    if (content) {
      gsap.fromTo(
        content,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Wheel Image */}
          <div className="order-2 md:order-1">
        <div 
          ref={imageRef}
          className="rounded-lg overflow-hidden shadow-2xl border-4 border-primary/40"
          style={{ boxShadow: '0 10px 40px hsl(var(--primary) / 0.3)' }}
        >
          <img 
            src={darkZombie} 
            alt="Wheel of Survival - Marketing Challenge Spinner"
            className="w-full h-auto object-cover"
          />
        </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 round-content">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-primary/20 border-2 border-primary rounded-md mb-3 md:mb-4">
              <span className="text-primary font-bold tracking-wider text-sm md:text-base">ROUND 1</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-chromatic">
              SPIN OF SURVIVAL
            </h2>
            
            <div className="inline-block px-3 py-1 bg-muted rounded-md mb-4 md:mb-6">
              <span className="text-foreground/70 text-xs md:text-sm uppercase tracking-wide">Offline</span>
            </div>

            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 mb-4 md:mb-6">
              Teams step into the arena to test their brand instincts, marketing knowledge, and quick thinking. Each team spins the <span className="text-accent font-bold">Wheel of Survival</span> to face random marketing challenges that test their spontaneity and creativity.
            </p>

            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90">
              Every spin could save their brand—or doom it. Quick thinking and sharp brand instincts earn points - and only the top scorers move forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Round1;
