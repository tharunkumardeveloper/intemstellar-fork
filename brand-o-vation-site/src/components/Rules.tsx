import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import zombieCrowd from "@/assets/zombie-crowd.jpg";

gsap.registerPlugin(ScrollTrigger);

const rules = [
  "Team Size: 3–4 members.",
  "Cross-department participation is allowed.",
  "Topics for round 2 will be released prior to the event.",
  "No vulgarity, offensive, or sensitive content permitted.",
  "Teams must strictly adhere to time limits and follow instructions from the coordinators.",
  "Judges' and organizers' decisions will be final and binding.",
  "Evaluation will be based on creativity, Branding & Marketing Strategy, Presentation & entertainment, and teamwork.",
];

const Rules = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ruleItems = sectionRef.current?.querySelectorAll('.rule-item');
    
    if (ruleItems) {
      gsap.fromTo(
        ruleItems,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${zombieCrowd})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16 text-chromatic px-4">
          SURVIVAL RULES
        </h2>

        <div className="bg-muted/50 border-2 border-primary/30 rounded-lg p-6 md:p-8 lg:p-12 backdrop-blur-sm">
          <ul className="space-y-4 md:space-y-6">
            {rules.map((rule, index) => (
              <li key={index} className="rule-item flex items-start gap-3 md:gap-4">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stamped Effect */}
        <div className="mt-8 md:mt-12 text-center">
          <div 
            className="inline-block px-6 md:px-8 py-3 md:py-4 border-4 border-destructive text-destructive transform -rotate-3"
            style={{
              borderStyle: 'dashed',
              textShadow: '2px 2px 0 hsl(var(--background))'
            }}
          >
            <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider">MANDATORY</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;
