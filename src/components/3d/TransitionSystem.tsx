import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import SectionTransitions from './SectionTransitions';

interface TransitionSystemProps {
  children: React.ReactNode;
  sectionId: string;
  animationType?: 'slide' | 'rotate' | 'scale' | 'morph' | 'explode';
  transitionType?: 'morph' | 'explode' | 'spiral' | 'cascade' | 'dimensional';
  intensity?: 'light' | 'medium' | 'heavy';
  enableAdvancedEffects?: boolean;
  className?: string;
}

const TransitionSystem: React.FC<TransitionSystemProps> = ({
  children,
  sectionId,
  animationType = 'morph',
  transitionType = 'dimensional',
  intensity = 'heavy',
  enableAdvancedEffects = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animations for scroll-based effects
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Complex 3D perspective transforms based on scroll
  const perspective = useTransform(smoothProgress, [0, 0.5, 1], [2000, 1000, 2000]);
  const rotateX = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [20, -5, 5, -20]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-15, 0, 15]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.85, 1.05, 1.05, 0.85]);
  const z = useTransform(smoothProgress, [0, 0.5, 1], [-300, 50, -300]);

  // Enhanced intersection observer for precise timing
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: enableAdvancedEffects ? perspective : 1000,
        transformStyle: 'preserve-3d',
      }}
      data-section-id={sectionId}
    >
      {/* Background depth layers */}
      {enableAdvancedEffects && (
        <DepthLayers scrollProgress={smoothProgress} intensity={intensity} />
      )}

      {/* Main transition wrapper */}
      <SectionTransitions
        transitionType={transitionType}
        intensity={intensity}
        enableParticleTrails={enableAdvancedEffects}
        enable3DPerspective={enableAdvancedEffects}
        className="relative z-10"
      >
        {/* Animated section content */}
        <AnimatedSection
          animationType={animationType}
          intensity={intensity}
          enableParticles={enableAdvancedEffects}
          enable3D={enableAdvancedEffects}
          className="relative"
        >
          {/* Content with scroll-based 3D transforms */}
          <motion.div
            style={enableAdvancedEffects ? {
              rotateX,
              rotateY,
              scale,
              z,
            } : {}}
            className="transform-gpu"
          >
            {children}
          </motion.div>
        </AnimatedSection>
      </SectionTransitions>

      {/* Floating geometric elements for enhanced depth */}
      {enableAdvancedEffects && isVisible && (
        <FloatingGeometry 
          sectionId={sectionId} 
          intensity={intensity}
          scrollProgress={smoothProgress}
        />
      )}
    </motion.div>
  );
};

// Depth layers component for enhanced 3D feeling
const DepthLayers: React.FC<{
  scrollProgress: any;
  intensity: 'light' | 'medium' | 'heavy';
}> = ({ scrollProgress, intensity }) => {
  const layerCount = {
    light: 2,
    medium: 3,
    heavy: 5,
  }[intensity];

  const layers = Array.from({ length: layerCount }, (_, i) => {
    const depth = (i + 1) * -100;
    const opacity = 0.1 - (i * 0.02);
    const scale = useTransform(scrollProgress, [0, 1], [1 - (i * 0.1), 1 + (i * 0.05)]);
    const y = useTransform(scrollProgress, [0, 1], [0, depth * 0.5]);

    return (
      <motion.div
        key={i}
        className="absolute inset-0 pointer-events-none"
        style={{
          z: depth,
          scale,
          y,
          opacity,
          background: `radial-gradient(circle at ${50 + (i * 10)}% ${50 - (i * 5)}%, 
                      rgba(59, 130, 246, ${opacity}) 0%, 
                      rgba(139, 92, 246, ${opacity * 0.5}) 50%, 
                      transparent 100%)`,
        }}
      />
    );
  });

  return <>{layers}</>;
};

// Floating geometric elements for enhanced visual depth
const FloatingGeometry: React.FC<{
  sectionId: string;
  intensity: 'light' | 'medium' | 'heavy';
  scrollProgress: any;
}> = ({ sectionId, intensity, scrollProgress }) => {
  const elementCount = {
    light: 3,
    medium: 6,
    heavy: 12,
  }[intensity];

  const shapes = ['circle', 'square', 'triangle', 'diamond'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: elementCount }).map((_, i) => {
        const shape = shapes[i % shapes.length];
        const size = Math.random() * 20 + 10;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        
        const x = useTransform(scrollProgress, [0, 1], [initialX, initialX + (Math.random() * 40 - 20)]);
        const y = useTransform(scrollProgress, [0, 1], [initialY, initialY + (Math.random() * 60 - 30)]);
        const rotate = useTransform(scrollProgress, [0, 1], [0, 360 + (Math.random() * 360)]);
        const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]);

        return (
          <motion.div
            key={`${sectionId}-geo-${i}`}
            className={`absolute opacity-20 ${getShapeClass(shape)}`}
            style={{
              width: size,
              height: size,
              x: `${initialX}%`,
              y: `${initialY}%`,
              rotate,
              scale,
              background: `linear-gradient(45deg, 
                          rgba(59, 130, 246, 0.3), 
                          rgba(139, 92, 246, 0.3))`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            whileInView={{
              opacity: 0.2,
              scale: 1,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 3,
            }}
          />
        );
      })}
    </div>
  );
};

// Helper function for shape classes
const getShapeClass = (shape: string): string => {
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-sm',
    triangle: 'rounded-sm transform rotate-45',
    diamond: 'rounded-sm transform rotate-45',
  };
  return shapeClasses[shape as keyof typeof shapeClasses] || 'rounded-full';
};

export default TransitionSystem;