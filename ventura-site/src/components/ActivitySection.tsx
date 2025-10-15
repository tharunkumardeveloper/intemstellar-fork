import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DollarSign } from "lucide-react";
import SVGAudience from "./SVGAudience";
import SVGStamp from "./SVGStamp";

const ActivitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="activity" ref={ref} className="relative py-12 md:py-20 px-4 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-squid-charcoal to-black" />
      
      {/* Floating currency animations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -50,
              rotate: 0,
              opacity: 0.3
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: 360,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <DollarSign className="w-12 h-12 text-primary/40" />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-bebas text-3xl sm:text-5xl md:text-8xl mb-4 sm:mb-8 animate-flicker"
        >
          <span className="text-primary text-glow-intense">CONVINCE.</span>{" "}
          <span className="text-accent text-glow-intense">NEGOTIATE.</span>{" "}
          <span className="text-primary text-glow-intense">WIN.</span>
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-card border-2 border-primary/30 p-4 sm:p-8 md:p-12 rounded-lg box-glow mb-6 sm:mb-12"
        >
          <h3 className="font-orbitron text-lg sm:text-3xl text-primary mb-3 sm:mb-6">INVESTMENT SIMULATION</h3>
          <p className="text-sm sm:text-xl text-foreground/90 leading-relaxed mb-4 sm:mb-8">
            In this high-stakes game, your startup's survival depends on your ability to secure investment. 
            Judges and audience members hold the power with their Ventura currency. 
            Will your idea be <span className="text-accent font-bold text-lg sm:text-2xl">SOLD</span> or <span className="text-destructive font-bold text-lg sm:text-2xl">UNSOLD</span>?
          </p>
          
          {/* Character Animations */}
          <div className="flex justify-center items-center gap-4 sm:gap-8 mb-4 sm:mb-8">
            <SVGAudience className="h-20 sm:h-32 md:h-40 w-auto" delay={0.3} />
            <SVGStamp className="h-20 sm:h-32 md:h-40 w-auto" delay={0.6} text="SOLD" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 sm:gap-8 justify-center items-center mt-6 sm:mt-12">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-accent/20 border-4 border-accent px-6 py-4 sm:px-12 sm:py-8 rounded-xl text-3xl sm:text-6xl font-bebas text-accent box-glow-intense"
            >
              SOLD
            </motion.div>
            
            <div className="text-xl sm:text-4xl text-muted-foreground font-bebas">VS</div>
            
            <motion.div
              animate={{ 
                opacity: [1, 0.5, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-destructive/20 border-4 border-destructive px-5 py-4 sm:px-8 sm:py-8 rounded-xl text-3xl sm:text-6xl font-bebas text-destructive line-through opacity-50"
            >
              UNSOLD
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ActivitySection;
