import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleSystem from './ParticleSystem';

interface DepthLayersProps {
  layerCount?: number;
  particlesPerLayer?: number;
  maxDepth?: number;
  scrollMultiplier?: number;
}

interface Layer {
  depth: number;
  speed: number;
  particleCount: number;
  color: string;
  size: number;
  opacity: number;
}

const DepthLayers: React.FC<DepthLayersProps> = ({
  layerCount = 5,
  particlesPerLayer = 100,
  maxDepth = 20,
  scrollMultiplier = 0.5,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create layers with different depths and properties
  const layers = useMemo<Layer[]>(() => {
    const layerArray: Layer[] = [];
    
    for (let i = 0; i < layerCount; i++) {
      const depthRatio = i / (layerCount - 1);
      const depth = -maxDepth * depthRatio;
      
      layerArray.push({
        depth,
        speed: 0.2 + depthRatio * 0.8, // Closer layers move faster
        particleCount: Math.floor(particlesPerLayer * (1 - depthRatio * 0.5)), // More particles in front
        color: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
        size: 0.02 + depthRatio * 0.03, // Larger particles in back for depth illusion
        opacity: 0.3 + depthRatio * 0.4, // More opaque particles in back
      });
    }
    
    return layerArray;
  }, [layerCount, particlesPerLayer, maxDepth]);

  // Track scroll position for parallax effect
  const [scrollY, setScrollY] = React.useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Apply parallax scrolling to the entire group
    const scrollOffset = scrollY * scrollMultiplier;
    groupRef.current.position.y = scrollOffset * 0.001;
    
    // Individual layer animations
    groupRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Group) {
        const layer = layers[index];
        if (layer) {
          // Apply different scroll speeds based on depth
          const layerScrollOffset = scrollOffset * layer.speed * 0.001;
          child.position.y = layerScrollOffset;
          
          // Subtle rotation for depth effect
          child.rotation.z = Math.sin(time * 0.1 + index) * 0.02;
          child.rotation.x = Math.cos(time * 0.05 + index * 0.5) * 0.01;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, index) => (
        <group key={index} position={[0, 0, layer.depth]}>
          <ParticleSystem
            count={layer.particleCount}
            color={layer.color}
            size={layer.size}
            speed={0.5}
            interactive={false}
            scrollResponsive={true}
            opacity={layer.opacity}
            blending={THREE.AdditiveBlending}
          />
        </group>
      ))}
    </group>
  );
};

export default DepthLayers;