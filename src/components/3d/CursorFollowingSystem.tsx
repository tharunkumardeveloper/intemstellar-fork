import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CursorParticle {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
  opacity: number;
}

interface CursorFollowingSystemProps {
  particleCount?: number;
  trailLength?: number;
  colors?: string[];
  size?: number;
  speed?: number;
  contextualEffects?: boolean;
}

const CursorFollowingSystem: React.FC<CursorFollowingSystemProps> = ({
  particleCount = 50,
  trailLength = 20,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff', '#f59e0b'],
  size = 0.02,
  speed = 1.0,
  contextualEffects = true
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  const particles = useRef<CursorParticle[]>([]);
  const particlePositions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const particleColors = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const particleSizes = useRef<Float32Array>(new Float32Array(particleCount));

  // Initialize particles
  useEffect(() => {
    particles.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      life: 0,
      maxLife: Math.random() * 2 + 1,
      size: size * (0.5 + Math.random() * 0.5),
      color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]),
      opacity: 0
    }));
  }, [particleCount, colors, size]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Section detection for contextual effects
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.5) {
        setCurrentSection('hero');
      } else if (scrollY < windowHeight * 1.5) {
        setCurrentSection('events');
      } else if (scrollY < windowHeight * 2.5) {
        setCurrentSection('about');
      } else {
        setCurrentSection('contact');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get contextual colors based on current section
  const getContextualColors = useCallback(() => {
    switch (currentSection) {
      case 'hero':
        return ['#3b82f6', '#8b5cf6', '#ffffff'];
      case 'events':
        return ['#06b6d4', '#3b82f6', '#f59e0b'];
      case 'about':
        return ['#8b5cf6', '#ec4899', '#ffffff'];
      case 'contact':
        return ['#10b981', '#3b82f6', '#f59e0b'];
      default:
        return colors;
    }
  }, [currentSection, colors]);

  useFrame((state) => {
    if (!particlesRef.current || !geometryRef.current) return;

    const time = state.clock.getElapsedTime();
    const deltaTime = state.clock.getDelta();

    // Convert mouse position to world coordinates
    const mouseWorldPos = new THREE.Vector3(
      mousePosition.x * 10,
      mousePosition.y * 6,
      0
    );

    // Update particles
    particles.current.forEach((particle, index) => {
      // Update particle life
      particle.life += deltaTime;

      if (particle.life > particle.maxLife) {
        // Reset particle near mouse position
        particle.position.copy(mouseWorldPos);
        particle.position.add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.2
        ));
        particle.life = 0;
        particle.maxLife = Math.random() * 2 + 1;

        // Set contextual color if enabled
        if (contextualEffects) {
          const contextColors = getContextualColors();
          particle.color.set(contextColors[Math.floor(Math.random() * contextColors.length)]);
        }

        // Enhanced effects when clicking
        if (isClicking) {
          particle.velocity.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 2
          );
          particle.size = size * (1 + Math.random() * 2);
        } else {
          particle.velocity.set(
            (Math.random() - 0.5) * 1,
            (Math.random() - 0.5) * 1,
            (Math.random() - 0.5) * 0.5
          );
          particle.size = size * (0.5 + Math.random() * 0.5);
        }
      }

      // Update position with trailing effect
      const targetPos = mouseWorldPos.clone();
      targetPos.add(new THREE.Vector3(
        Math.sin(time + index * 0.1) * 0.3,
        Math.cos(time + index * 0.15) * 0.2,
        Math.sin(time * 0.5 + index * 0.05) * 0.1
      ));

      // Smooth following with delay based on particle index
      const followSpeed = speed * (1 - (index / particleCount) * 0.8);
      particle.position.lerp(targetPos, deltaTime * followSpeed);

      // Apply velocity
      particle.position.add(particle.velocity.clone().multiplyScalar(deltaTime));

      // Damping
      particle.velocity.multiplyScalar(0.95);

      // Update opacity based on life
      const lifeRatio = particle.life / particle.maxLife;
      particle.opacity = Math.sin(lifeRatio * Math.PI) * (isClicking ? 1.5 : 1);

      // Update buffer arrays
      const i3 = index * 3;
      particlePositions.current[i3] = particle.position.x;
      particlePositions.current[i3 + 1] = particle.position.y;
      particlePositions.current[i3 + 2] = particle.position.z;

      particleColors.current[i3] = particle.color.r * particle.opacity;
      particleColors.current[i3 + 1] = particle.color.g * particle.opacity;
      particleColors.current[i3 + 2] = particle.color.b * particle.opacity;

      particleSizes.current[index] = particle.size * (isClicking ? 2 : 1);
    });

    // Update geometry attributes
    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.attributes.color.needsUpdate = true;
    geometryRef.current.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlePositions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particleColors.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particleSizes.current}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default CursorFollowingSystem;