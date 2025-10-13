import { useEffect, useRef, ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimationConfig } from '@/lib/ScrollAnimationManager';

interface AnimatedElementProps {
  children: ReactNode;
  animation?: Partial<AnimationConfig>;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  triggerOffset?: number;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const AnimatedElement = ({
  children,
  animation = {},
  className = '',
  as: Component = 'div',
  triggerOffset = 0.1,
  onAnimationStart,
  onAnimationComplete,
  ...props
}: AnimatedElementProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const { registerAnimation, unregisterAnimation } = useScrollAnimation();
  const animationIdRef = useRef<string>('');

  useEffect(() => {
    if (!elementRef.current) return;

    // Generate unique animation ID
    animationIdRef.current = `animated-element-${Math.random().toString(36).substr(2, 9)}`;

    // Default animation configuration
    const defaultConfig: Partial<AnimationConfig> = {
      type: 'entrance',
      duration: 0.8,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transform: {
        translate: [0, 50, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
      },
      opacity: [0, 1],
      triggerOffset,
      onStart: onAnimationStart,
      onComplete: onAnimationComplete,
    };

    // Merge with provided animation config
    const finalConfig: AnimationConfig = {
      id: animationIdRef.current,
      element: elementRef.current,
      ...defaultConfig,
      ...animation,
    } as AnimationConfig;

    // Register the animation
    registerAnimation(finalConfig);

    return () => {
      if (animationIdRef.current) {
        unregisterAnimation(animationIdRef.current);
      }
    };
  }, [animation, registerAnimation, unregisterAnimation, triggerOffset, onAnimationStart, onAnimationComplete]);

  return (
    <Component
      ref={elementRef}
      className={className}
      style={{
        // Initial state for entrance animations
        opacity: animation.type !== 'parallax' ? 0 : undefined,
        transform: animation.type !== 'parallax' ? 'translate3d(0, 50px, 0)' : undefined,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default AnimatedElement;