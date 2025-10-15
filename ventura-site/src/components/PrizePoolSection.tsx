import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Coins } from "lucide-react";

const PrizePoolSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="prize" ref={ref} className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1C0A22] to-black" />
      
      {/* Spotlight effect from top */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
      />
      
      {/* Floating coin particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 50,
              rotate: 0,
              opacity: 0.4
            }}
            animate={{ 
              y: -50,
              rotate: [0, 360, 720],
              opacity: [0.4, 0.6, 0.4],
              x: Math.random() * window.innerWidth
            }}
            transition={{ 
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Coins className="w-8 h-8 text-accent/60 particle-glow" />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-bebas text-6xl md:text-8xl text-primary text-glow-intense mb-12"
        >
          VENTURA PRIZE POOL
        </motion.h2>
        
        {/* Glass Piggy Bank Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto max-w-2xl"
        >
          {/* Spotlight beam from above */}
          <motion.div
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scaleY: [0.95, 1, 0.95]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-96 -mt-96 bg-gradient-to-b from-primary/30 to-transparent blur-xl"
          />
          
          {/* Glass container with piggy bank */}
          <div className="relative bg-gradient-to-br from-card/40 to-card/20 border-2 border-primary/30 rounded-3xl p-16 backdrop-blur-sm">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
            
            {/* Pulsing glow around container */}
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 40px hsla(346, 100%, 52%, 0.3)",
                  "0 0 80px hsla(346, 100%, 52%, 0.5)",
                  "0 0 40px hsla(346, 100%, 52%, 0.3)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-3xl"
            />
            
            {/* Symbolic Piggy Bank (SVG-style representation) */}
            <motion.div
              animate={{ 
                y: [-10, 0, -10],
                rotateY: [0, 10, 0, -10, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Main piggy body */}
              <div className="relative mx-auto w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/40 flex items-center justify-center">
                {/* Inner glow */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-8 rounded-full bg-gradient-radial from-primary/30 to-transparent"
                />
                
                {/* Coin slot icon */}
                <div className="relative z-10">
                  <svg 
                    width="120" 
                    height="120" 
                    viewBox="0 0 120 120" 
                    className="text-primary drop-shadow-[0_0_20px_rgba(255,10,84,0.8)]"
                  >
                    {/* Piggy silhouette */}
                    <ellipse cx="60" cy="70" rx="45" ry="35" fill="currentColor" opacity="0.3" />
                    <circle cx="60" cy="60" r="35" fill="currentColor" opacity="0.4" />
                    
                    {/* Coin slot */}
                    <rect x="45" y="35" width="30" height="6" rx="2" fill="currentColor" />
                    
                    {/* Coins floating inside */}
                    <motion.circle
                      cx="50"
                      cy="60"
                      r="8"
                      fill="hsl(330, 100%, 50%)"
                      animate={{ 
                        y: [0, -5, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: 0
                      }}
                    />
                    <motion.circle
                      cx="70"
                      cy="65"
                      r="6"
                      fill="hsl(330, 100%, 50%)"
                      animate={{ 
                        y: [0, -5, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.3
                      }}
                    />
                    <motion.circle
                      cx="60"
                      cy="70"
                      r="7"
                      fill="hsl(330, 100%, 50%)"
                      animate={{ 
                        y: [0, -5, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.6
                      }}
                    />
                  </svg>
                </div>
              </div>
              
              {/* Reflection on glass */}
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
            </motion.div>
            
            {/* Floating currency symbols around */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute text-accent/40"
                  style={{
                    left: `${15 + (i * 15)}%`,
                    top: `${30 + Math.sin(i) * 30}%`
                  }}
                  animate={{ 
                    y: [-20, 20, -20],
                    rotate: [0, 360],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ 
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <Coins className="w-6 h-6" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-orbitron text-xl md:text-2xl text-foreground/80 mt-12 tracking-wider"
        >
          WHERE <span className="text-accent font-semibold">INNOVATION</span> MEETS <span className="text-primary font-semibold">REWARD</span>
        </motion.p>
        
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-8 max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default PrizePoolSection;
