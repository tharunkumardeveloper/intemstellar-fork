import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import zombieCrowd from "@/assets/zombie-crowd.jpg";

gsap.registerPlugin(ScrollTrigger);

const EventDescription = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heading = sectionRef.current?.querySelector('h2');
    const paragraphs = sectionRef.current?.querySelectorAll('.description-text');
    
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (paragraphs) {
      gsap.fromTo(
        paragraphs,
        { y: 80, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${zombieCrowd})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 text-chromatic inline-block animate-reveal px-4"
            style={{ textShadow: 'var(--shadow-blood)' }}
          >
            THE OUTBREAK
          </h2>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>
        
        <div className="space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl leading-relaxed">
          <p className="description-text p-4 md:p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-500">
            The apocalypse has hit the world of marketing! Brands are collapsing, advertisements are going extinct, and consumer trust is spreading faster than infection. In this chaos, only one thing can save humanity - <span className="text-primary font-bold">the power of creative marketing</span>.
          </p>
          
          <p className="description-text p-4 md:p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-500">
            <span className="text-primary font-bold text-xl md:text-2xl block mb-2">Brand-o-Vation: The Last Ad-pocalypse</span> is a thrilling marketing face-off where strategy meets imagination. Teams must think fast, act smart, and sell harder to outlive the competition. In this two-round battle for survival, participants will spin their way through unpredictable marketing challenges before diving into the ultimate <span className="text-accent font-bold">Ad-Zap showdown</span> - where they'll pitch impossible products with humor, storytelling, and pure creativity.
          </p>
          
          <p className="description-text p-4 md:p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-500 text-center">
            Every spin, every pitch, every idea could mean <span className="text-primary font-bold">survival</span> - or <span className="text-destructive font-bold">extinction</span>.
          </p>
          
          <div className="description-text mt-8 md:mt-12 p-6 md:p-8 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-md rounded-xl border-2 border-primary/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <p className="text-primary font-bold text-xl md:text-2xl lg:text-3xl text-center relative z-10">
              Welcome to the Last Ad-pocalypse, where the art of advertising meets the chaos of a zombie outbreak, here creativity is the cure!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDescription;
