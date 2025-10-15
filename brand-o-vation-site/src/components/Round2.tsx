import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import apocalypseCity from "@/assets/apocalypse-city.webp";

gsap.registerPlugin(ScrollTrigger);

const Round2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
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
        { x: 100, opacity: 0 },
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
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="round-content">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-accent/20 border-2 border-accent rounded-md mb-3 md:mb-4">
              <span className="text-accent font-bold tracking-wider text-sm md:text-base">ROUND 2 - FINAL</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-chromatic">
              AD-ZAP: SELL THE IMPOSSIBLE
            </h2>
            
            <div className="inline-block px-3 py-1 bg-muted rounded-md mb-4 md:mb-6">
              <span className="text-foreground/70 text-xs md:text-sm uppercase tracking-wide">Offline Final</span>
            </div>

            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 mb-4 md:mb-6">
              The Ad-pocalypse intensifies! Teams become marketing agencies tasked with advertising strange, most bizarre, fictional products. It's an <span className="text-accent font-bold">Ad-Zap challenge</span> where participants act as creative marketing survivors.
            </p>

            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 mb-4 md:mb-6">
              Each team performs a <span className="text-primary font-bold">5-7 minute creative ad or skit</span>, they can use Props, PPTs, or music, to convince the crowd and judges that their product can survive the end of the world.
            </p>

            <p className="text-sm md:text-base text-muted-foreground italic">
              * Topics will be released prior to the event day.
            </p>
          </div>

          {/* Stage Image */}
          <div>
        <div 
          ref={imageRef}
          className="rounded-lg overflow-hidden shadow-2xl border-4 border-primary/40"
          style={{ boxShadow: 'var(--shadow-blood)' }}
        >
          <img 
            src={apocalypseCity} 
            alt="Ad-Zap Stage - Final Round Performance Area"
            className="w-full h-auto object-cover"
            style={{ filter: 'brightness(0.9) contrast(1.1)' }}
          />
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Round2;
