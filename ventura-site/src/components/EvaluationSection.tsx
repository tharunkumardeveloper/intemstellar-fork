import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Eye } from "lucide-react";

const EvaluationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [flipped, setFlipped] = useState<number | null>(null);

  const criteria = [
    { 
      title: "Creativity & Innovation", 
      percentage: 20,
      description: "Originality and uniqueness of the business idea"
    },
    { 
      title: "Presentation Clarity", 
      percentage: 20,
      description: "How well the idea is communicated and structured"
    },
    { 
      title: "Business Feasibility", 
      percentage: 25,
      description: "Practicality and market viability of the proposal"
    },
    { 
      title: "Confidence & Power", 
      percentage: 15,
      description: "Conviction and persuasiveness of the pitch"
    },
    { 
      title: "Judge Investment", 
      percentage: 15,
      description: "Amount invested by expert judges"
    },
    { 
      title: "Audience Impact", 
      percentage: 5,
      description: "Crowd engagement and response"
    },
  ];

  return (
    <section id="evaluation" ref={ref} className="relative py-12 md:py-20 px-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-squid-charcoal to-black" />
      
      {/* Red lighting flashes */}
      <motion.div
        animate={{ 
          opacity: [0, 0.15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 w-full h-full bg-primary/20 pointer-events-none"
      />
      
      {/* Front Man Watching Symbol */}
      <motion.div 
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary/50 flex items-center justify-center bg-black/50 backdrop-blur">
            <Eye className="w-16 h-16 text-primary" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-4 border-primary/30"
          />
        </div>
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-bebas text-4xl sm:text-6xl md:text-8xl text-primary text-glow text-center mb-8 sm:mb-20"
        >
          EVALUATION CRITERIA
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {criteria.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-48 sm:h-64 cursor-pointer"
              onMouseEnter={() => setFlipped(index)}
              onMouseLeave={() => setFlipped(null)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 ${flipped === index ? '[transform:rotateY(180deg)]' : ''}`}
                   style={{ transformStyle: 'preserve-3d' }}>
                {/* Front */}
                <div className="absolute inset-0 bg-card border border-primary/30 p-4 sm:p-8 rounded-lg flex flex-col items-center justify-center text-center"
                     style={{ backfaceVisibility: 'hidden' }}>
                  <div className="mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-6xl font-bebas text-primary text-glow-intense">
                      {item.percentage}%
                    </div>
                  </div>
                  <h3 className="font-orbitron text-base sm:text-xl text-foreground">{item.title}</h3>
                  
                  {/* Progress bar */}
                  <div className="w-full mt-6 bg-secondary rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.percentage}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-accent animate-pulse-glow"
                    />
                  </div>
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary p-4 sm:p-8 rounded-lg flex items-center justify-center text-center box-glow-intense"
                     style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-foreground/90 text-sm sm:text-lg">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvaluationSection;
