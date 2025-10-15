import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import SVGGuard from "./SVGGuard";

const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen md:min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-squid-charcoal to-black" />
      
      {/* Red glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50" />
      
      {/* Floating shapes */}
      <FloatingShapes />
      
      {/* Two Guard Characters flanking the scene */}
      <div className="absolute right-2 sm:right-10 md:right-20 bottom-0 z-10">
        <SVGGuard className="h-[180px] sm:h-[250px] md:h-[300px] lg:h-[400px]" delay={1.5} />
      </div>
      
      <div className="absolute left-2 sm:left-10 md:left-20 bottom-0 z-10">
        <SVGGuard className="h-[180px] sm:h-[250px] md:h-[300px] lg:h-[400px]" delay={1.8} flip />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-bebas text-7xl sm:text-9xl md:text-[12rem] lg:text-[16rem] text-primary animate-glow-pulse leading-none">
            VENTURA
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-orbitron text-base sm:text-xl md:text-3xl text-foreground mt-3 sm:mt-8 tracking-widest"
        >
          PLAY. SURVIVE. CONQUER.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
          className="mt-6 sm:mt-16 px-6 py-3 sm:px-8 sm:py-4 border-2 border-primary text-primary text-sm sm:text-base font-orbitron font-semibold tracking-wider hover:bg-primary hover:text-black transition-all duration-300 box-glow"
        >
          REGISTER NOW
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
