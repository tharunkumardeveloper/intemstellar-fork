import React, { Suspense, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import PerformanceMonitor from './PerformanceMonitor';
import CursorFollowingSystem from './CursorFollowingSystem';
import ClickFeedbackSystem from './ClickFeedbackSystem';
import HoverFeedbackSystem from './HoverFeedbackSystem';

interface Scene3DProps {
  children: React.ReactNode;
  enableParticles?: boolean;
  particleCount?: number;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  showStats?: boolean;
  enablePerformanceMonitoring?: boolean;
  adaptivePerformance?: boolean;
}

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  particleCount: number;
  activeAnimations: number;
}

const Scene3D: React.FC<Scene3DProps> = ({
  children,
  enableParticles = true,
  particleCount = 1000,
  cameraPosition = [0, 0, 5],
  enableControls = false,
  showStats = false,
  enablePerformanceMonitoring = true,
  adaptivePerformance = true,
}) => {
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle performance metrics and auto-optimization
  const handlePerformanceUpdate = useCallback((metrics: PerformanceMetrics) => {
    if (!adaptivePerformance) return;

    // Adjust performance mode based on FPS
    if (metrics.fps < 30 && performanceMode !== 'low') {
      setPerformanceMode('low');
      console.log('Performance mode switched to LOW due to low FPS:', metrics.fps);
    } else if (metrics.fps < 45 && performanceMode === 'high') {
      setPerformanceMode('medium');
      console.log('Performance mode switched to MEDIUM due to moderate FPS:', metrics.fps);
    } else if (metrics.fps > 55 && performanceMode !== 'high') {
      setPerformanceMode('high');
      console.log('Performance mode switched to HIGH due to good FPS:', metrics.fps);
    }
  }, [performanceMode, adaptivePerformance]);

  // Listen for performance warnings
  useEffect(() => {
    const handlePerformanceWarning = (event: CustomEvent) => {
      console.warn('Performance warning:', event.detail);
    };

    window.addEventListener('performanceWarning', handlePerformanceWarning as EventListener);
    return () => window.removeEventListener('performanceWarning', handlePerformanceWarning as EventListener);
  }, []);

  // Calculate responsive camera settings
  const responsiveCameraSettings = {
    position: cameraPosition,
    fov: canvasSize.width < 768 ? 85 : 75, // Wider FOV on mobile
    near: 0.1,
    far: 1000,
    aspect: canvasSize.width / canvasSize.height,
  };

  // Performance-based rendering settings - Optimized for faster initial load
  const renderingSettings = {
    antialias: false, // Disabled for better performance
    alpha: true,
    powerPreference: 'default' as const, // Use default for better compatibility
    stencil: false, // Disabled for better performance
    depth: true,
    logarithmicDepthBuffer: false, // Disabled for better performance
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: false,
  };

  // Performance-based DPR settings - Capped at 1.5 for better performance
  const dprSettings: [number, number] = [1, Math.min(1.5, window.devicePixelRatio)];

  return (
    <div className="fixed inset-0 -z-10">
      {enablePerformanceMonitoring && (
        <PerformanceMonitor
          onMetricsUpdate={handlePerformanceUpdate}
          enableAutoOptimization={adaptivePerformance}
          targetFPS={30}
        />
      )}
      
      <Canvas
        camera={responsiveCameraSettings}
        gl={renderingSettings}
        dpr={dprSettings}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* Enhanced lighting setup based on performance mode */}
          <ambientLight intensity={performanceMode === 'low' ? 0.6 : 0.4} color="#ffffff" />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={performanceMode === 'low' ? 0.8 : 1.2}
            color="#ffffff"
            castShadow={performanceMode === 'high'}
            shadow-mapSize-width={performanceMode === 'high' ? 2048 : 1024}
            shadow-mapSize-height={performanceMode === 'high' ? 2048 : 1024}
          />
          <pointLight 
            position={[-10, -10, -5]} 
            intensity={performanceMode === 'low' ? 0.3 : 0.5}
            color="#4f46e5"
            distance={performanceMode === 'low' ? 50 : 100}
          />
          
          {/* Accent lighting for depth */}
          {performanceMode !== 'low' && (
            <>
              <spotLight
                position={[0, 20, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.3}
                color="#3b82f6"
                castShadow={performanceMode === 'high'}
              />
              <pointLight
                position={[20, 0, 10]}
                intensity={0.2}
                color="#8b5cf6"
                distance={80}
              />
            </>
          )}
          
          {/* Adaptive performance components */}
          {adaptivePerformance && (
            <>
              <AdaptiveDpr pixelated />
              <AdaptiveEvents />
            </>
          )}
          
          {/* Optional controls for development */}
          {enableControls && <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />}
          
          {/* Performance stats for development */}
          {showStats && <Stats />}
          
          {/* Advanced Cursor and Interaction Systems */}
          <CursorFollowingSystem
            particleCount={50}
            trailLength={20}
            colors={['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff', '#f59e0b']}
            size={0.02}
            speed={1.0}
            contextualEffects={true}
          />
          
          <ClickFeedbackSystem
            maxEffects={10}
            effectDuration={1.5}
            colors={['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff', '#f59e0b']}
          />
          
          <HoverFeedbackSystem
            selector="button, a, .interactive, .card-3d-hover"
            particleCount={15}
            colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
            intensity={1.0}
          />

          {/* Child components with performance context */}
          <group userData={{ performanceMode, particleCount: performanceMode === 'low' ? Math.floor(particleCount * 0.3) : performanceMode === 'medium' ? Math.floor(particleCount * 0.6) : particleCount }}>
            {children}
          </group>
          
          {/* Hero 3D Scene - Always rendered in the global canvas */}
          {React.Children.count(children) === 0 && (
            <group position={[0, 0, 0]}>
              {/* This will be populated by Hero3DScene if needed */}
            </group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;