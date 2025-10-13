import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count: number;
  color: string | string[];
  size: number | [number, number];
  speed: number;
  interactive?: boolean;
  scrollResponsive?: boolean;
  shape?: 'sphere' | 'cube' | 'star' | 'custom';
  emissionRate?: number;
  life?: number;
  velocity?: [number, number, number];
  spread?: number;
  opacity?: number;
  blending?: THREE.Blending;
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
  active: boolean;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  color = '#ffffff',
  size = 0.02,
  speed = 0.01,
  interactive = true,
  scrollResponsive = true,
  shape = 'sphere',
  emissionRate = 10,
  life = 5,
  velocity = [0, 0.1, 0],
  spread = 1,
  opacity = 0.6,
  blending = THREE.AdditiveBlending,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { camera, gl } = useThree();
  
  // Mouse and scroll tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');

  // Particle pool for memory optimization
  const particles = useMemo<Particle[]>(() => {
    const particleArray: Particle[] = [];
    const colors = Array.isArray(color) ? color : [color];
    const sizeRange = Array.isArray(size) ? size : [size, size];
    
    for (let i = 0; i < count; i++) {
      const particleColor = colors[Math.floor(Math.random() * colors.length)];
      const particleSize = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
      
      particleArray.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * velocity[0] * spread,
          (Math.random() - 0.5) * velocity[1] * spread,
          (Math.random() - 0.5) * velocity[2] * spread
        ),
        life: Math.random() * life,
        maxLife: life,
        size: particleSize,
        color: new THREE.Color(particleColor),
        active: true,
      });
    }
    return particleArray;
  }, [count, color, size, life, velocity, spread]);

  // Mouse tracking for interactivity
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Scroll tracking for scroll responsiveness
  useEffect(() => {
    if (!scrollResponsive) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollResponsive]);

  // Performance monitoring
  useEffect(() => {
    const handlePerformanceWarning = (event: CustomEvent) => {
      const { fps } = event.detail;
      if (fps < 30) {
        setPerformanceMode('low');
      } else if (fps < 45) {
        setPerformanceMode('medium');
      } else {
        setPerformanceMode('high');
      }
    };

    window.addEventListener('performanceWarning', handlePerformanceWarning as EventListener);
    return () => window.removeEventListener('performanceWarning', handlePerformanceWarning as EventListener);
  }, []);

  // Notify performance monitor of particle count
  useEffect(() => {
    const activeParticles = particles.filter(p => p.active).length;
    window.dispatchEvent(
      new CustomEvent('particleCountUpdate', {
        detail: { count: activeParticles },
      })
    );
  }, [particles]);

  // Create geometry based on shape
  const geometry = useMemo(() => {
    switch (shape) {
      case 'cube':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'star':
        // Create a simple star shape using a custom geometry
        const starGeometry = new THREE.ConeGeometry(0.5, 1, 5);
        return starGeometry;
      case 'sphere':
      default:
        return new THREE.SphereGeometry(1, 8, 8);
    }
  }, [shape]);

  // Particle lifecycle management and animation
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mouse3D = new THREE.Vector3(mousePosition.x * 10, mousePosition.y * 10, 0);
    const scrollInfluence = scrollResponsive ? scrollY * 0.001 : 0;
    
    // Performance-based update frequency
    const updateFrequency = performanceMode === 'high' ? 1 : performanceMode === 'medium' ? 2 : 3;
    const shouldUpdate = Math.floor(time * 60) % updateFrequency === 0;

    if (!shouldUpdate && performanceMode !== 'high') return;

    let activeCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      if (!particle.active) continue;

      // Update particle life
      particle.life -= delta;

      // Respawn particle if life is over
      if (particle.life <= 0) {
        particle.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        );
        particle.velocity.set(
          (Math.random() - 0.5) * velocity[0] * spread,
          (Math.random() - 0.5) * velocity[1] * spread,
          (Math.random() - 0.5) * velocity[2] * spread
        );
        particle.life = particle.maxLife;
      }

      // Apply base movement
      particle.position.add(
        particle.velocity.clone().multiplyScalar(delta * speed)
      );

      // Apply scroll influence
      if (scrollResponsive) {
        particle.position.y += scrollInfluence * (i % 2 === 0 ? 1 : -1);
        particle.position.x += Math.sin(scrollInfluence + i) * 0.1;
      }

      // Apply mouse interaction
      if (interactive) {
        const distanceToMouse = particle.position.distanceTo(mouse3D);
        if (distanceToMouse < 5) {
          const force = mouse3D.clone().sub(particle.position).normalize().multiplyScalar(-0.5);
          particle.position.add(force.multiplyScalar(delta));
        }
      }

      // Apply floating motion
      particle.position.x += Math.sin(time * speed + i * 0.1) * 0.02;
      particle.position.y += Math.cos(time * speed + i * 0.15) * 0.02;
      particle.position.z += Math.sin(time * speed + i * 0.2) * 0.01;

      // Calculate life-based scale and opacity
      const lifeRatio = particle.life / particle.maxLife;
      const scale = particle.size * (0.5 + lifeRatio * 0.5);
      const particleOpacity = opacity * lifeRatio;

      // Update instance matrix
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(
        time * 0.5 + i * 0.1,
        time * 0.3 + i * 0.2,
        time * 0.7 + i * 0.05
      );
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Update color if material supports it
      if (materialRef.current && materialRef.current.color) {
        materialRef.current.color.copy(particle.color);
        materialRef.current.opacity = particleOpacity;
      }

      activeCount++;
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Update performance metrics
    if (activeCount !== particles.filter(p => p.active).length) {
      window.dispatchEvent(
        new CustomEvent('particleCountUpdate', {
          detail: { count: activeCount },
        })
      );
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (geometry) geometry.dispose();
      if (materialRef.current) materialRef.current.dispose();
    };
  }, [geometry]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshBasicMaterial
        ref={materialRef}
        transparent
        opacity={opacity}
        blending={blending}
        depthWrite={false}
        vertexColors={false}
      />
    </instancedMesh>
  );
};

export default ParticleSystem;