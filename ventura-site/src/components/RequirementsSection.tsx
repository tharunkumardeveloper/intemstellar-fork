import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Clock, Laptop, Mic, Coins, MapPin } from "lucide-react";

const RequirementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const requirements = [
    { icon: Users, label: "Volunteers", value: "5-6 Members" },
    { icon: Clock, label: "Duration", value: "2 Hours" },
    { icon: Laptop, label: "Equipment", value: "Projector & Screen" },
    { icon: Mic, label: "Audio", value: "Microphone System" },
    { icon: Coins, label: "Currency", value: "Fake Ventura Money" },
    { icon: MapPin, label: "Venue", value: "Large Auditorium" },
  ];

  return (
    <section id="requirements" ref={ref} className="relative py-12 md:py-20 px-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-squid-charcoal to-black" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-bebas text-4xl sm:text-6xl md:text-8xl text-primary text-glow text-center mb-8 sm:mb-20"
        >
          REQUIREMENTS
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {requirements.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Glowing border animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                
                <div className="relative bg-card border border-primary/30 p-4 sm:p-8 rounded-lg hover:border-primary transition-all duration-300 flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="p-4 rounded-full bg-primary/10 border border-primary/30 group-hover:animate-pulse-glow transition-all duration-300">
                    <Icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  
                  <div>
                    <h3 className="font-orbitron text-sm sm:text-lg text-muted-foreground mb-1 sm:mb-2">{item.label}</h3>
                    <p className="text-lg sm:text-2xl font-bebas text-foreground">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
