import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, TrendingUp, Users, Sparkles } from "lucide-react";
import stage1 from "@/assets/stage-1.jpg";
import stage2 from "@/assets/stage-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const criteria = [
  {
    icon: Lightbulb,
    title: "Creativity",
    description: "Originality and innovative thinking in approach"
  },
  {
    icon: TrendingUp,
    title: "Branding & Marketing",
    description: "Strategic approach and brand positioning"
  },
  {
    icon: Sparkles,
    title: "Presentation",
    description: "Entertainment value and engagement quality"
  },
  {
    icon: Users,
    title: "Teamwork",
    description: "Collaboration and cohesive execution"
  }
];

const JudgingCriteria = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.criteria-card');
    
    if (cards) {
      gsap.fromTo(
        cards,
        { scale: 0.8, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
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
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16 text-chromatic px-4">
          JUDGING CRITERIA
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="rounded-lg overflow-hidden border-2 border-primary/30">
            <img src={stage1} alt="Event Stage Setup" className="w-full h-auto object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden border-2 border-accent/30">
            <img src={stage2} alt="Performance Area" className="w-full h-auto object-cover" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {criteria.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="criteria-card bg-card border-2 border-primary/30 rounded-lg p-5 md:p-6 hover:border-accent transition-all duration-300 group"
                style={{ boxShadow: 'var(--shadow-neon)' }}
              >
                <div className="mb-3 md:mb-4 inline-block p-3 md:p-4 bg-primary/20 rounded-full group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-foreground">
                  {item.title}
                </h3>
                
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JudgingCriteria;
