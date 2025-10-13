import * as THREE from 'three';

// Animation configuration types
export interface AnimationConfig {
  id: string;
  type: 'entrance' | 'exit' | 'hover' | 'scroll' | 'click';
  duration: number;
  easing: string;
  transform: {
    translate?: [number, number, number];
    rotate?: [number, number, number];
    scale?: [number, number, number];
  };
  opacity?: [number, number];
  particles?: ParticleConfig;
}

// Particle system configuration
export interface ParticleConfig {
  count: number;
  color: string | string[];
  size: [number, number];
  velocity: [number, number, number];
  life: number;
  emissionRate: number;
  shape: 'sphere' | 'cube' | 'star' | 'custom';
}

// Performance monitoring types
export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  particleCount: number;
  activeAnimations: number;
}

// 3D Scene configuration
export interface Scene3DConfig {
  enableParticles: boolean;
  particleCount: number;
  cameraPosition: [number, number, number];
  enableControls: boolean;
  showStats: boolean;
}

// Animation controller interface
export interface AnimationController {
  registerElement(element: HTMLElement, config: AnimationConfig): void;
  triggerAnimation(elementId: string, animationType: string): void;
  pauseAll(): void;
  resumeAll(): void;
  setPerformanceMode(mode: 'high' | 'medium' | 'low'): void;
}

// Scroll animation types
export interface ScrollAnimationData {
  scroll: number;
  progress: number;
  velocity: number;
}

// 3D Transform utilities
export interface Transform3D {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

// Performance optimization levels
export type PerformanceMode = 'high' | 'medium' | 'low';

// Animation intensity levels
export type AnimationIntensity = 'light' | 'medium' | 'heavy';

// Animation types
export type AnimationType = 'slide' | 'rotate' | 'scale' | 'morph' | 'explode';

// Device capability detection
export interface DeviceCapabilities {
  isHighPerformance: boolean;
  supportedFeatures: {
    webgl: boolean;
    webgl2: boolean;
    instancedRendering: boolean;
    floatTextures: boolean;
  };
  memoryLimit: number;
  maxTextureSize: number;
}