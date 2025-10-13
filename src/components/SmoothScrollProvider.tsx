import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { cleanupScrollManager } from '@/hooks/useScrollAnimation';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with momentum-based scrolling configuration
    lenisRef.current = new Lenis({
      duration: 1.2, // Animation duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function for smooth momentum
      direction: 'vertical', // Scroll direction
      gestureDirection: 'vertical', // Gesture direction
      smooth: true, // Enable smooth scrolling
      mouseMultiplier: 1, // Mouse wheel sensitivity
      smoothTouch: false, // Disable smooth scrolling on touch devices for better performance
      touchMultiplier: 2, // Touch sensitivity
      infinite: false, // Disable infinite scrolling
    });

    // Animation loop for Lenis
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Cleanup function to destroy Lenis instance and scroll manager
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      cleanupScrollManager();
    };
  }, []);

  // Handle reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (lenisRef.current) {
        if (e.matches) {
          // Disable smooth scrolling for users who prefer reduced motion
          lenisRef.current.stop();
        } else {
          // Re-enable smooth scrolling
          lenisRef.current.start();
        }
      }
    };

    // Check initial preference
    if (mediaQuery.matches && lenisRef.current) {
      lenisRef.current.stop();
    }

    // Listen for changes in motion preference
    mediaQuery.addEventListener('change', handleReducedMotion);

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotion);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;