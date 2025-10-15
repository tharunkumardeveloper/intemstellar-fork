import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, DollarSign, Target } from "lucide-react";
import SVGPlayer from "./SVGPlayer";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const icons = [
    { Icon: DollarSign, label: "Investment" },
    { Icon: Lightbulb, label: "Innovation" },
    { Icon: Target, label: "Strategy" },
  ];

  return (
    <section id="about" ref={ref} className="relative py-12 md:py-20 px-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-squid-charcoal to-black" />
      
      {/* Player Silhouettes */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl hidden md:flex justify-center gap-8 opacity-40">
        <SVGPlayer className="h-48" delay={0.3} number="456" />
        <SVGPlayer className="h-48" delay={0.5} number="218" />
        <SVGPlayer className="h-48" delay={0.7} number="067" />
        <SVGPlayer className="h-48" delay={0.9} number="001" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-bebas text-4xl sm:text-6xl md:text-8xl text-primary text-glow text-center mb-6 sm:mb-16"
        >
          ABOUT THE GAME
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card border border-primary/30 p-4 sm:p-8 md:p-12 rounded-lg box-glow mb-6 sm:mb-12"
        >
          <p className="text-sm sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
            <span className="font-orbitron text-primary">VENTURA</span> is a startup investment simulation event where participants pitch innovative business ideas. Judges and audiences act as investors using fake Ventura currency — where <span className="text-primary font-semibold">creativity, strategy, and survival</span> determine who gets <span className="text-accent font-bold">SOLD</span>.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {icons.map(({ Icon, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="flex flex-col items-center gap-3 md:gap-4 p-4 md:p-6 bg-card/50 border border-primary/20 rounded-lg hover:border-primary/50 transition-all duration-300 hover:box-glow"
            >
              <div className="p-3 md:p-4 rounded-full bg-primary/10 border border-primary/30 animate-pulse-glow">
                <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
              <span className="font-orbitron text-lg md:text-xl text-foreground">{label}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-12"
        />
      </div>
    </section>
  );
};

export default AboutSection;
