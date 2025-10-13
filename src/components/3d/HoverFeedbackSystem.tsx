import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HoverEffect {
  element: HTMLElement;
  position: THREE.Vector3;
  intensity: number;
  color: THREE.Color;
  isActive: boolean;
}

interface HoverFeedbackSystemProps {
  selector?: string;
  particleCount?: number;
  colors?: string[];
  intensity?: number;
}

const HoverFeedbackSystem: React.FC<HoverFeedbackSystemProps> = ({
  selector = 'button, a, .interactive',
  particleCount = 15,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4'],
  intensity = 1.0
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoverEffects, setHoverEffects] = useState<Map<HTMLElement, HoverEffect>>(new Map());
  const [activeElements, setActiveElements] = useState<Set<HTMLElement>>(new Set());

  // Track interactive elements
  useEffect(() => {
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    const effectsMap = new Map<HTMLElement, HoverEffect>();

    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const worldPos = new THREE.Vector3(
        ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1,
        -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1,
        0
      );

      worldPos.multiplyScalar(5); // Scale to world coordinates

      const effect: HoverEffect = {
        element,
        position: worldPos,
        intensity: intensity,
        color: new THREE.Color(colors[index % colors.length]),
        isActive: false
      };

      effectsMap.set(element, effect);

      // Add hover listeners
      const handleMouseEnter = () => {
        setActiveElements(prev => new Set(prev).add(element));
        effect.isActive = true;
      };

      const handleMouseLeave = () => {
        setActiveElements(prev => {
          const newSet = new Set(prev);
          newSet.delete(element);
          return newSet;
        });
        effect.isActive = false;
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      // Store cleanup functions
      element.dataset.hoverCleanup = 'true';
    });

    setHoverEffects(effectsMap);

    // Cleanup function
    return () => {
      elements.forEach(element => {
        if (element.dataset.hoverCleanup) {
          element.removeEventListener('mouseenter', () => {});
          element.removeEventListener('mouseleave', () => {});
          delete element.dataset.hoverCleanup;
        }
      });
    };
  }, [selector, colors, intensity]);

  // Update positions on scroll/resize
  useEffect(() => {
    const updatePositions = () => {
      hoverEffects.forEach((effect, element) => {
        const rect = element.getBoundingClientRect();
        const worldPos = new THREE.Vector3(
          ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1,
          -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1,
          0
        );
        worldPos.multiplyScalar(5);
        effect.position.copy(worldPos);
      });
    };

    window.addEventListener('scroll', updatePositions);
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('scroll', updatePositions);
      window.removeEventListener('resize', updatePositions);
    };
  }, [hoverEffects]);

  return (
    <group ref={groupRef}>
      {Array.from(hoverEffects.values()).map((effect, index) => (
        <HoverParticleEffect
          key={index}
          effect={effect}
          particleCount={particleCount}
          isActive={activeElements.has(effect.element)}
        />
      ))}
    </group>
  );
};

// Individual hover effect component
const HoverParticleEffect: React.FC<{
  effect: HoverEffect;
  particleCount: number;
  isActive: boolean;
}> = ({ effect, particleCount, isActive }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  
  const positions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const colors = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const sizes = useRef<Float32Array>(new Float32Array(particleCount));
  const velocities = useRef<THREE.Vector3[]>([]);

  // Initialize particles
  useEffect(() => {
    velocities.current = Array.from({ length: particleCount }, () => 
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      )
    );

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.2;
      
      positions.current[i * 3] = Math.cos(angle) * radius;
      positions.current[i * 3 + 1] = Math.sin(angle) * radius;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      
      colors.current[i * 3] = effect.color.r;
      colors.current[i * 3 + 1] = effect.color.g;
      colors.current[i * 3 + 2] = effect.color.b;
      
      sizes.current[i] = 0.02 + Math.random() * 0.03;
    }
  }, [effect.color, particleCount]);

  useFrame((state) => {
    if (!particlesRef.current || !geometryRef.current) return;

    const time = state.clock.getElapsedTime();
    const targetScale = isActive ? 1.5 : 0.3;
    const targetOpacity = isActive ? 1.0 : 0.2;

    // Update particle positions and properties
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Orbital motion
      const angle = (i / particleCount) * Math.PI * 2 + time * 0.5;
      const radius = (0.3 + Math.sin(time + i * 0.1) * 0.1) * targetScale;
      
      positions.current[i3] = Math.cos(angle) * radius;
      positions.current[i3 + 1] = Math.sin(angle) * radius;
      positions.current[i3 + 2] = Math.sin(time * 2 + i * 0.2) * 0.05;
      
      // Update colors with opacity
      colors.current[i3] = effect.color.r * targetOpacity;
      colors.current[i3 + 1] = effect.color.g * targetOpacity;
      colors.current[i3 + 2] = effect.color.b * targetOpacity;
      
      // Update sizes
      sizes.current[i] = (0.02 + Math.random() * 0.03) * targetScale;
    }

    // Update geometry
    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.attributes.color.needsUpdate = true;
    geometryRef.current.attributes.size.needsUpdate = true;

    // Update group position
    if (particlesRef.current.parent) {
      particlesRef.current.parent.position.copy(effect.position);
    }
  });

  return (
    <group position={effect.position}>
      <points ref={particlesRef}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions.current}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors.current}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={sizes.current}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default HoverFeedbackSystem;