import * as THREE from 'three';
import { DeviceCapabilities, PerformanceMode } from '../types/3d';

/**
 * Detect device capabilities for 3D rendering optimization
 */
export const detectDeviceCapabilities = (): DeviceCapabilities => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const gl2 = canvas.getContext('webgl2');

  if (!gl) {
    return {
      isHighPerformance: false,
      supportedFeatures: {
        webgl: false,
        webgl2: false,
        instancedRendering: false,
        floatTextures: false,
      },
      memoryLimit: 256,
      maxTextureSize: 1024,
    };
  }

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  
  // Basic performance heuristics
  const isHighPerformance = 
    renderer.includes('NVIDIA') || 
    renderer.includes('AMD') || 
    renderer.includes('Intel Iris') ||
    navigator.hardwareConcurrency > 4;

  return {
    isHighPerformance,
    supportedFeatures: {
      webgl: true,
      webgl2: !!gl2,
      instancedRendering: !!gl.getExtension('ANGLE_instanced_arrays'),
      floatTextures: !!gl.getExtension('OES_texture_float'),
    },
    memoryLimit: isHighPerformance ? 1024 : 512,
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
  };
};

/**
 * Get recommended performance mode based on device capabilities
 */
export const getRecommendedPerformanceMode = (): PerformanceMode => {
  const capabilities = detectDeviceCapabilities();
  
  if (capabilities.isHighPerformance && capabilities.supportedFeatures.webgl2) {
    return 'high';
  } else if (capabilities.supportedFeatures.webgl && capabilities.supportedFeatures.instancedRendering) {
    return 'medium';
  } else {
    return 'low';
  }
};

/**
 * Create optimized geometry based on performance mode
 */
export const createOptimizedGeometry = (
  type: 'sphere' | 'box' | 'plane',
  performanceMode: PerformanceMode
): THREE.BufferGeometry => {
  const detail = {
    high: { sphere: [32, 32], box: [1, 1, 1], plane: [32, 32] },
    medium: { sphere: [16, 16], box: [1, 1, 1], plane: [16, 16] },
    low: { sphere: [8, 8], box: [1, 1, 1], plane: [8, 8] },
  }[performanceMode];

  switch (type) {
    case 'sphere':
      return new THREE.SphereGeometry(1, detail.sphere[0], detail.sphere[1]);
    case 'box':
      return new THREE.BoxGeometry(1, 1, 1);
    case 'plane':
      return new THREE.PlaneGeometry(1, 1, detail.plane[0], detail.plane[1]);
    default:
      return new THREE.SphereGeometry(1, 8, 8);
  }
};

/**
 * Dispose of Three.js resources properly
 */
export const disposeObject = (object: THREE.Object3D): void => {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  });
};

/**
 * Create particle positions in various patterns
 */
export const generateParticlePositions = (
  count: number,
  pattern: 'random' | 'sphere' | 'grid' | 'spiral' = 'random',
  bounds: { x: number; y: number; z: number } = { x: 20, y: 20, z: 20 }
): Float32Array => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    switch (pattern) {
      case 'random':
        positions[i3] = (Math.random() - 0.5) * bounds.x;
        positions[i3 + 1] = (Math.random() - 0.5) * bounds.y;
        positions[i3 + 2] = (Math.random() - 0.5) * bounds.z;
        break;

      case 'sphere':
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const radius = Math.random() * bounds.x * 0.5;
        positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i3 + 2] = radius * Math.cos(phi);
        break;

      case 'grid':
        const gridSize = Math.ceil(Math.cbrt(count));
        const x = (i % gridSize) - gridSize / 2;
        const y = Math.floor(i / gridSize) % gridSize - gridSize / 2;
        const z = Math.floor(i / (gridSize * gridSize)) - gridSize / 2;
        positions[i3] = (x / gridSize) * bounds.x;
        positions[i3 + 1] = (y / gridSize) * bounds.y;
        positions[i3 + 2] = (z / gridSize) * bounds.z;
        break;

      case 'spiral':
        const angle = i * 0.1;
        const spiralRadius = (i / count) * bounds.x * 0.5;
        positions[i3] = spiralRadius * Math.cos(angle);
        positions[i3 + 1] = (i / count - 0.5) * bounds.y;
        positions[i3 + 2] = spiralRadius * Math.sin(angle);
        break;
    }
  }

  return positions;
};

/**
 * Smooth interpolation function for animations
 */
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Convert screen coordinates to world coordinates
 */
export const screenToWorld = (
  x: number,
  y: number,
  camera: THREE.Camera,
  width: number,
  height: number
): THREE.Vector3 => {
  const vector = new THREE.Vector3();
  vector.set(
    (x / width) * 2 - 1,
    -(y / height) * 2 + 1,
    0.5
  );
  vector.unproject(camera);
  return vector;
};