import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";

interface Coordinator {
  name: string;
  phone: string;
  year: string;
}

interface EventCard3DProps {
  id: number;
  title: string;
  theme: string;
  tagline: string;
  coordinators: Coordinator[];
  image: string;
  accentColor: string;
  delay: number;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  position: { x: number; y: number };
}

const EventCard3D: React.FC<EventCard3DProps> = ({
  title,
  theme,
  tagline,
  coordinators,
  image,
  accentColor,
  delay,
  index,
  isHovered,
  onHover,
  onLeave,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();
  
  // Animation controls for complex sequences
  const controls = useAnimation();

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Transform mouse position to rotation values - more dramatic for impressive effects
  const rotateX = useTransform(springY, [-0.5, 0.5], [25, -25]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  
  // Enhanced levitation effect with depth changes
  const levitateY = useTransform(springY, [-0.5, 0.5], [-30, -60]);
  const levitateZ = useTransform(springX, [-0.5, 0.5], [20, 80]);
  
  // Depth-changing scale effect
  const depthScale = useTransform(springY, [-0.5, 0.5], [1.02, 1.15]);
  
  // Particle system for interaction effects
  useEffect(() => {
    if (isHovered || isFocused) {
      const interval = setInterval(() => {
        createParticleBurst();
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isHovered, isFocused]);
  
  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.2, // gravity
        })).filter(particle => 
          particle.y < 600 && particle.x > -50 && particle.x < 450
        )
      );
      
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };
    
    if (particles.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length]);
  
  const createParticleBurst = () => {
    const newParticles = Array.from({ length: 8 }, () => ({
      id: particleIdRef.current++,
      x: Math.random() * 400,
      y: Math.random() * 300 + 100,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 3 - 2,
    }));
    
    setParticles(prev => [...prev, ...newParticles].slice(-50)); // Limit particles
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXPercent = (e.clientX - centerX) / (rect.width / 2);
    const mouseYPercent = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(mouseXPercent);
    mouseY.set(mouseYPercent);
    
    // Trigger particle burst on mouse movement when hovered
    if (isHovered && Math.random() > 0.7) {
      createParticleBurst();
    }
  };

  const handleMouseEnter = () => {
    onHover();
    // Trigger impressive entrance animation sequence
    controls.start({
      scale: [1, 1.1, 1.05],
      rotateZ: [0, 2, 0],
      transition: { duration: 0.6, ease: "easeOut" }
    });
    
    // Create initial particle burst
    createParticleBurst();
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setParticles([]); // Clear particles
    onLeave();
    
    // Reset animation
    controls.start({
      scale: 1,
      rotateZ: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipping(true);
    setIsFlipped(!isFlipped);
    
    // Reset mouse position to prevent tilt during flip
    mouseX.set(0);
    mouseY.set(0);
    
    // Reset flipping state after animation completes (0.8s)
    setTimeout(() => {
      setIsFlipping(false);
    }, 800);
    
    // Create explosion effect
    const explosionParticles = Array.from({ length: 15 }, () => ({
      id: particleIdRef.current++,
      x: 200 + (Math.random() - 0.5) * 100,
      y: 300 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 6 - 3,
    }));
    
    setParticles(prev => [...prev, ...explosionParticles]);
  };

  const handleFocus = () => {
    setIsFocused(true);
    
    // Depth-changing focus animation
    controls.start({
      z: [0, 100, 80],
      scale: [1, 1.15, 1.1],
      rotateX: [0, -5, -3],
      transition: { duration: 0.8, ease: "easeOut" }
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    controls.start({
      z: 0,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative preserve-3d cursor-pointer"
      style={{
        perspective: "1000px",
      }}
      initial={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1
      }}
      transition={{ 
        duration: 0.5, 
        delay: 0,
        ease: "easeOut"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      animate={controls}
    >
      {/* Card Container with 3D transforms */}
      <motion.div
        className="relative w-full h-[450px] md:h-[540px]"
        style={{
          transformStyle: "preserve-3d",
        }}
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Inner container for hover effects */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: (!isFlipped && (isHovered || isFocused)) ? (rotateX as any) : 0,
            y: (!isFlipped && (isHovered || isFocused)) ? (levitateY as any) : 0,
            z: !isFlipped && isHovered ? 60 : !isFlipped && isFocused ? 100 : 0,
            scale: !isFlipped && isHovered ? 1.08 : !isFlipped && isFocused ? 1.12 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(0px)",
          }}
        >
          {/* Card Image Background */}
          <div className="relative h-full overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.2 : 1.1,
                rotate: isHovered ? 2 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
              animate={{
                opacity: isHovered ? 1 : 0.9,
              }}
              transition={{ duration: 0.7 }}
            />
            
            {/* Dynamic Accent Glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 50%)`,
              }}
              animate={{
                opacity: isHovered ? 0.4 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.7 }}
            />
            
            {/* Floating Border Effects */}
            <motion.div 
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: isHovered 
                  ? `0 0 60px ${accentColor}, 0 0 100px ${accentColor}80, inset 0 0 40px ${accentColor}20`
                  : "none",
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.7 }}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <motion.div
              animate={{
                y: isHovered ? -24 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.p 
                className="text-sm font-semibold text-muted-foreground mb-2 tracking-wider uppercase"
                animate={{
                  letterSpacing: isHovered ? "0.2em" : "0.1em",
                  color: isHovered ? accentColor : undefined,
                }}
                transition={{ duration: 0.5 }}
              >
                Theme: {theme}
              </motion.p>
              
              <motion.h3 
                className="text-3xl md:text-4xl font-bold mb-3 text-foreground"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              >
                {title}
              </motion.h3>
              
              <motion.p 
                className="text-lg md:text-xl font-semibold mb-6"
                style={{ color: accentColor }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              >
                {tagline}
              </motion.p>

              {/* Flip Indicator */}
              <motion.div
                className="text-xs text-muted-foreground opacity-60"
                animate={{
                  opacity: isHovered ? 1 : 0.6,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                Click to flip for details →
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Back Face - Coordinators Details */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
            background: `linear-gradient(135deg, ${accentColor}20, transparent 50%, ${accentColor}10)`,
          }}
        >
          <div className="relative h-full p-8 flex flex-col justify-center bg-card/90 backdrop-blur-md">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-6 text-center"
              style={{ color: accentColor }}
            >
              {title}
            </motion.h3>
            
            <motion.p className="text-center text-muted-foreground mb-8 uppercase tracking-widest text-sm font-semibold">
              Event Coordinators
            </motion.p>
            
            <div className="space-y-4">
              {coordinators.map((coord, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-primary/30 hover:border-primary transition-all duration-300"
                  style={{ 
                    boxShadow: `0 0 20px ${accentColor}30`,
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 30px ${accentColor}50`,
                  }}
                >
                  <p className="font-semibold text-foreground">{coord.name}</p>
                  <p className="text-sm text-muted-foreground">{coord.phone}</p>
                  <p className="text-sm font-medium" style={{ color: accentColor }}>{coord.year}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="text-xs text-muted-foreground opacity-60 text-center mt-6"
            >
              Click to flip back ←
            </motion.div>
          </div>
        </motion.div>

        {/* 3D Depth Shadow - hidden during flip and hover */}
        {!isFlipped && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              transform: "translateZ(-10px)",
              background: "rgba(0,0,0,0.3)",
              filter: "blur(10px)",
            }}
            initial={false}
            animate={{
              opacity: (isFlipping || isHovered) ? 0 : 0.3,
              scale: 1,
            }}
            transition={{ 
              opacity: { duration: 0.4, ease: "easeInOut" },
              scale: { duration: 0.7 }
            }}
          />
        )}
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Particles Effect */}
      {(isHovered || isFocused) && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{ 
                background: `linear-gradient(45deg, ${accentColor}, ${accentColor}80)`,
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 4) * 18}%`,
                boxShadow: `0 0 10px ${accentColor}`,
              }}
              animate={{
                y: [-15, -45, -15],
                x: [0, (i % 2 ? 10 : -10), 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.6, 1.4, 0.6],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}

      {/* Dynamic Particle System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${accentColor}, transparent)`,
              left: particle.x,
              top: particle.y,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
            animate={{
              opacity: [1, 0],
              scale: [0.5, 1.5, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Depth Focus Ring Effect */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${accentColor}, inset 0 0 40px ${accentColor}20`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Enhanced 3D Shadow with Depth - hidden during flip and hover */}
      {!isFlipped && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            transform: "translateZ(-15px)",
            background: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))`,
            filter: "blur(15px)",
          }}
          initial={false}
          animate={{
            opacity: (isFlipping || isHovered) ? 0 : (isFocused ? 0.9 : 0.4),
            scale: isFocused ? 1.2 : 1,
            x: isFocused ? 15 : 0,
            y: isFocused ? 15 : 0,
          }}
          transition={{ 
            opacity: { duration: 0.4, ease: "easeInOut" },
            scale: { duration: 0.6 },
            x: { duration: 0.6 },
            y: { duration: 0.6 }
          }}
        />
      )}
    </motion.div>
  );
};

export default EventCard3D;