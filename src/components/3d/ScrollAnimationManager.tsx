import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface ScrollAnimationManagerProps {
  children: React.ReactNode;
  smoothness?: number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
}

const ScrollAnimationManager: React.FC<ScrollAnimationManagerProps> = ({
  children,
  smoothness = 1,
  direction = 'vertical',
  gestureDirection = 'vertical',
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction,
      gestureDirection,
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [direction, gestureDirection, smoothness]);

  // Scroll event handler for custom animations
  useEffect(() => {
    if (!lenisRef.current) return;

    const handleScroll = (e: any) => {
      // Custom scroll-triggered animations can be added here
      const scrollProgress = e.progress;
      
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(
        new CustomEvent('smoothScroll', {
          detail: {
            scroll: e.scroll,
            progress: scrollProgress,
            velocity: e.velocity,
          },
        })
      );
    };

    lenisRef.current.on('scroll', handleScroll);

    return () => {
      lenisRef.current?.off('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollAnimationManager;