import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ClickEffect {
  id: number;
  position: THREE.Vector3;
  startTime: number;
  duration: number;
  intensity: number;
  color: THREE.Color;
}

interface ClickFeedbackSystemProps {
  maxEffects?: number;
  effectDuration?: number;
  colors?: string[];
}

const ClickFeedbackSystem: React.FC<ClickFeedbackSystemProps> = ({
  maxEffects = 10,
  effectDuration = 1.5,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff', '#f59e0b']
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking and click detection
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    const handleClick = (event: MouseEvent) => {
      const worldPos = new THREE.Vector3(
        ((event.clientX / window.innerWidth) * 2 - 1) * 10,
        (-(event.clientY / window.innerHeight) * 2 + 1) * 6,
        0
      );

      const newEffect: ClickEffect = {
        id: Date.now() + Math.random(),
        position: worldPos,
        startTime: Date.now(),
        duration: effectDuration * 1000,
        intensity: 1 + Math.random() * 0.5,
        color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
      };

      setClickEffects(prev => {
        const updated = [...prev, newEffect];
        // Keep only the most recent effects
        return updated.slice(-maxEffects);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [colors, effectDuration, maxEffects]);

  // Clean up expired effects
  useFrame(() => {
    const now = Date.now();
    setClickEffects(prev =>
      prev.filter(effect => now - effect.startTime < effect.duration)
    );
  });

  return (
    <group ref={groupRef}>
      {clickEffects.map((effect) => (
        <ClickEffectRing key={effect.id} effect={effect} />
      ))}
    </group>
  );
};

// Individual click effect component
const ClickEffectRing: React.FC<{ effect: ClickEffect }> = ({ effect }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!ringRef.current && !particlesRef.current) return;

    const elapsed = Date.now() - effect.startTime;
    const progress = elapsed / effect.duration;

    if (progress >= 1) return;

    // Animate expanding ring
    if (ringRef.current) {
      const scale = 1 + progress * 3 * effect.intensity;
      ringRef.current.scale.setScalar(scale);

      const opacity = Math.max(0, 1 - progress);
      if (ringRef.current.material instanceof THREE.MeshBasicMaterial) {
        ringRef.current.material.opacity = opacity;
      }
    }

    // Animate particle burst
    if (particlesRef.current) {
      const particleScale = 1 + progress * 2;
      particlesRef.current.scale.setScalar(particleScale);

      if (particlesRef.current.material instanceof THREE.PointsMaterial) {
        particlesRef.current.material.opacity = Math.max(0, 1 - progress * 1.5);
      }
    }
  });

  // Create particle positions for burst effect
  const particleCount = 20;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 0.1 + Math.random() * 0.3;

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

    colors[i * 3] = effect.color.r;
    colors[i * 3 + 1] = effect.color.g;
    colors[i * 3 + 2] = effect.color.b;
  }

  return (
    <group position={effect.position}>
      {/* Expanding ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.1, 0.15, 16]} />
        <meshBasicMaterial
          color={effect.color}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Particle burst */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default ClickFeedbackSystem;