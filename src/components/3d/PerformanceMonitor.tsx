import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  particleCount: number;
  activeAnimations: number;
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  enableAutoOptimization?: boolean;
  targetFPS?: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsUpdate,
  enableAutoOptimization = true,
  targetFPS = 30,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    particleCount: 0,
    activeAnimations: 0,
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);

  useEffect(() => {
    let animationId: number;

    const measurePerformance = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;

      frameCountRef.current++;

      // Calculate FPS every second
      if (delta >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / delta);
        
        // Keep FPS history for smoothing
        fpsHistoryRef.current.push(fps);
        if (fpsHistoryRef.current.length > 10) {
          fpsHistoryRef.current.shift();
        }

        const averageFPS = fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length;

        // Get memory usage if available
        const memoryInfo = (performance as any).memory;
        const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1048576 : 0; // MB

        const newMetrics: PerformanceMetrics = {
          fps: Math.round(averageFPS),
          memoryUsage: Math.round(memoryUsage),
          renderTime: delta / frameCountRef.current,
          particleCount: 0, // Will be updated by particle systems
          activeAnimations: 0, // Will be updated by animation systems
        };

        setMetrics(newMetrics);
        onMetricsUpdate?.(newMetrics);

        // Auto-optimization logic
        if (enableAutoOptimization && averageFPS < targetFPS) {
          // Dispatch performance warning event
          window.dispatchEvent(
            new CustomEvent('performanceWarning', {
              detail: { fps: averageFPS, targetFPS },
            })
          );
        }

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [onMetricsUpdate, enableAutoOptimization, targetFPS]);

  // Listen for performance updates from other components
  useEffect(() => {
    const handleParticleCountUpdate = (event: CustomEvent) => {
      setMetrics(prev => ({
        ...prev,
        particleCount: event.detail.count,
      }));
    };

    const handleAnimationCountUpdate = (event: CustomEvent) => {
      setMetrics(prev => ({
        ...prev,
        activeAnimations: event.detail.count,
      }));
    };

    window.addEventListener('particleCountUpdate', handleParticleCountUpdate as EventListener);
    window.addEventListener('animationCountUpdate', handleAnimationCountUpdate as EventListener);

    return () => {
      window.removeEventListener('particleCountUpdate', handleParticleCountUpdate as EventListener);
      window.removeEventListener('animationCountUpdate', handleAnimationCountUpdate as EventListener);
    };
  }, []);

  return null; // This is a utility component with no visual output
};

export default PerformanceMonitor;