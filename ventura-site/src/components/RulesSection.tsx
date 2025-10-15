import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle } from "lucide-react";
import SVGGuard from "./SVGGuard";

const RulesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const rules = [
    "Each team gets 7-10 minutes for their pitch presentation",
    "Teams must present their business idea clearly with supporting materials",
    "Judges and audience members receive fake Ventura currency for investment",
    "Investment decisions are based on creativity, feasibility, and presentation",
    "The team with the highest total investment wins and gets marked as SOLD",
    "Teams that fail to secure sufficient investment are marked as UNSOLD",
    "All decisions by judges and audience are final",
    "Teams must maintain professional conduct throughout the event",
  ];

  return (
    <section id="rules" ref={ref} className="relative py-12 md:py-20 px-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-squid-charcoal/50 to-black" />
      
      {/* Flickering spotlight effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-flicker" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-flicker" style={{ animationDelay: '1s' }} />
      
      {/* Guard Characters Monitoring */}
      <div className="absolute top-20 left-10 hidden xl:block opacity-40">
        <SVGGuard className="h-[200px]" delay={0.3} />
      </div>
      <div className="absolute bottom-20 right-10 hidden xl:block opacity-40">
        <SVGGuard className="h-[200px]" delay={0.6} flip />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="border-4 border-primary rounded-lg p-2 mb-8 box-glow-intense"
        >
          <h2 className="font-bebas text-3xl sm:text-6xl md:text-8xl text-primary text-glow-intense text-center py-3 sm:py-8">
            THE RULES OF THE GAME
          </h2>
        </motion.div>
        
        <div className="space-y-3 md:space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-start gap-3 sm:gap-4 bg-card border border-primary/20 p-4 sm:p-6 rounded-lg hover:border-primary hover:bg-card/80 hover:box-glow transition-all duration-300"
            >
              <div className="mt-1 flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-primary group-hover:animate-pulse" />
                </div>
              </div>
              <p className="text-foreground/90 text-sm sm:text-lg leading-relaxed">
                {rule}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
