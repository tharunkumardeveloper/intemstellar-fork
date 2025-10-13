interface AnimationConfig {
  id: string;
  element: HTMLElement;
  type: 'entrance' | 'exit' | 'scroll' | 'parallax';
  duration: number;
  easing: string;
  transform?: {
    translate?: [number, number, number];
    rotate?: [number, number, number];
    scale?: [number, number, number];
  };
  opacity?: [number, number];
  triggerOffset?: number; // Percentage of viewport height (0-1)
  parallaxSpeed?: number; // For parallax effects
  onStart?: () => void;
  onComplete?: () => void;
}

interface ScrollProgress {
  scrollY: number;
  scrollProgress: number; // 0-1 based on document height
  viewportHeight: number;
  documentHeight: number;
}

class ScrollAnimationManager {
  private animations: Map<string, AnimationConfig> = new Map();
  private observers: Map<string, IntersectionObserver> = new Map();
  private scrollProgress: ScrollProgress = {
    scrollY: 0,
    scrollProgress: 0,
    viewportHeight: 0,
    documentHeight: 0,
  };
  private rafId: number | null = null;
  private scrollCallbacks: Set<(progress: ScrollProgress) => void> = new Set();

  constructor() {
    this.init();
  }

  private init(): void {
    this.updateScrollProgress();
    this.bindScrollEvents();
    this.startAnimationLoop();
  }

  private bindScrollEvents(): void {
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
  }

  private handleScroll(): void {
    this.updateScrollProgress();
    this.notifyScrollCallbacks();
  }

  private handleResize(): void {
    this.updateScrollProgress();
    // Recreate intersection observers with new viewport dimensions
    this.observers.forEach((observer, id) => {
      observer.disconnect();
      const animation = this.animations.get(id);
      if (animation) {
        this.createIntersectionObserver(animation);
      }
    });
  }

  private updateScrollProgress(): void {
    this.scrollProgress = {
      scrollY: window.scrollY,
      scrollProgress: window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
      viewportHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight,
    };
  }

  private notifyScrollCallbacks(): void {
    this.scrollCallbacks.forEach(callback => callback(this.scrollProgress));
  }

  private startAnimationLoop(): void {
    const animate = () => {
      // Handle parallax animations
      this.animations.forEach(animation => {
        if (animation.type === 'parallax' && animation.parallaxSpeed) {
          this.updateParallaxElement(animation);
        }
      });

      this.rafId = requestAnimationFrame(animate);
    };
    animate();
  }

  private updateParallaxElement(animation: AnimationConfig): void {
    const { element, parallaxSpeed = 0.5 } = animation;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + this.scrollProgress.scrollY;
    const elementHeight = rect.height;
    const viewportCenter = this.scrollProgress.scrollY + this.scrollProgress.viewportHeight / 2;
    
    // Calculate parallax offset
    const parallaxOffset = (viewportCenter - elementTop - elementHeight / 2) * parallaxSpeed;
    
    // Apply transform
    element.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
  }

  private createIntersectionObserver(animation: AnimationConfig): void {
    const { id, element, triggerOffset = 0.1 } = animation;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimation(id, 'entrance');
          } else {
            this.triggerAnimation(id, 'exit');
          }
        });
      },
      {
        root: null,
        rootMargin: `${-triggerOffset * 100}% 0px`,
        threshold: 0,
      }
    );

    observer.observe(element);
    this.observers.set(id, observer);
  }

  public registerAnimation(config: AnimationConfig): void {
    this.animations.set(config.id, config);
    
    // Create intersection observer for entrance/exit animations
    if (config.type === 'entrance' || config.type === 'exit') {
      this.createIntersectionObserver(config);
    }
  }

  public unregisterAnimation(id: string): void {
    const observer = this.observers.get(id);
    if (observer) {
      observer.disconnect();
      this.observers.delete(id);
    }
    this.animations.delete(id);
  }

  public triggerAnimation(id: string, type?: 'entrance' | 'exit'): void {
    const animation = this.animations.get(id);
    if (!animation) return;

    const { element, duration, easing, transform, opacity, onStart, onComplete } = animation;
    
    // Call start callback
    onStart?.();

    // Determine animation direction based on type
    const isEntrance = type === 'entrance' || animation.type === 'entrance';
    
    // Build animation properties
    const animationProps: Keyframe[] = [];
    
    if (isEntrance) {
      // Entrance animation: from initial state to final state
      const fromState: Keyframe = {};
      const toState: Keyframe = {};

      if (transform) {
        const { translate = [0, 0, 0], rotate = [0, 0, 0], scale = [1, 1, 1] } = transform;
        fromState.transform = `translate3d(${translate[0] * -1}px, ${translate[1] * -1}px, ${translate[2] * -1}px) rotateX(${rotate[0] * -1}deg) rotateY(${rotate[1] * -1}deg) rotateZ(${rotate[2] * -1}deg) scale3d(${scale[0] * 0.8}, ${scale[1] * 0.8}, ${scale[2] * 0.8})`;
        toState.transform = `translate3d(${translate[0]}px, ${translate[1]}px, ${translate[2]}px) rotateX(${rotate[0]}deg) rotateY(${rotate[1]}deg) rotateZ(${rotate[2]}deg) scale3d(${scale[0]}, ${scale[1]}, ${scale[2]})`;
      }

      if (opacity) {
        fromState.opacity = opacity[0].toString();
        toState.opacity = opacity[1].toString();
      }

      animationProps.push(fromState, toState);
    } else {
      // Exit animation: reverse the entrance
      const fromState: Keyframe = {};
      const toState: Keyframe = {};

      if (transform) {
        const { translate = [0, 0, 0], rotate = [0, 0, 0], scale = [1, 1, 1] } = transform;
        fromState.transform = `translate3d(${translate[0]}px, ${translate[1]}px, ${translate[2]}px) rotateX(${rotate[0]}deg) rotateY(${rotate[1]}deg) rotateZ(${rotate[2]}deg) scale3d(${scale[0]}, ${scale[1]}, ${scale[2]})`;
        toState.transform = `translate3d(${translate[0] * -1}px, ${translate[1] * -1}px, ${translate[2] * -1}px) rotateX(${rotate[0] * -1}deg) rotateY(${rotate[1] * -1}deg) rotateZ(${rotate[2] * -1}deg) scale3d(${scale[0] * 0.8}, ${scale[1] * 0.8}, ${scale[2] * 0.8})`;
      }

      if (opacity) {
        fromState.opacity = opacity[1].toString();
        toState.opacity = opacity[0].toString();
      }

      animationProps.push(fromState, toState);
    }

    // Execute animation
    const webAnimation = element.animate(animationProps, {
      duration: duration * 1000, // Convert to milliseconds
      easing,
      fill: 'forwards',
    });

    // Handle completion
    webAnimation.addEventListener('finish', () => {
      onComplete?.();
    });
  }

  public onScroll(callback: (progress: ScrollProgress) => void): () => void {
    this.scrollCallbacks.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.scrollCallbacks.delete(callback);
    };
  }

  public getScrollProgress(): ScrollProgress {
    return { ...this.scrollProgress };
  }

  public destroy(): void {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Clean up animations
    this.animations.clear();
    
    // Clean up scroll callbacks
    this.scrollCallbacks.clear();
    
    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}

export default ScrollAnimationManager;
export type { AnimationConfig, ScrollProgress };