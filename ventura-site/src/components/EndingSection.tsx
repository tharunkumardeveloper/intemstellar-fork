import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RotateCcw } from "lucide-react";
import SVGGuard from "./SVGGuard";

const EndingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handlePlayAgain = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <section id="ending" ref={ref} className="relative py-16 md:py-20 px-4 flex items-center justify-center min-h-[80vh] md:min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-squid-charcoal" />
      
      {/* Final pulse effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent"
      />
      
      {/* Guard Leaving */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 0 }}
        animate={isInView ? { opacity: [0, 0.6, 0], y: [0, 0, 100] } : {}}
        transition={{ duration: 4, delay: 2 }}
      >
        <SVGGuard className="h-[300px] md:h-[400px]" delay={2} />
      </motion.div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h2 className="font-bebas text-5xl sm:text-8xl md:text-9xl text-primary text-glow-intense mb-4 animate-flicker">
            GAME OVER
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto max-w-2xl mb-8"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="font-orbitron text-lg sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-8 tracking-wider">
            THANK YOU FOR PLAYING
          </h3>
          <p className="font-bebas text-3xl sm:text-6xl md:text-7xl text-accent text-glow mb-8 sm:mb-16">
            VENTURA
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-8"
        >
          <button
            onClick={handlePlayAgain}
            className="group relative px-8 py-4 sm:px-12 sm:py-6 border-2 border-primary text-primary font-orbitron font-semibold text-base sm:text-xl tracking-wider hover:bg-primary hover:text-black transition-all duration-300 box-glow inline-flex items-center gap-3"
          >
            <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            PLAY AGAIN
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
            <p className="font-orbitron text-lg text-muted-foreground tracking-widest">
              PRESENTED BY
            </p>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary" />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-bebas text-2xl sm:text-4xl text-foreground tracking-wider">
              IEEE TEMS
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Technology & Engineering Management Society
            </p>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground/60">
            <p>© 2025 IEEE TEMS. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EndingSection;
