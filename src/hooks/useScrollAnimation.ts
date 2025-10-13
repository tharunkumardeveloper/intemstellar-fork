import { useEffect, useRef, useCallback } from 'react';
import ScrollAnimationManager, { AnimationConfig, ScrollProgress } from '@/lib/ScrollAnimationManager';

// Global instance to ensure single manager across the app
let globalScrollManager: ScrollAnimationManager | null = null;

const getScrollManager = (): ScrollAnimationManager => {
  if (!globalScrollManager) {
    globalScrollManager = new ScrollAnimationManager();
  }
  return globalScrollManager;
};

export const useScrollAnimation = () => {
  const managerRef = useRef<ScrollAnimationManager | null>(null);

  useEffect(() => {
    managerRef.current = getScrollManager();
    
    // Cleanup is handled globally, not per hook instance
    return () => {
      // Individual hook cleanup if needed
    };
  }, []);

  const registerAnimation = useCallback((config: AnimationConfig) => {
    managerRef.current?.registerAnimation(config);
  }, []);

  const unregisterAnimation = useCallback((id: string) => {
    managerRef.current?.unregisterAnimation(id);
  }, []);

  const triggerAnimation = useCallback((id: string, type?: 'entrance' | 'exit') => {
    managerRef.current?.triggerAnimation(id, type);
  }, []);

  const onScroll = useCallback((callback: (progress: ScrollProgress) => void) => {
    return managerRef.current?.onScroll(callback) || (() => {});
  }, []);

  const getScrollProgress = useCallback(() => {
    return managerRef.current?.getScrollProgress() || {
      scrollY: 0,
      scrollProgress: 0,
      viewportHeight: 0,
      documentHeight: 0,
    };
  }, []);

  return {
    registerAnimation,
    unregisterAnimation,
    triggerAnimation,
    onScroll,
    getScrollProgress,
  };
};

export const useScrollProgress = (callback: (progress: ScrollProgress) => void) => {
  const { onScroll } = useScrollAnimation();

  useEffect(() => {
    const unsubscribe = onScroll(callback);
    return unsubscribe;
  }, [callback, onScroll]);
};

export const useParallax = (elementRef: React.RefObject<HTMLElement>, speed: number = 0.5) => {
  const { registerAnimation, unregisterAnimation } = useScrollAnimation();

  useEffect(() => {
    if (!elementRef.current) return;

    const animationId = `parallax-${Math.random().toString(36).substr(2, 9)}`;
    
    registerAnimation({
      id: animationId,
      element: elementRef.current,
      type: 'parallax',
      duration: 0, // Not used for parallax
      easing: 'linear',
      parallaxSpeed: speed,
    });

    return () => {
      unregisterAnimation(animationId);
    };
  }, [elementRef, speed, registerAnimation, unregisterAnimation]);
};

// Cleanup function to be called when app unmounts
export const cleanupScrollManager = () => {
  if (globalScrollManager) {
    globalScrollManager.destroy();
    globalScrollManager = null;
  }
};