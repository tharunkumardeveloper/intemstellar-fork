import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface EntranceAnimationsProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  intensity?: 'light' | 'medium' | 'heavy';
}

interface AnimationState {
  phase: 'initial' | 'entrance' | 'complete';
  progress: number;
  startTime: number;
}

const EntranceAnimations: React.FC<EntranceAnimationsProps> = ({
  children,
  delay = 0,
  duration = 3,
  intensity = 'heavy',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [animationState, setAnimationState] = useState<AnimationState>({
    phase: 'initial',
    progress: 0,
    startTime: 0,
  });

  // Animation parameters based on intensity
  const animationParams = {
    light: {
      initialScale: 0.8,
      initialRotation: Math.PI * 0.25,
      initialPosition: [0, -2, -5],
      explosionForce: 2,
      particleCount: 20,
    },
    medium: {
      initialScale: 0.5,
      initialRotation: Math.PI * 0.5,
      initialPosition: [0, -5, -10],
      explosionForce: 5,
      particleCount: 50,
    },
    heavy: {
      initialScale: 0.1,
      initialRotation: Math.PI * 1.5,
      initialPosition: [0, -10, -20],
      explosionForce: 10,
      particleCount: 100,
    },
  };

  const params = animationParams[intensity];

  // Initialize entrance animation
  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    
    // Set initial state
    group.scale.setScalar(params.initialScale);
    group.rotation.set(params.initialRotation, params.initialRotation, 0);
    group.position.set(...params.initialPosition as [number, number, number]);
    
    // Start animation after delay
    const timer = setTimeout(() => {
      setAnimationState(prev => ({
        ...prev,
        phase: 'entrance',
        startTime: Date.now(),
      }));

      // Create dramatic entrance sequence with GSAP
      const tl = gsap.timeline({
        onUpdate: () => {
          const progress = tl.progress();
          setAnimationState(prev => ({
            ...prev,
            progress,
          }));
        },
        onComplete: () => {
          setAnimationState(prev => ({
            ...prev,
            phase: 'complete',
            progress: 1,
          }));
        },
      });

      // Phase 1: Explosive entrance from distance
      tl.to(group.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: duration * 0.4,
        ease: "power4.out",
      })
      .to(group.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: duration * 0.4,
        ease: "back.out(2)",
      }, 0)
      .to(group.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: duration * 0.4,
        ease: "power3.out",
      }, 0)

      // Phase 2: Overshoot and settle
      .to(group.scale, {
        x: 0.95,
        y: 0.95,
        z: 0.95,
        duration: duration * 0.3,
        ease: "power2.inOut",
      })
      .to(group.position, {
        y: 0.2,
        duration: duration * 0.15,
        ease: "power2.out",
      }, duration * 0.4)

      // Phase 3: Final settle
      .to(group.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: duration * 0.3,
        ease: "elastic.out(1, 0.5)",
      })
      .to(group.position, {
        y: 0,
        duration: duration * 0.15,
        ease: "bounce.out",
      }, duration * 0.7);

    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay, duration, intensity, params]);

  // Continuous animation effects during entrance
  useFrame((state) => {
    if (!groupRef.current || animationState.phase === 'complete') return;

    const time = state.clock.getElapsedTime();
    const group = groupRef.current;

    if (animationState.phase === 'entrance') {
      // Add dynamic effects during entrance
      const progress = animationState.progress;
      const intensity = 1 - progress;

      // Dramatic lighting effects
      const lightIntensity = Math.sin(time * 20) * intensity * 0.5;
      
      // Particle explosion effect simulation through scale pulsing
      const explosionPulse = Math.sin(time * 15) * intensity * 0.1;
      group.scale.addScalar(explosionPulse);

      // Energy ripple effects
      const ripple = Math.sin(time * 10 + progress * Math.PI * 2) * intensity * 0.05;
      group.rotation.z += ripple;

      // Dimensional distortion effects
      if (progress < 0.5) {
        const distortion = (0.5 - progress) * 2;
        group.scale.x += Math.sin(time * 25) * distortion * 0.1;
        group.scale.y += Math.cos(time * 30) * distortion * 0.1;
        group.scale.z += Math.sin(time * 35) * distortion * 0.05;
      }

      // Chromatic aberration simulation through position offset
      const aberration = intensity * 0.02;
      group.position.x += Math.sin(time * 50) * aberration;
      group.position.y += Math.cos(time * 60) * aberration;
    }
  });

  // Create explosion particles effect
  const ExplosionParticles: React.FC<{ active: boolean }> = ({ active }) => {
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const particleData = useRef<Array<{
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }>>([]);

    useEffect(() => {
      if (!active || !particlesRef.current) return;

      // Initialize explosion particles
      particleData.current = [];
      for (let i = 0; i < params.particleCount; i++) {
        const angle = (Math.PI * 2 * i) / params.particleCount;
        const elevation = (Math.random() - 0.5) * Math.PI;
        
        particleData.current.push({
          position: new THREE.Vector3(0, 0, 0),
          velocity: new THREE.Vector3(
            Math.cos(angle) * Math.cos(elevation) * params.explosionForce,
            Math.sin(elevation) * params.explosionForce,
            Math.sin(angle) * Math.cos(elevation) * params.explosionForce
          ),
          life: 2 + Math.random(),
          maxLife: 2 + Math.random(),
        });
      }
    }, [active]);

    useFrame((state, delta) => {
      if (!active || !particlesRef.current || particleData.current.length === 0) return;

      const dummy = new THREE.Object3D();
      let activeCount = 0;

      particleData.current.forEach((particle, i) => {
        particle.life -= delta;
        
        if (particle.life <= 0) return;

        // Apply physics
        particle.velocity.y -= 9.8 * delta * 0.5; // Gravity
        particle.velocity.multiplyScalar(0.98); // Air resistance
        particle.position.add(particle.velocity.clone().multiplyScalar(delta));

        // Update instance
        const lifeRatio = particle.life / particle.maxLife;
        const scale = 0.05 * lifeRatio;

        dummy.position.copy(particle.position);
        dummy.scale.setScalar(scale);
        dummy.rotation.set(
          state.clock.getElapsedTime() * 5 + i,
          state.clock.getElapsedTime() * 3 + i * 0.5,
          state.clock.getElapsedTime() * 7 + i * 0.3
        );
        dummy.updateMatrix();

        particlesRef.current!.setMatrixAt(activeCount, dummy.matrix);
        activeCount++;
      });

      // Hide unused instances
      for (let i = activeCount; i < params.particleCount; i++) {
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        particlesRef.current!.setMatrixAt(i, dummy.matrix);
      }

      particlesRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, params.particleCount]}
        frustumCulled={false}
      >
        <octahedronGeometry args={[1]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    );
  };

  return (
    <group>
      {/* Main content with entrance animation */}
      <group ref={groupRef}>
        {children}
      </group>
      
      {/* Explosion particles during entrance */}
      <ExplosionParticles active={animationState.phase === 'entrance'} />
      
      {/* Energy rings effect */}
      {animationState.phase === 'entrance' && (
        <group>
          {[...Array(3)].map((_, i) => (
            <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2 + i * 0.5, 2.2 + i * 0.5, 32]} />
              <meshBasicMaterial
                color={i === 0 ? '#3b82f6' : i === 1 ? '#8b5cf6' : '#06b6d4'}
                transparent
                opacity={0.3 * (1 - animationState.progress)}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

export default EntranceAnimations;