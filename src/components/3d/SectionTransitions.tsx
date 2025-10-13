import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

interface SectionTransitionsProps {
  children: React.ReactNode;
  transitionType?: 'morph' | 'explode' | 'spiral' | 'cascade' | 'dimensional';
  intensity?: 'light' | 'medium' | 'heavy';
  enableParticleTrails?: boolean;
  enable3DPerspective?: boolean;
  className?: string;
}

const SectionTransitions: React.FC<SectionTransitionsProps> = ({
  children,
  transitionType = 'morph',
  intensity = 'heavy',
  enableParticleTrails = true,
  enable3DPerspective = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress into dramatic perspective shifts
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, -200]);

  // Dramatic multi-layered transition variants
  const getTransitionVariants = useCallback(() => {
    const intensityMultiplier = {
      light: 1,
      medium: 1.5,
      heavy: 2.5,
    }[intensity];

    const variants = {
      morph: {
        initial: {
          opacity: 0,
          scale: 0.3,
          rotateX: -90 * intensityMultiplier,
          rotateY: 180 * intensityMultiplier,
          rotateZ: 45,
          skewX: 20,
          skewY: 10,
          z: -500,
        },
        animate: {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          skewX: 0,
          skewY: 0,
          z: 0,
          transition: {
            duration: 2.5,
            ease: [0.23, 1, 0.32, 1],
            staggerChildren: 0.15,
            delayChildren: 0.3,
          }
        },
        exit: {
          opacity: 0,
          scale: 0.1,
          rotateX: 90 * intensityMultiplier,
          rotateY: -180 * intensityMultiplier,
          z: 500,
          transition: {
            duration: 1.5,
            ease: [0.55, 0.085, 0.68, 0.53],
          }
        }
      },
      explode: {
        initial: {
          opacity: 0,
          scale: 5 * intensityMultiplier,
          rotate: 720,
          rotateX: 360,
          rotateY: 360,
          z: 1000,
        },
        animate: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          transition: {
            duration: 2,
            ease: [0.19, 1, 0.22, 1],
            staggerChildren: 0.08,
          }
        },
        exit: {
          opacity: 0,
          scale: 0.1,
          rotate: -360,
          z: -1000,
          transition: {
            duration: 1,
            ease: "easeInBack",
          }
        }
      },
      spiral: {
        initial: {
          opacity: 0,
          scale: 0.1,
          rotate: -1080 * intensityMultiplier,
          rotateX: 180,
          rotateY: 180,
          z: -800,
          x: 200,
          y: 200,
        },
        animate: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          x: 0,
          y: 0,
          transition: {
            duration: 3,
            ease: [0.175, 0.885, 0.32, 1.275],
            staggerChildren: 0.12,
          }
        },
        exit: {
          opacity: 0,
          scale: 0.1,
          rotate: 1080 * intensityMultiplier,
          z: 800,
          x: -200,
          y: -200,
          transition: {
            duration: 2,
            ease: "easeInQuart",
          }
        }
      },
      cascade: {
        initial: {
          opacity: 0,
          y: 300 * intensityMultiplier,
          rotateX: -120,
          scale: 0.5,
          z: -300,
        },
        animate: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          z: 0,
          transition: {
            duration: 2.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.2,
            delayChildren: 0.1,
          }
        },
        exit: {
          opacity: 0,
          y: -300 * intensityMultiplier,
          rotateX: 120,
          scale: 0.5,
          z: 300,
          transition: {
            duration: 1.5,
            ease: "easeInExpo",
          }
        }
      },
      dimensional: {
        initial: {
          opacity: 0,
          scale: 0.2,
          rotateX: -180 * intensityMultiplier,
          rotateY: -180 * intensityMultiplier,
          rotateZ: -180 * intensityMultiplier,
          z: -1000,
          skewX: 45,
          skewY: 45,
        },
        animate: {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          z: 0,
          skewX: 0,
          skewY: 0,
          transition: {
            duration: 3.5,
            ease: [0.68, -0.55, 0.265, 1.55],
            staggerChildren: 0.1,
          }
        },
        exit: {
          opacity: 0,
          scale: 0.1,
          rotateX: 180 * intensityMultiplier,
          rotateY: 180 * intensityMultiplier,
          rotateZ: 180 * intensityMultiplier,
          z: 1000,
          transition: {
            duration: 2,
            ease: "easeInCubic",
          }
        }
      }
    };

    return variants[transitionType];
  }, [transitionType, intensity]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        perspective: enable3DPerspective ? '2000px' : 'none',
        transformStyle: enable3DPerspective ? 'preserve-3d' : 'flat',
      }}
    >
      {/* Particle trail system for dramatic effects */}
      {enableParticleTrails && (
        <ParticleTrailSystem 
          intensity={intensity} 
          transitionType={transitionType}
          scrollProgress={scrollYProgress}
        />
      )}

      {/* Main content with 3D perspective transforms */}
      <motion.div
        style={enable3DPerspective ? {
          rotateX,
          rotateY,
          scale,
          z,
        } : {}}
        variants={getTransitionVariants()}
        initial="initial"
        whileInView="animate"
        exit="exit"
        viewport={{ once: true, margin: "-20%" }}
        className="transform-gpu"
      >
        {/* Multi-layered content wrapper */}
        <motion.div
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              }
            }
          }}
        >
          {children}
        </motion.div>

        {/* 3D depth layers for enhanced dimensionality */}
        {enable3DPerspective && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"
              initial={{ opacity: 0, z: -50 }}
              whileInView={{ opacity: 1, z: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tl from-cyan-500/3 to-indigo-500/3 pointer-events-none"
              initial={{ opacity: 0, z: -100 }}
              whileInView={{ opacity: 1, z: 0 }}
              transition={{ duration: 2.5, delay: 0.8 }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// Enhanced particle trail system for spectacular visual effects
const ParticleTrailSystem: React.FC<{
  intensity: 'light' | 'medium' | 'heavy';
  transitionType: string;
  scrollProgress: any;
}> = ({ intensity, transitionType, scrollProgress }) => {
  const particleCount = {
    light: 15,
    medium: 30,
    heavy: 60,
  }[intensity];

  const trailColors = {
    morph: ['#3B82F6', '#8B5CF6', '#06B6D4'],
    explode: ['#EF4444', '#F59E0B', '#10B981'],
    spiral: ['#8B5CF6', '#EC4899', '#06B6D4'],
    cascade: ['#06B6D4', '#3B82F6', '#6366F1'],
    dimensional: ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981'],
  }[transitionType] || ['#3B82F6', '#8B5CF6'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: particleCount }).map((_, i) => {
        const color = trailColors[i % trailColors.length];
        const delay = (i / particleCount) * 2;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: color,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${color}`,
            }}
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0,
              opacity: 0,
            }}
            whileInView={{
              x: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
              y: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Streaming particle effects */}
      {Array.from({ length: Math.floor(particleCount / 3) }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px bg-gradient-to-b from-blue-400 via-purple-400 to-transparent"
          style={{
            height: Math.random() * 200 + 100,
            left: Math.random() * 100 + '%',
          }}
          initial={{
            y: '-100%',
            opacity: 0,
            scaleY: 0,
          }}
          whileInView={{
            y: '100vh',
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            repeatDelay: Math.random() * 4,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default SectionTransitions;