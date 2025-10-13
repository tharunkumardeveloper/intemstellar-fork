import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveParticlesProps {
  count?: number;
  trailLength?: number;
  burstIntensity?: number;
  colors?: string[];
  size?: number;
  speed?: number;
}

interface TrailParticle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
  alpha: number;
  trail: THREE.Vector3[];
}

interface BurstParticle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  count = 200,
  trailLength = 10,
  burstIntensity = 50,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff'],
  size = 0.05,
  speed = 2,
}) => {
  const trailMeshRef = useRef<THREE.InstancedMesh>(null);
  const burstMeshRef = useRef<THREE.InstancedMesh>(null);
  const { camera, gl, size: canvasSize } = useThree();
  
  // Mouse tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  
  // Convert screen coordinates to world coordinates
  const screenToWorld = (screenX: number, screenY: number) => {
    const vector = new THREE.Vector3();
    vector.set(
      (screenX / canvasSize.width) * 2 - 1,
      -(screenY / canvasSize.height) * 2 + 1,
      0.5
    );
    vector.unproject(camera);
    
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    
    return pos;
  };

  // Trail particles that follow the mouse
  const trailParticles = useMemo<TrailParticle[]>(() => {
    const particles: TrailParticle[] = [];
    
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        life: Math.random() * 2 + 1,
        maxLife: 2,
        size: size * (0.5 + Math.random() * 0.5),
        color: new THREE.Color(color),
        alpha: 1,
        trail: [],
      });
    }
    
    return particles;
  }, [count, colors, size]);

  // Burst particles for click effects
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newPosition = { x: event.clientX, y: event.clientY };
      
      // Calculate velocity
      setMouseVelocity({
        x: newPosition.x - lastMousePosition.x,
        y: newPosition.y - lastMousePosition.y,
      });
      
      setMousePosition(newPosition);
      setLastMousePosition(newPosition);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Create burst particles at mouse position
      const worldPos = screenToWorld(mousePosition.x, mousePosition.y);
      const newBurstParticles: BurstParticle[] = [];
      
      for (let i = 0; i < burstIntensity; i++) {
        const angle = (Math.PI * 2 * i) / burstIntensity;
        const velocity = new THREE.Vector3(
          Math.cos(angle) * (2 + Math.random() * 3),
          Math.sin(angle) * (2 + Math.random() * 3),
          (Math.random() - 0.5) * 2
        );
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        newBurstParticles.push({
          position: worldPos.clone(),
          velocity,
          life: 1 + Math.random(),
          maxLife: 1.5,
          size: size * (0.3 + Math.random() * 0.7),
          color: new THREE.Color(color),
        });
      }
      
      setBurstParticles(prev => [...prev, ...newBurstParticles]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mousePosition, lastMousePosition, burstIntensity, colors, size]);

  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const worldMousePos = screenToWorld(mousePosition.x, mousePosition.y);
    
    // Update trail particles
    if (trailMeshRef.current) {
      const dummy = new THREE.Object3D();
      
      trailParticles.forEach((particle, i) => {
        // Attract particles to mouse with varying delays
        const delay = i * 0.02;
        const targetPos = worldMousePos.clone();
        targetPos.add(new THREE.Vector3(
          Math.sin(time * 2 + i * 0.1) * 0.5,
          Math.cos(time * 1.5 + i * 0.15) * 0.3,
          Math.sin(time * 0.8 + i * 0.2) * 0.2
        ));
        
        // Smooth following with velocity influence
        const force = targetPos.clone().sub(particle.position).multiplyScalar(0.05);
        force.add(new THREE.Vector3(
          mouseVelocity.x * 0.001,
          -mouseVelocity.y * 0.001,
          0
        ));
        
        particle.velocity.add(force);
        particle.velocity.multiplyScalar(0.95); // Damping
        particle.position.add(particle.velocity.clone().multiplyScalar(delta * speed));
        
        // Update trail
        particle.trail.unshift(particle.position.clone());
        if (particle.trail.length > trailLength) {
          particle.trail.pop();
        }
        
        // Life cycle
        particle.life -= delta;
        if (particle.life <= 0) {
          particle.life = particle.maxLife;
          particle.position.copy(worldMousePos);
          particle.velocity.set(0, 0, 0);
        }
        
        // Calculate alpha based on life and distance from mouse
        const distanceToMouse = particle.position.distanceTo(worldMousePos);
        const lifeRatio = particle.life / particle.maxLife;
        particle.alpha = Math.max(0, Math.min(1, lifeRatio * (1 - distanceToMouse * 0.1)));
        
        // Update instance matrix
        dummy.position.copy(particle.position);
        dummy.scale.setScalar(particle.size * (0.5 + particle.alpha * 0.5));
        dummy.rotation.z = time * 2 + i * 0.1;
        dummy.updateMatrix();
        
        trailMeshRef.current!.setMatrixAt(i, dummy.matrix);
        
        // Set color with alpha
        const color = particle.color.clone();
        trailMeshRef.current!.setColorAt(i, color);
      });
      
      trailMeshRef.current.instanceMatrix.needsUpdate = true;
      if (trailMeshRef.current.instanceColor) {
        trailMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
    
    // Update burst particles
    if (burstMeshRef.current && burstParticles.length > 0) {
      const dummy = new THREE.Object3D();
      let activeCount = 0;
      
      const updatedBurstParticles = burstParticles.filter(particle => {
        particle.life -= delta;
        
        if (particle.life <= 0) {
          return false;
        }
        
        // Apply gravity and movement
        particle.velocity.y -= 9.8 * delta * 0.5; // Gravity
        particle.velocity.multiplyScalar(0.98); // Air resistance
        particle.position.add(particle.velocity.clone().multiplyScalar(delta));
        
        // Update instance matrix
        const lifeRatio = particle.life / particle.maxLife;
        const scale = particle.size * lifeRatio;
        
        dummy.position.copy(particle.position);
        dummy.scale.setScalar(scale);
        dummy.rotation.set(
          time * 3 + activeCount * 0.2,
          time * 2 + activeCount * 0.3,
          time * 4 + activeCount * 0.1
        );
        dummy.updateMatrix();
        
        if (activeCount < burstMeshRef.current!.count) {
          burstMeshRef.current!.setMatrixAt(activeCount, dummy.matrix);
          burstMeshRef.current!.setColorAt(activeCount, particle.color);
        }
        
        activeCount++;
        return true;
      });
      
      setBurstParticles(updatedBurstParticles);
      
      // Hide unused instances
      for (let i = activeCount; i < burstMeshRef.current.count; i++) {
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        burstMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      
      burstMeshRef.current.instanceMatrix.needsUpdate = true;
      if (burstMeshRef.current.instanceColor) {
        burstMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* Trail particles */}
      <instancedMesh
        ref={trailMeshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
      
      {/* Burst particles */}
      <instancedMesh
        ref={burstMeshRef}
        args={[undefined, undefined, burstIntensity * 5]} // Allow for multiple bursts
        frustumCulled={false}
      >
        <octahedronGeometry args={[1]} />
        <meshBasicMaterial
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
};

export default InteractiveParticles;