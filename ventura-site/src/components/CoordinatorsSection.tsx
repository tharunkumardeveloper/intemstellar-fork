import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { User } from "lucide-react";

const CoordinatorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const coordinators = [
    { name: "Sanjay V", role: "2nd yr", phone: "+91 8610315770", type: "student" },
    { name: "Vetrichelva RS", role: "2nd yr", phone: "+91 93440 16363", type: "student" },
    { name: "Shaheen", role: "3rd yr", phone: "+91 78455 88146", type: "student" },
  ];

  return (
    <section id="coordinators" ref={ref} className="relative py-12 md:py-20 px-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-squid-charcoal/50 to-black" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-bebas text-4xl sm:text-6xl md:text-8xl text-primary text-glow text-center mb-8 sm:mb-20"
        >
          GAME MASTERS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {coordinators.map((coordinator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="relative overflow-hidden bg-card border border-primary/30 rounded-lg hover:border-primary transition-all duration-300 h-64 sm:h-80">
                {/* Mask overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b from-primary/40 to-black/80 transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`} />
                
                {/* Icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`p-8 rounded-full border-4 transition-all duration-500 ${
                    hoveredIndex === index 
                      ? 'border-primary bg-primary/20 animate-pulse-glow' 
                      : 'border-primary/30 bg-card'
                  }`}>
                    <User className={`w-24 h-24 transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                </div>
                
                {/* Content */}
                <div className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 text-center transition-all duration-500 ${
                  hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'
                }`}>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-foreground mb-2">{coordinator.name}</h3>
                  <div className="mb-2 inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-orbitron bg-primary/20 border border-primary text-primary">
                    {coordinator.role}
                  </div>
                  <p className="font-orbitron text-xs sm:text-sm text-muted-foreground mt-2">{coordinator.phone}</p>
                </div>
                
                {/* Pulse effect */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-primary rounded-lg"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;
